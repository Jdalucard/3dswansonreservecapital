"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import SwanModelViewer from "./Three/SwanModel";

const contentData = [
  {
    id: 1,
    text: "Swanson Reserve Capital is private investment fund with dual Share Classes, Structured Notes & Long Equity Quantitative investing.",
    img: "/family.png",
    number: null,
  },
  {
    id: 2,
    text: "Create Quarterly Income: Pay ongoing expenses, kids tuition, mortgages, car payments, private jet, or fund charitable contributions.",
    img: "/office.png",
    number: "1.",
  },
  {
    id: 3,
    text: "Achieve Long Term Growth: While still receiving quarterly distributions, our Growth Notes and Equity Allocations are designed to accumulate long term wealth.",
    img: "/family.png",
    number: "2.",
  },
  {
    id: 4,
    text: "Capital Preservation: Both investment Share Classes are designed to shield our investors from large market downturns.",
    img: "/ofiice2.png",
    number: "3.",
  },
];

const ImageBox = ({ src }: { src: string }) => (
  <div className="relative w-176.25 max-w-[38vw] h-132.25 max-h-[28vw] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/40">
    <Image src={src} alt="Swanson" fill className="object-cover" priority />
  </div>
);

const TextBox = ({ text, number }: { text: string; number: string | null }) => (
  <div className="max-w-125 mt-6">
    <p className="text-white/90 font-montserrat text-[20px] leading-[1.6] tracking-tight">
      {number && (
        <span className="text-[#dcc562] font-bold mr-2 text-[24px]">
          {number}
        </span>
      )}
      {text}
    </p>
  </div>
);

interface ContentItem {
  id: number;
  text: string;
  img: string;
  number: string | null;
}

type Align = "start" | "end";

const ContentBlock = ({
  item,
  index,
  align,
}: {
  item: ContentItem;
  index: number;
  align: Align;
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col gap-4 items-${align} text-${align} relative`}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateY: isEven ? 35 : -35,
          rotateX: 15,
          z: -150,
          scale: 0.85,
        }}
        whileInView={{
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
          scale: 1,
        }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 2,
          ease: [0.19, 1, 0.22, 1],
          delay: index * 0.1,
        }}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          width: "100%",
        }}
      >
        {isEven ? (
          <>
            <ImageBox src={item.img} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <TextBox text={item.text} number={item.number} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <TextBox text={item.text} number={item.number} />
            </motion.div>
            <ImageBox src={item.img} />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default function Section2() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const swanOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const swanY = useTransform(smoothProgress, [0, 1], ["-30vh", "140vh"]);
  const swanRotation = useTransform(smoothProgress, [0, 1], [0, Math.PI * 2]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-10 overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-40 pointer-events-none">
        <motion.div
          style={{ y: swanY, opacity: swanOpacity }}
          className="w-full h-full max-w-275"
        >
          <SwanModelViewer rotationY={swanRotation} />
        </motion.div>
      </div>

      <div className="relative z-30 -mt-[80vh] flex flex-col items-center gap-[40vh] pb-[40vh]">
        {[0, 2].map((startIndex) => (
          <div
            key={startIndex}
            className="grid grid-cols-3 justify-items-center gap-10 w-full max-w-475 px-12 items-center"
          >
            <div className="col-span-1 translate-y-60 flex ">
              <ContentBlock
                item={contentData[startIndex]}
                index={startIndex}
                align="end"
              />
            </div>

            <div className="col-span-1" />

            <div className="col-span-1 -translate-y-60 flex ">
              <ContentBlock
                item={contentData[startIndex + 1]}
                index={startIndex + 1}
                align="start"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
