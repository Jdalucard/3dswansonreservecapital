"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 237;
const currentFrame = (index: number) =>
  `/last_mobile_sequence/swanson__${index.toString().padStart(5, "0")}.jpg`;

const slidesMobile = [
  {
    start: 0,
    end: 60,
    number: "03",
    title: "Prosperity",
    title2: "Protected",
    tag: "Another Subtitle of Lorem Ipsum",
  },
  {
    start: 80,
    end: 140,
    number: "01",
    title: "Innovation",
    title2: "Invested",
    tag: "Market Cap Strategy",
  },
  {
    start: 170,
    end: 236,
    number: "02",
    title: "Global",
    title2: "Legacy",
    tag: "Swanson Reserve",
  },
];

export default function HeroMobile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const renderFrame = useCallback(
    (frameIndex: number, imgs: HTMLImageElement[]) => {
      const canvas = canvasRef.current;
      if (!canvas || imgs.length === 0) return;
      const context = canvas.getContext("2d", { alpha: false });
      const img = imgs[frameIndex];
      if (!img || !context) return;

      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const scale = Math.max(cw / img.width, ch / img.height);
      const x = (cw - img.width * scale) / 2;
      const y = (ch - img.height * scale) / 2;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    },
    []
  );

  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    const finishLoading = () => {
      setIsLoaded((prev) => {
        if (prev) return prev;

        if (canvasRef.current) {
          const dpr = window.devicePixelRatio || 1;
          canvasRef.current.width = window.innerWidth * dpr;
          canvasRef.current.height = window.innerHeight * dpr;
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) ctx.scale(dpr, dpr);
          renderFrame(0, imgArray);
        }

        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);

        return true;
      });
    };

    const safetyTimeout = setTimeout(finishLoading, 10000);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          clearTimeout(safetyTimeout);
          setTimeout(finishLoading, 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) finishLoading();
      };
      imgArray.push(img);
    }
    setImages(imgArray);
    return () => clearTimeout(safetyTimeout);
  }, [renderFrame]);

  useGSAP(() => {
    if (!isLoaded || images.length === 0) return;

    const scrollProp = { frame: 0 };

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
      onUpdate: () => renderFrame(Math.round(scrollProp.frame), images),
    });

    slidesMobile.forEach((s, i) => {
      gsap.set(`.m-slide-${i}`, { opacity: 0, y: 30 });
      tl.to(
        `.m-slide-${i}`,
        { opacity: 1, y: 0, duration: 0.1 },
        s.start / FRAME_COUNT
      ).to(
        `.m-slide-${i}`,
        { opacity: 0, y: -30, duration: 0.1 },
        s.end / FRAME_COUNT
      );
    });
  }, [isLoaded, images, renderFrame]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader-mobile"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative h-40 w-40"
            >
              <Image
                src="/CisneLoad.png"
                alt="Loading"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        className="relative w-full bg-black"
        style={{ height: isLoaded ? "450vh" : "100vh" }}
      >
        <div
          className={`fixed top-0 left-0 z-[120] flex w-full items-center justify-between px-8 py-10 transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-10 w-10">
            <Image
              src="/logoName.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-0.5 w-10 bg-white" />
            <div className="h-0.5 w-10 bg-white/60" />
          </div>
        </div>

        <div
          ref={stickyRef}
          className="h-screen w-full overflow-hidden bg-black"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 h-full w-full"
          />

          <div className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-end px-8 pb-[15%]">
            {slidesMobile.map((slide, index) => (
              <div
                key={index}
                className={`m-slide-${index} absolute right-8 bottom-[15%] left-8`}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-[0.5px] w-8 bg-white/40" />
                  <p className="font-montserrat text-[11px] font-light tracking-[0.2em] text-white/70 uppercase">
                    {slide.tag}
                  </p>
                </div>

                <h1 className="font-montserrat text-[48px] leading-[1.1] font-medium text-white uppercase subpixel-antialiased">
                  {slide.title} <br />
                  <span className="font-light opacity-80">{slide.title2}</span>
                </h1>

                <div className="mt-14 flex w-fit items-center gap-4">
                  <span className="font-montserrat pr-2 text-[14px] font-bold text-white">
                    {slide.number}
                  </span>
                  <div className="relative h-[0.5px] w-16 bg-white/30">
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                  <div className="flex gap-4 pl-2 text-[14px] font-light opacity-30">
                    {slidesMobile.map(
                      (s, idx) =>
                        s.number !== slide.number && (
                          <span key={idx}>{s.number}</span>
                        )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
