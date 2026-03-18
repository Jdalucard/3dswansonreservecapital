"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const SwanModelViewer = dynamic(() => import("../Three/SwanModel"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
});

interface ContentItem {
  id: number;
  text: string;
  img: string;
  number: string | null;
}

const contentData: ContentItem[] = [
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

const BackgroundVectors = () => (
  <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
    <svg
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0%"
        y1="10%"
        x2="100%"
        y2="40%"
        stroke="#dcc562"
        strokeWidth="0.8"
        opacity="0.6"
        strokeDasharray="15 8"
      />
      <line
        x1="100%"
        y1="30%"
        x2="0%"
        y2="70%"
        stroke="#dcc562"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <line
        x1="20%"
        y1="0%"
        x2="80%"
        y2="100%"
        stroke="#dcc562"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <path
        d="M-50 200 L400 600 L200 1200"
        stroke="#dcc562"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <path
        d="M120% 400 L80% 800 L110% 1400"
        stroke="white"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  </div>
);

const ImageBox = ({ src }: { src: string }) => (
  <div className="group relative h-132.25 max-h-[28vw] w-176.25 max-w-[38vw] overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900/40 shadow-[0_0_60px_rgba(255,255,255,0.08)]">
    <div className="absolute inset-0 z-10 bg-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    <Image src={src} alt="Swanson" fill className="object-cover" />
  </div>
);

const TextBox = ({ text, number }: { text: string; number: string | null }) => (
  <div className="mt-8 max-w-135">
    <p className="font-montserrat text-[22px] leading-[1.7] font-medium tracking-tight text-white/95 antialiased">
      {number && (
        <span className="mr-3 text-[28px] font-extrabold text-[#dcc562] antialiased">
          {number}
        </span>
      )}
      {text}
    </p>
  </div>
);

const ContentBlock = ({
  item,
  index,
  align,
}: {
  item: ContentItem;
  index: number;
  align: "start" | "end";
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col gap-6 items-${align} text-${align} relative z-20`}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateY: isEven ? 30 : -30,
          rotateX: 10,
          z: -100,
          scale: 0.9,
        }}
        whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 1.8,
          ease: [0.19, 1, 0.22, 1],
          delay: index * 0.15,
        }}
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
          width: "100%",
        }}
      >
        {isEven ? (
          <>
            <ImageBox src={item.img} />
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2 }}
            >
              <TextBox text={item.text} number={item.number} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2 }}
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
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );
  const swanY = useTransform(smoothProgress, [0, 1], ["-20vh", "120vh"]);
  const swanRotation = useTransform(smoothProgress, [0, 1], [0, Math.PI * 1.5]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250vh] w-full overflow-hidden bg-black py-24"
    >
      <BackgroundVectors />

      <div className="pointer-events-none absolute top-0 left-1/2 h-140 w-[110%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(220,197,98,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[100px]" />
      <div className="pointer-events-none absolute top-[20%] left-[-15%] h-[60%] w-[60%] rounded-full bg-[#dcc562]/5 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-15%] bottom-[20%] h-[60%] w-[60%] rounded-full bg-[#dcc562]/5 blur-[130px]" />

      <div className="pointer-events-none sticky top-0 z-40 flex h-screen w-full items-center justify-center">
        <motion.div
          style={{ y: swanY, opacity: swanOpacity }}
          className="relative flex h-full w-full max-w-285 items-center justify-center"
        >
          <div className="absolute h-100 w-100 rounded-full bg-[#dcc562]/10 opacity-80 blur-[120px]" />
          <div className="relative h-full w-full">
            <SwanModelViewer rotationY={swanRotation} />
          </div>
        </motion.div>
      </div>

      {/* Grid de Contenido */}
      <div className="relative z-30 -mt-[85vh] flex flex-col items-center gap-[50vh] pb-[30vh]">
        {[0, 2].map((startIndex) => (
          <div
            key={startIndex}
            className="grid w-full max-w-[95vw] grid-cols-3 items-center justify-items-center gap-12 px-16"
          >
            <div className="col-span-1 flex translate-y-30">
              <ContentBlock
                item={contentData[startIndex]}
                index={startIndex}
                align="end"
              />
            </div>
            <div className="col-span-1" />
            <div className="col-span-1 flex -translate-y-30">
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
