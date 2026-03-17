"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
          <div className="h-[600px] w-[600px] rounded-full bg-[#dcc562]/10 blur-[120px]" />
        </div>

        <div className="absolute bottom-[16%] z-0 flex w-full justify-center">
          <div className="relative h-[120px] w-[380px]">
            <div
              className="absolute inset-0 rounded-[100%] border-[4px] border-[#dcc562]"
              style={{ transform: "rotateX(70deg)" }}
            />
          </div>
        </div>

        <div
          className="relative z-10 flex h-[460px] w-full items-center justify-center"
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
                  initial={{ opacity: 0, scale: 0.7, x: isLeft ? -150 : 150 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.35,
                    scale: isCenter ? 1 : 0.75,
                    x: isCenter ? 0 : isLeft ? -130 : 130,
                    rotateY: isCenter ? 0 : isLeft ? 45 : -45,
                    z: isCenter ? 150 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) nextMember();
                    if (info.offset.x > 50) prevMember();
                  }}
                  className="absolute h-[380px] w-[260px] cursor-grab overflow-hidden rounded-[32px] bg-black shadow-[0_0_60px_rgba(0,0,0,0.9)] active:cursor-grabbing"
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

                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  {isCenter && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="absolute bottom-0 z-20 w-full bg-transparent px-5 py-8 text-center"
                    >
                      <h3 className="font-sans text-2xl font-bold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="mt-2 font-sans text-[10px] font-black tracking-[0.25em] text-[#dcc562] uppercase">
                        {member.role}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div
            className="pointer-events-none absolute top-[55%] right-[12%] h-20 w-20"
            style={{
              zIndex: 100,
              transform: "translateZ(350px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/DragMobile.png"
              alt="Drag indicator"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
