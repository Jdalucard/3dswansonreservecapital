"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "Kraig Swanson",
    role: "Founder • Managing Partner",
    img: "/kraig.png",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Chief Investment Officer",
    img: "/member2.png",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Head of Quantitative Research",
    img: "/member3.png",
  },
];

const CARD_WIDTH = 340;
const GAP = 40;

const TeamCard = ({ member, index, dragX }: any) => {
  // Cálculo da posição fixa inicial de cada cartão
  const centerOffset = index * (CARD_WIDTH + GAP);

  // Hook corrigido: useTransform chamado no nível superior do componente
  const x = useTransform(dragX, (latest: number) => latest + centerOffset);

  // Efeitos 3D baseados na posição 'x' individual (Curvatura)
  const rotateY = useTransform(x, [-500, 0, 500], [35, 0, -35]);
  const z = useTransform(x, [-500, 0, 500], [-150, 0, -150]);
  const opacity = useTransform(x, [-800, 0, 800], [0.4, 1, 0.4]);
  const scale = useTransform(x, [-500, 0, 500], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        height: 480,
        x,
        rotateY,
        z,
        opacity,
        scale,
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="absolute flex-shrink-0 rounded-[30px] overflow-hidden border border-white/10 bg-zinc-900/50 shadow-2xl"
    >
      <Image
        src={member.img}
        alt={member.name}
        fill
        className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        priority
      />

      {/* Overlay de Gradiente e Texto (Estilo Kraig Swanson) */}
      <div className="absolute bottom-0 w-full p-10 bg-gradient-to-t from-black via-black/60 to-transparent text-center">
        <h3 className="text-white text-2xl font-bold font-montserrat tracking-tight">
          {member.name}
        </h3>
        <p className="text-[#dcc562] text-sm mt-2 font-medium tracking-widest uppercase">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
};

export default function Section3() {
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);

  const smoothDragX = useSpring(dragX, {
    stiffness: 150,
    damping: 25,
  });

  return (
    <section className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden py-24">
      {/* Título com Estilo */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-white text-5xl md:text-6xl font-light mb-24 font-montserrat text-center"
      >
        We are <span className="text-[#dcc562] font-semibold">Swanson</span>
      </motion.h2>

      {/* Área do Carrossel */}
      <div
        ref={containerRef}
        className="relative w-full h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="x"
          // Definimos limites para que o utilizador não perca o carrossel de vista
          dragConstraints={{ left: -600, right: 600 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ x: dragX }}
          className="flex items-center justify-center w-full h-full"
        >
          {teamMembers.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              index={i}
              dragX={smoothDragX}
            />
          ))}
        </motion.div>

        {/* Botão Flutuante "DRAG" que reage ao clique */}
        <motion.div
          animate={{
            scale: isDragging ? 0.8 : 1,
            opacity: isDragging ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="pointer-events-none absolute z-50 w-28 h-28 rounded-full bg-[#dcc562]/90 backdrop-blur-sm flex items-center justify-center text-black font-bold text-[10px] tracking-[0.2em] shadow-[0_0_30px_rgba(220,197,98,0.3)]"
          style={{
            left: "58%",
            top: "45%",
          }}
        >
          DRAG
        </motion.div>
      </div>

      {/* Elemento Decorativo: Elipse Inferior Dourada */}
      <div className="absolute bottom-12 w-[700px] h-[50px] border border-[#dcc562]/20 rounded-[100%] blur-md" />
      <div className="absolute bottom-12 w-[500px] h-[30px] border border-[#dcc562]/10 rounded-[100%] blur-sm" />
    </section>
  );
}
