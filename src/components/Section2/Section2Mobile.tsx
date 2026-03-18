"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import SwanModelViewer from "../Three/SwanModel";

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
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-40">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 200 400 L 320 150"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <motion.path
            d="M 200 400 L 80 650"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />

          <circle cx="200" cy="400" r="2" fill="#dcc562" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <div className="relative w-[150%] max-w-none rotate-12">
          <Image
            src="/logoName.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-6 flex w-full flex-col items-end pr-8 text-right"
        >
          <div className="w-[75%]">
            <ImageBoxMobile src={contentData[0].img} />
          </div>
          <div className="w-[85%]">
            <TextBoxMobile
              text={contentData[0].text}
              number={contentData[0].number}
            />
          </div>
        </motion.div>

        <div className="relative z-30 my-8 flex h-100 w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="aspect-square h-full w-full max-w-87.5">
              <SwanModelViewer />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-6 flex w-full flex-col items-start pl-8 text-left"
        >
          <div className="w-[75%]">
            <ImageBoxMobile src={contentData[1].img} />
          </div>
          <div className="w-[85%]">
            <TextBoxMobile
              text={contentData[1].text}
              number={contentData[1].number}
            />
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-full -translate-x-1/2 -translate-y-1/2 bg-[#dcc562]/10 blur-[120px]" />
    </section>
  );
}
