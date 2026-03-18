"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SwanModelViewer = dynamic(() => import("../Three/SwanModel"), {
  ssr: false,
  loading: () => (
    <div className="aspect-square h-full w-full max-w-87.5 bg-transparent" />
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
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 350 0 L 200 550"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "linear" }}
          />
          <motion.path
            d="M 200 550 L 50 1200"
            stroke="white"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "linear", delay: 0.3 }}
          />
          <circle cx="200" cy="550" r="2" fill="#dcc562" />
        </svg>
      </div>

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

      <div className="relative z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="aspect-square h-full w-full max-w-70">
              <SwanModelViewer />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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

      <div className="pointer-events-none absolute top-1/2 left-1/2 h-100 w-full -translate-x-1/2 -translate-y-1/2 bg-[#dcc562]/10 blur-[100px]" />
    </section>
  );
}
