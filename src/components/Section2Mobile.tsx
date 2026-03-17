"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import SwanModelViewer from "./Three/SwanModel";

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
  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900/40 shadow-2xl">
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
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <img
          src="/logoName.png"
          alt=""
          className="w-[150%] max-w-none rotate-12"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
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

        <div className="relative z-30 my-8 flex h-[400px] w-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="aspect-square h-full w-full max-w-[350px]">
              <SwanModelViewer />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
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

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-full -translate-x-1/2 -translate-y-1/2 bg-[#dcc562]/5 blur-[120px]" />
    </section>
  );
}
