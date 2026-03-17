"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
        window.innerHeight / img.height,
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

    // Animación de textos (Slides)
    const slides = gsap.utils.toArray(".slide-item") as HTMLElement[];
    slides.forEach((slideElement, index) => {
      const slide = slidesData[index];
      const start = slide.startFrame / FRAME_COUNT;
      const end = slide.endFrame / FRAME_COUNT;
      gsap.set(slideElement, { opacity: 0, y: 30 });
      tl.to(slideElement, { opacity: 1, y: 0, duration: 0.1 }, start).to(
        slideElement,
        { opacity: 0, y: -30, duration: 0.1 },
        end,
      );
    });
  }, [isLoaded, images]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full bg-black"
      style={{ height: "600vh" }}
    >
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar show={isLoaded} />
      </div>

      <div ref={stickyRef} className="w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />
        <div className="relative z-10 w-full h-full pointer-events-none">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`slide-item absolute flex flex-col ${
                slide.position === "center-bottom"
                  ? "left-1/2 -translate-x-1/2 items-center text-center w-full top-[68%]"
                  : "bottom-[18%] left-[82px] items-start text-left w-auto"
              }`}
            >
              {slide.tag && (
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-[0.5px] bg-white" />
                  <p className="font-montserrat text-white uppercase tracking-[0.4em] text-[11px] font-light">
                    {slide.tag}
                  </p>
                </div>
              )}
              <h1 className="font-montserrat text-white antialiased text-[80px] md:text-[110px] leading-[1.05] font-medium uppercase">
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
