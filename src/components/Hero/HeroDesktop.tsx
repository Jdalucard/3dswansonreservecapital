"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";

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
    position: "bottom",
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
        if (loadedCount === FRAME_COUNT) {
          setTimeout(() => setIsLoaded(true), 1000);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  useGSAP(() => {
    if (!isLoaded || !canvasRef.current || !scrollContainerRef.current) return;

    ScrollTrigger.refresh();
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
      gsap.set(slideElement, { opacity: 0, scale: 0.95, y: 30 });
      tl.to(
        slideElement,
        { opacity: 1, scale: 1, y: 0, duration: 0.1 },
        start
      ).to(
        slideElement,
        { opacity: 0, scale: 1.05, y: -20, duration: 0.1 },
        end
      );
    });

    gsap.set(".scroll-explore", { opacity: 0, y: 10 });
    tl.to(
      ".scroll-explore",
      { opacity: 1, y: 0, duration: 0.1 },
      240 / FRAME_COUNT
    );
  }, [isLoaded, images]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="relative h-64 w-64"
            >
              <Image
                src="/CisneLoad.png"
                alt="Loader"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={scrollContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className={`relative w-full bg-black ${!isLoaded ? "h-screen overflow-hidden" : ""}`}
        style={{ height: isLoaded ? "600vh" : "100vh" }}
      >
        {isLoaded && <Navbar show={true} />}

        <div ref={stickyRef} className="h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 h-full w-full"
          />

          <div className="pointer-events-none relative z-10 h-full w-full">
            {slidesData.map((slide, index) => (
              <div
                key={index}
                className={`slide-item absolute inset-0 flex flex-col items-center justify-end px-6 text-center ${
                  slide.position === "left"
                    ? "md:left-20 md:w-auto md:items-start md:pb-[18vh] md:text-left"
                    : "w-full pb-[10vh]"
                }`}
              >
                {slide.tag && (
                  <div className="mb-2 flex items-center gap-4">
                    <div className="h-[0.5px] w-12 bg-white" />
                    <p className="font-montserrat text-[10px] font-light tracking-[0.4em] text-white uppercase md:text-[11px]">
                      {slide.tag}
                    </p>
                  </div>
                )}
                <h2 className="font-montserrat text-[28px] leading-[1.1] font-medium text-white uppercase antialiased sm:text-[45px] md:text-[65px] lg:text-[80px]">
                  {slide.title} <br />
                  <span className="font-light">{slide.title2}</span>
                </h2>
              </div>
            ))}

            <div className="scroll-explore absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
              <div className="relative flex flex-col items-center justify-end pb-2">
                <div className="absolute bottom-[-20px] h-[60px] w-[120px] rounded-full bg-white/5 blur-xl" />
                <p className="font-montserrat relative mb-2 text-[9px] font-light tracking-[0.5em] text-white/40 uppercase">
                  Scroll to explore
                </p>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-4 w-4 text-white/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path
                      d="M7 13l5 5 5-5M12 6v12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
