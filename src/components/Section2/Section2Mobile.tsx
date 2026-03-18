"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SwanModelViewer = dynamic(() => import("../Three/SwanModel"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square h-80 w-full max-w-70 bg-transparent" />
  ),
});

const contentData = [
  {
    id: 1,
    text: "Swanson Reserve Capital is private investment fund with dual Share Classes, Structured Notes & Long Equity Quantitative investing.",
    img: "/OfficeMobile2.png",
    number: null,
  },
  {
    id: 2,
    text: "Create Quarterly Income: Pay ongoing expenses, kids tuition, mortgages, car payments, private jet, or fund charitable contributions.",
    img: "/OfficeMobile1.png",
    number: "1.",
  },
];

const ImageBoxMobile = ({ src }: { src: string }) => (
  <div className="relative aspect-16/10 w-full overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900/40 shadow-2xl">
    <Image src={src} alt="Swanson" fill className="object-cover" priority />
  </div>
);

const TextBoxMobile = ({
  text,
  number,
}: {
  text: string;
  number: string | null;
}) => (
  <div className="mt-4 w-full px-2">
    <p className="font-montserrat text-[14px] leading-relaxed tracking-tight text-white/70">
      {number && (
        <span className="mr-2 text-[16px] font-bold text-[#dcc562]">
          {number}
        </span>
      )}
      {text}
    </p>
  </div>
);

export default function Section2Mobile() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black py-20"
      style={{ willChange: "transform" }}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <div className="relative h-full w-[150%] max-w-none rotate-12">
          <Image
            src="/logoName.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-0 right-10 h-[40%] w-[0.5px] rotate-[15deg] bg-white/20" />
        <div className="absolute bottom-0 left-10 h-[40%] w-[0.5px] rotate-[15deg] bg-white/20" />
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative mb-6 flex w-full flex-col items-end pr-6 text-right"
        >
          <div className="w-[85%]">
            <ImageBoxMobile src={contentData[0].img} />
            <TextBoxMobile
              text={contentData[0].text}
              number={contentData[0].number}
            />
          </div>
        </motion.div>

        <div className="relative z-30 my-4 flex h-80 w-full items-center justify-center">
          <div className="absolute h-60 w-60 translate-z-0 rounded-full bg-[#dcc562]/10 blur-[90px]" />

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="aspect-square h-full w-full max-w-70">
              <SwanModelViewer />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative mt-6 flex w-full flex-col items-start pl-6 text-left"
        >
          <div className="w-[85%]">
            <ImageBoxMobile src={contentData[1].img} />
            <TextBoxMobile
              text={contentData[1].text}
              number={contentData[1].number}
            />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-125 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dcc562]/5 blur-[120px]" />
    </section>
  );
}
