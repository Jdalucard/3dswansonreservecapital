"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const frameCount = 255;
const currentFrame = (index: number) =>
  `/last_desktop_sequence/swanson__${index.toString().padStart(5, "0")}.jpg`;

const slides = [
  {
    tag: "Market Capitalization Company",
    title: "SWANSON",
    title2: "RESERVE CAPITAL",
    description: "Expertise in specialized financial structures and global market strategies.",
  },
  {
    tag: "Precision Engineering",
    title: "MECHANICAL",
    title2: "ACCURACY",
    description: "Built on the principles of horological perfection and financial discipline.",
  },
  {
    tag: "Global Asset Management",
    title: "STRATEGIC",
    title2: "PRESERVATION",
    description: "Securing legacies through visionary capital allocation.",
  }
];

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const loadImages = () => {
      const imgArray: HTMLImageElement[] = [];
      let loadedCount = 0;
      for (let i = 0; i < frameCount; i++) {
        const img = new window.Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setTimeout(() => {
              setLoaded(true);
              setTimeout(() => setHideLoader(true), 1100);
            }, 500);
          }
        };
        imgArray.push(img);
      }
      setImages(imgArray);
    };
    loadImages();
  }, []);

  useGSAP(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const scrollProp = { frame: 0 };

    const render = (index: number) => {
      const img = images[index];
      if (!img || !context) return;
      const scale = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
      const x = (window.innerWidth / 2) - (img.width / 2) * scale;
      const y = (window.innerHeight / 2) - (img.height / 2) * scale;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    render(0);

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          // Calculamos qué slide mostrar basándonos en el progreso (0 a 1)
          const progress = self.progress;
          const index = Math.min(
            Math.floor(progress * slides.length),
            slides.length - 1
          );
          if (index !== activeSlide) {
            setActiveSlide(index);
          }
        }
      }
    });

    // Sincronización de frames
    mainTimeline.to(scrollProp, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(Math.round(scrollProp.frame)),
    });

    // Animación de entrada de texto (se dispara cada vez que cambia el activeSlide)
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

  }, [loaded, images, activeSlide]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "400vh" }}>
      <Navbar show={loaded} />
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* ÚNICO CONTENEDOR DE TEXTO: Evita solapamientos */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <div 
            ref={textRef}
            className="flex flex-col items-center justify-center text-center max-w-4xl"
          >
            <p className="font-montserrat text-white/40 text-[10px] md:text-xs uppercase tracking-[0.6em] mb-6">
              {slides[activeSlide].tag}
            </p>
            
            <h1 className="font-montserrat text-white text-4xl md:text-[90px] font-black leading-tight uppercase tracking-tighter">
              {slides[activeSlide].title} <br />
              <span className="text-white/80">{slides[activeSlide].title2}</span>
            </h1>

            <p className="font-montserrat text-white/50 text-[10px] md:text-xs max-w-md mt-10 tracking-[0.2em] leading-relaxed uppercase">
              {slides[activeSlide].description}
            </p>
          </div>
        </div>

        {/* Loader */}
        {!hideLoader && (
          <div className={`absolute inset-0 flex items-center justify-center bg-black z-[100] transition-opacity duration-1000 ${loaded ? "opacity-0" : "opacity-100"}`}>
            <Image src="/swanson-logo.png" alt="Loader" width={80} height={80} className="animate-pulse object-contain" priority />
          </div>
        )}
      </div>
    </div>
  );
}