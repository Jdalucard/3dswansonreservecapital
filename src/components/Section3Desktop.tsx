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
      className="flex flex-col overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] transition-all duration-500"
    >
      <div className="relative w-full flex-1 origin-center overflow-hidden">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className={`object-cover ${isLeft ? "object-[20%_top]" : "object-top"}`}
          priority
          style={imageStyle}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {isCenter && (
          <div className="absolute bottom-0 z-20 flex h-[180px] w-full flex-col items-center justify-center border-t border-white/10 bg-zinc-900/95 px-10 backdrop-blur-3xl">
            <h3 className="mb-1 text-center text-4xl leading-none font-bold tracking-tighter text-white">
              {member.name}
            </h3>
            <p className="text-center text-[11px] font-black tracking-[0.4em] text-[#dcc562] uppercase">
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
    <section className="relative flex min-h-[115vh] w-full flex-col items-center justify-center overflow-visible border-none bg-black py-20">
      {/* ILUMINACIÓN AMBIENTAL (PARA EVITAR CORTE) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute top-[-10%] h-[50%] w-[130%] rounded-full bg-[#dcc562]/10 blur-[160px]" />
        <div className="absolute bottom-[-5%] h-[500px] w-full bg-gradient-to-b from-[#dcc562]/15 to-transparent blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute top-24 z-20 px-4 text-center">
        <h2 className="text-7xl leading-none font-light tracking-tighter text-white md:text-8xl">
          We are <span className="font-bold text-[#dcc562]">Swanson</span>
        </h2>
      </div>

      <div className="relative z-10 flex min-h-[800px] w-full items-center justify-center">
        {teamMembers.map((member, index) => (
          <TeamCard key={member.id} member={member} index={index} />
        ))}

        {/* CÍRCULO DRAG MANTENIDO */}
        <div
          style={{ width: "125px", height: "125px" }}
          className="pointer-events-none absolute top-[50%] left-[calc(50%+165px)] z-30 flex -translate-y-1/2 items-center justify-center rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-[#dcc562]/40 blur-[25px]" />
          <Image
            src="/Drag.png"
            alt="Drag icon"
            fill
            className="relative z-10 object-contain"
          />
        </div>

        {/* --- PEDESTAL ANILLO DORADO: INTENSIFICADO --- */}
        <div className="pointer-events-none absolute bottom-[-4%] z-0 flex h-[120px] w-[1000px] items-center justify-center">
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
          <div className="absolute h-[60px] w-[800px] translate-y-4 rounded-full bg-[#dcc562]/30 blur-[60px]" />
        </div>
      </div>
    </section>
  );
}
