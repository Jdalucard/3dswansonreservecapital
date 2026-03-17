"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 237;
const currentFrame = (index: number) =>
  `/last_mobile_sequence/swanson__${index.toString().padStart(5, "0")}.jpg`;

const slidesMobile = [
  { start: 0, end: 60, title: "SWANSON", title2: "RESERVE", tag: "Market Cap" },
  {
    start: 80,
    end: 140,
    title: "PROSPERITY",
    title2: "PROTECTED",
    tag: "Innovation",
  },
  { start: 170, end: 236, title: "+ WE ARE", title2: "SWANSON", tag: "" },
];

export default function HeroMobile() {
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

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    render(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
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

    slidesMobile.forEach((s, i) => {
      gsap.set(`.m-slide-${i}`, { opacity: 0, y: 20 });
      tl.to(
        `.m-slide-${i}`,
        { opacity: 1, y: 0, duration: 0.1 },
        s.start / FRAME_COUNT
      ).to(
        `.m-slide-${i}`,
        { opacity: 0, y: -20, duration: 0.1 },
        s.end / FRAME_COUNT
      );
    });
  }, [isLoaded, images]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-[450vh] w-full bg-black"
    >
      {/* CABECERA CORREGIDA: LOGO IZQUIERDA, HAMBURGUESA DERECHA */}
      <div
        className={`fixed top-0 left-0 z-[120] flex w-full items-center justify-between px-8 py-8 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* LOGO */}
        <div className="relative h-12 w-12">
          <Image
            src="/logoName.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* HAMBURGUESA ESTÁTICA */}
        <div className="flex flex-col items-end gap-1.5 p-2 opacity-90">
          <div className="h-px w-8 bg-white" />
          <div className="h-px w-5 bg-white" />
        </div>
      </div>

      <div ref={stickyRef} className="h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
        />

        <div className="pointer-events-none relative z-10 h-full w-full px-8">
          {slidesMobile.map((slide, index) => (
            <div
              key={index}
              className={`m-slide-${index} absolute bottom-[18%] left-8 flex flex-col items-start`}
            >
              {slide.tag && (
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-[0.5px] w-8 bg-white/50" />
                  <p className="font-montserrat text-[10px] font-light tracking-[0.4em] text-white uppercase">
                    {slide.tag}
                  </p>
                </div>
              )}
              <h1 className="font-montserrat text-[42px] leading-[1.1] font-medium text-white uppercase antialiased">
                {slide.title} <br />
                <span className="font-light opacity-80">{slide.title2}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
