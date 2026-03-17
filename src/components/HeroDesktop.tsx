"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar"; // Asegúrate de que la ruta sea correcta

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
    position: "left",
  },
  {
    startFrame: 75,
    endFrame: 105,
    tag: "Swanson Reserve Capital Is",
    title: "INNOVATION",
    title2: "INVESTED",
    position: "left",
  },
  {
    startFrame: 130,
    endFrame: 165,
    tag: "Swanson Reserve Capital Is",
    title: "PROSPERITY",
    title2: "PROTECTED",
    position: "left",
  },
  {
    startFrame: 195,
    endFrame: 254,
    tag: "",
    title: "+ We are",
    title2: "Swanson Reserve",
    position: "center-bottom",
  },
];

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setIsLoaded(true);
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  useGSAP(() => {
    if (!isLoaded || !canvasRef.current || !scrollContainerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const scrollProp = { frame: 0 };

    const render = (frameIndex: number) => {
      const img = images[frameIndex];
      if (!img || !context) return;
      const scale = Math.max(
        window.innerWidth / img.width,
        window.innerHeight / img.height
      );
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
        scrub: true,
        pin: stickyRef.current,
        pinSpacing: false,
      },
    });

    tl.to(scrollProp, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => render(Math.round(scrollProp.frame)),
    });

    const slides = gsap.utils.toArray(".slide-item") as HTMLElement[];
    slides.forEach((slideElement, index) => {
      const slide = slidesData[index];
      const start = slide.startFrame / FRAME_COUNT;
      const end = slide.endFrame / FRAME_COUNT;
      gsap.set(slideElement, { opacity: 0, y: 30 });
      tl.to(slideElement, { opacity: 1, y: 0, duration: 0.1 }, start).to(
        slideElement,
        { opacity: 0, y: -30, duration: 0.1 },
        end
      );
    });
  }, [isLoaded, images]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full bg-black"
      style={{ height: "600vh" }}
    >
      {/* Inyectamos tu Navbar real aquí. 
          Él ya tiene la clase 'fixed' y maneja su propia opacidad/traducción con la prop 'show'
      */}
      <Navbar show={isLoaded} />

      <div ref={stickyRef} className="h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
        />
        <div className="pointer-events-none relative z-10 h-full w-full">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`slide-item absolute flex flex-col ${
                slide.position === "center-bottom"
                  ? "top-[68%] left-1/2 w-full -translate-x-1/2 items-center text-center"
                  : "bottom-[18%] left-[82px] w-auto items-start text-left"
              }`}
            >
              {slide.tag && (
                <div className="mb-2 flex items-center gap-4">
                  <div className="h-[0.5px] w-12 bg-white" />
                  <p className="font-montserrat text-[11px] font-light tracking-[0.4em] text-white uppercase">
                    {slide.tag}
                  </p>
                </div>
              )}
              <h1 className="font-montserrat text-[80px] leading-[1.05] font-medium text-white uppercase antialiased md:text-[110px]">
                {slide.title} <br />
                <span>{slide.title2}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
