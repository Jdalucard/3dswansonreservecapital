"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Navbar from "./Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 255;
const currentFrame = (index: number) =>
  `/last_desktop_sequence/swanson__${index.toString().padStart(5, "0")}.jpg`;

const slidesData = [
  {
    startFrame: 0,
    endFrame: 50,
    tag: "Market Capitalization Company",
    title: "SWANSON",
    title2: "RESERVE CAPITAL",
    position: "left"
  },
  {
    startFrame: 75, 
    endFrame: 105,
    tag: "Swanson Reserve Capital Is",
    title: "INNOVATION",
    title2: "INVESTED",
    position: "left"
  },
  {
    startFrame: 130, 
    endFrame: 165,
    tag: "Swanson Reserve Capital Is",
    title: "PROSPERITY",
    title2: "PROTECTED",
    position: "left"
  },
  {
    startFrame: 195, 
    endFrame: 254,
    tag: "", 
    title: "+ We are",
    title2: "Swanson Reserve", 
    position: "center-bottom" 
  },
];

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaderHidden, setIsLoaderHidden] = useState(false);

  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
          setTimeout(() => setIsLoaderHidden(true), 1000);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  useGSAP(() => {
    if (!isLoaded || !canvasRef.current || !scrollContainerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const slides = gsap.utils.toArray(".slide-item") as HTMLElement[];
    const scrollProp = { frame: 0 };

    const render = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !context) return;
      const scale = Math.max(window.innerWidth / img.width, window.innerHeight / img.height);
      const x = window.innerWidth / 2 - (img.width / 2) * scale;
      const y = window.innerHeight / 2 - (img.height / 2) * scale;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    render(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(scrollProp, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(Math.round(scrollProp.frame)),
    }, 0);

    slides.forEach((slideElement, index) => {
      const slide = slidesData[index];
      const fadeInPos = slide.startFrame / FRAME_COUNT;
      const fadeOutPos = slide.endFrame / FRAME_COUNT;

      gsap.set(slideElement, { opacity: 0, x: 50, autoAlpha: 0 });

      if (index === 0) {
        gsap.set(slideElement, { opacity: 1, x: 0, autoAlpha: 1 });
        tl.to(slideElement, { opacity: 0, x: -50, autoAlpha: 0, duration: 0.1 }, fadeOutPos);
      } else {
        tl.to(slideElement, { opacity: 1, x: 0, autoAlpha: 1, duration: 0.1 }, fadeInPos)
          .to(slideElement, { opacity: 0, x: -50, autoAlpha: 0, duration: 0.1 }, fadeOutPos);
      }
    });

    tl.fromTo(".explore-footer", 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.05, autoAlpha: 1 }, 
      230 / FRAME_COUNT
    );

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [isLoaded, images]);

  return (
    <div ref={scrollContainerRef} className="relative w-full bg-black" style={{ height: '800vh' }}>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar show={isLoaded} />
      </div>

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

        <div className="relative z-10 w-full h-full pointer-events-none">
          {slidesData.map((slide, index) => (
            <div 
              key={index} 
              className={`slide-item absolute flex flex-col ${
                slide.position === "center-bottom" 
                  ? "left-1/2 -translate-x-1/2 items-center text-center w-full" 
                  : "bottom-[18%] left-[82px] items-start text-left w-auto"
              }`}
              style={slide.position === "center-bottom" ? { top: '68%' } : {}}
            >
              {slide.tag && (
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-[0.5px] bg-white" />
                  <p className="font-montserrat text-white uppercase tracking-[0.4em] text-[11px] font-light">
                    {slide.tag}
                  </p>
                </div>
              )}

              <h1 className="font-montserrat text-white antialiased"
                  style={{ 
                    fontSize: slide.position === "center-bottom" ? '80px' : '110px', 
                    lineHeight: '1.05',  
                    fontWeight: slide.position === "center-bottom" ? '300' : '500',
                    textTransform: slide.position === "center-bottom" ? 'none' : 'uppercase'
                  }}>
                {slide.title} <br />
                <span>{slide.title2}</span>
              </h1>
            </div>
          ))}

          <div className="explore-footer absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pb-12 opacity-0">
            <div className="absolute bottom-0 w-[550px] h-[100px] bg-white/10 blur-[50px] rounded-t-full -z-10" />
            <span className="font-montserrat text-white/60 uppercase tracking-[0.5em] text-[10px] mb-4">
              Scroll to Explore
            </span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent opacity-50" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M7 13l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}