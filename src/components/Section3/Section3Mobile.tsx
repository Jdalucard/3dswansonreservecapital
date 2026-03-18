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
    img: "/mobilel.png",
  },
  {
    id: 1,
    name: "Kraig Swanson",
    role: "Founder - Managing Partner",
    img: "/KraigSwansonMobile.png",
  },
  {
    id: 2,
    name: "Tony Chvala",
    role: "Advisory Board - Ex-Amazon Exec",
    img: "/mobiler.png",
  },
];

export default function Section3Mobile() {
  const [index, setIndex] = useState(1);

  const nextMember = () => setIndex((prev) => (prev + 1) % teamMembers.length);
  const prevMember = () =>
    setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-black pt-16 pb-12"
      style={{ perspective: "1500px" }}
    >
      <div className="relative z-20 mb-12 px-6 text-center">
        <h2 className="font-sans text-4xl leading-tight font-light tracking-tighter text-white">
          We are <br />
          <span className="font-serif font-bold text-[#dcc562]">Swanson</span>
        </h2>
      </div>

      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <div className="h-[140%] w-[140%] rounded-full bg-[radial-gradient(circle,rgba(220,197,98,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[80px]" />

          <div className="absolute h-80 w-80 rounded-full bg-[#dcc562]/10 blur-[120px]" />
        </div>

        <div className="pointer-events-none absolute bottom-[14%] z-0 flex w-full justify-center opacity-90">
          <div className="relative h-10 w-70">
            <div
              className="absolute inset-0 rounded-[100%] bg-[#dcc562]/30 blur-2xl"
              style={{ transform: "rotateX(70deg) scale(1.5)" }}
            />

            <div
              className="absolute inset-0 rounded-[100%] border border-[#f7dc6f] shadow-[0_0_30px_5px_rgba(247,220,111,0.5)]"
              style={{ transform: "rotateX(75deg)" }}
            />
          </div>
        </div>

        <div
          className="relative z-10 flex h-115 w-full items-center justify-center"
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
                  initial={{ opacity: 0, scale: 0.8, z: -100 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.75,
                    x: isCenter ? 0 : isLeft ? -120 : 120,
                    rotateY: isCenter ? 0 : isLeft ? 35 : -35,
                    z: isCenter ? 150 : -50,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) nextMember();
                    if (info.offset.x > 40) prevMember();
                  }}
                  className="absolute h-105 w-70 cursor-grab overflow-hidden rounded-4xl bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.9)] active:cursor-grabbing"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: isCenter ? 30 : 10,
                  }}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />

                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-transparent to-[rgba(220,197,98,0.05)]" />

                  {isCenter && (
                    <motion.div
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute bottom-0 z-20 w-full px-4 py-10 text-center"
                    >
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[9px] font-black tracking-[0.2em] text-[#dcc562] uppercase">
                        {member.role}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="pointer-events-none absolute top-[52%] right-[10%] z-100 h-16 w-16"
          style={{ transform: "translateZ(500px)" }}
        >
          <Image
            src="/DragMobile.png"
            alt="Drag indicator"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
