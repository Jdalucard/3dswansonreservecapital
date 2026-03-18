"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 3,
    name: "Joshua Donjuan",
    role: "Partner financial consultant",
    img: "/member3L.png",
  },
  {
    id: 1,
    name: "Kraig Swanson",
    role: "Founder - Managing Partner",
    img: "/kraig.png",
  },
  {
    id: 2,
    name: "Tony Chvala",
    role: "Advisory Board - Ex-Amazon Exec",
    img: "/menber2R.png",
  },
];

export default function Section3() {
  const [index, setIndex] = useState(1);

  const nextMember = () => setIndex((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () =>
    setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  return (
    <section
      className="relative -mt-px flex min-h-screen w-full flex-col items-center justify-center overflow-hidden border-none bg-black py-20"
      style={{ perspective: "1500px" }}
    >
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-32 w-full bg-linear-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-32 w-full bg-linear-to-t from-black to-transparent" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 h-125 w-full bg-linear-to-b from-[#dcc562]/15 via-transparent to-transparent blur-[120px]" />

        <div className="absolute bottom-0 h-125 w-full bg-linear-to-t from-[#dcc562]/15 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute top-12 z-20 text-center">
        <h2 className="text-5xl font-light tracking-tighter text-white md:text-7xl">
          We are <span className="font-bold text-[#dcc562]">Swanson</span>
        </h2>
      </div>

      <div
        className="relative z-10 flex h-150 w-full items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {teamMembers.map((member, i) => {
            const isCenter = i === index;
            const isLeft =
              i === (index - 1 + teamMembers.length) % teamMembers.length;
            const isRight = i === (index + 1) % teamMembers.length;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isCenter ? 1 : 0.6,
                  scale: isCenter ? 1 : 0.9,
                  x: isCenter ? 0 : isLeft ? -260 : 260,
                  rotateY: isCenter ? 0 : isLeft ? 25 : -25,
                  z: isCenter ? 50 : -200,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) nextMember();
                  if (info.offset.x > 50) prevMember();
                }}
                className="absolute h-130 w-90 cursor-grab overflow-hidden rounded-[30px] border border-white/10 bg-zinc-900 shadow-[0_50px_100px_rgba(0,0,0,0.9)] active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: isCenter ? 40 : 10,
                }}
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {!isCenter && (
                  <div className="absolute inset-0 z-10 bg-black/40 transition-opacity" />
                )}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 z-20 flex h-28 w-full flex-col items-center justify-center border-t border-white/10 bg-zinc-900/90 backdrop-blur-md"
                  >
                    <h3 className="text-2xl font-bold tracking-tighter text-white">
                      {member.name}
                    </h3>
                    <p className="text-[9px] font-black tracking-[0.3em] text-[#dcc562] uppercase">
                      {member.role}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-[calc(50%-210px)] z-50 hidden -translate-y-1/2 lg:block">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dcc562] text-[10px] font-bold text-black shadow-[0_0_40px_rgba(220,197,98,0.6)]"
        >
          DRAG
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-5 z-0 flex w-full justify-center">
        <div className="relative flex h-37.5 w-200 items-center justify-center overflow-visible">
          <div
            className="absolute h-20 w-full rounded-[100%] bg-[#dcc562] opacity-30 blur-[60px]"
            style={{ transform: "rotateX(75deg)" }}
          />
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 120"
            className="drop-shadow-[0_0_20px_rgba(220,197,98,0.7)]"
            style={{ transform: "rotateX(75deg)" }}
          >
            <defs>
              <linearGradient
                id="goldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#dcc562" stopOpacity="0" />
                <stop offset="30%" stopColor="#dcc562" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#dcc562" stopOpacity="1" />
                <stop offset="70%" stopColor="#dcc562" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dcc562" stopOpacity="0" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <ellipse
              cx="500"
              cy="60"
              rx="450"
              ry="50"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="4"
              filter="url(#softGlow)"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
