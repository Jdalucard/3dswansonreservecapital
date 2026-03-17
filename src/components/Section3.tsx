"use client";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  img: string;
  figmaRotation?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: 3,
    name: "Joshua Donjuan",
    role: "Partner financial consultant",
    img: "/member3.png",
    figmaRotation: -360,
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
    img: "/member2.png",
    figmaRotation: -360,
  },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const isCenter = index === 1;
  const isLeft = index === 0;
  const cardWidth = 502;
  const cardHeight = 721;
  const borderRadius = "43px";
  const step = 340;
  const currentX = (index - 1) * step;

  const imageStyle = member.figmaRotation
    ? { transform: `rotateY(${member.figmaRotation}deg)` }
    : {};

  return (
    <div
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        borderRadius: borderRadius,
        position: "absolute",
        zIndex: isCenter ? 10 : 1,
        transform: `translateX(${currentX}px)`,
      }}
      className="overflow-hidden bg-black flex flex-col transition-all duration-500 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
    >
      <div className="relative flex-1 w-full overflow-hidden origin-center">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className={`object-cover ${isLeft ? "object-[20%_top]" : "object-top"}`}
          priority
          style={imageStyle}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* --- CORRECCIÓN PANEL KRAIG: MÁS OPACO (`bg-zinc-900/95`) --- */}
        {isCenter && (
          <div className="absolute bottom-0 w-full h-[180px] flex flex-col items-center justify-center bg-zinc-900/95 backdrop-blur-3xl border-t border-white/10 z-20 px-10">
            <h3 className="text-white text-4xl font-bold tracking-tighter mb-1 text-center leading-none">
              {member.name}
            </h3>
            <p className="text-[#dcc562] text-[11px] uppercase tracking-[0.4em] font-black text-center">
              {member.role}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Section3() {
  return (
    <section className="relative w-full min-h-[115vh] bg-black flex flex-col items-center justify-center overflow-visible border-none py-20">
      {/* ILUMINACIÓN AMBIENTAL (PARA EVITAR CORTE) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-10%] w-[130%] h-[50%] bg-[#dcc562]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-5%] w-full h-[500px] bg-gradient-to-b from-[#dcc562]/15 to-transparent blur-[120px]" />
      </div>

      <div className="absolute top-24 z-20 text-center pointer-events-none px-4">
        <h2 className="text-white text-7xl md:text-8xl font-light tracking-tighter leading-none">
          We are <span className="font-bold text-[#dcc562]">Swanson</span>
        </h2>
      </div>

      <div className="relative w-full min-h-[800px] flex items-center justify-center z-10">
        {teamMembers.map((member, index) => (
          <TeamCard key={member.id} member={member} index={index} />
        ))}

        {/* CÍRCULO DRAG MANTENIDO */}
        <div
          style={{ width: "125px", height: "125px" }}
          className="absolute left-[calc(50%+165px)] top-[50%] -translate-y-1/2 z-30 pointer-events-none rounded-full flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[#dcc562]/40 blur-[25px] rounded-full" />
          <Image
            src="/Drag.png"
            alt="Drag icon"
            fill
            className="object-contain relative z-10"
          />
        </div>

        {/* --- PEDESTAL ANILLO DORADO: INTENSIFICADO --- */}
        <div className="absolute bottom-[-4%] w-[1000px] h-[120px] pointer-events-none flex items-center justify-center z-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 120"
            className="absolute top-0 overflow-visible"
            style={{ transform: "rotateX(78deg)" }}
          >
            <defs>
              <linearGradient
                id="gold-metallic-final"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#b48d53" />{" "}
                {/* Tono base metálico */}
                <stop offset="50%" stopColor="#f7dc6f" />{" "}
                {/* Tono metálico central vibrante */}
                <stop offset="100%" stopColor="#b48d53" />{" "}
                {/* Tono base metálico */}
              </linearGradient>
              <filter
                id="gold-neon-final"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              cx="500"
              cy="60"
              rx="480"
              ry="50"
              fill="none"
              stroke="url(#gold-metallic-final)"
              strokeWidth="2.2" // Más grueso y vibrante
              strokeOpacity="0.9" // Mayor opacidad
              filter="url(#gold-neon-final)"
            />
          </svg>

          {/* Brillo de suelo central más potente */}
          <div className="absolute w-[800px] h-[60px] bg-[#dcc562]/30 blur-[60px] rounded-full translate-y-4" />
        </div>
      </div>
    </section>
  );
}
