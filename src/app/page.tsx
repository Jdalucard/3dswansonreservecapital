"use client";
import { useState, useEffect } from "react";
import HeroSequence from "@/components/HeroSequence";
import Section2Sequence from "@/components/Section2Sequence";
import Section3Sequence from "@/components/section3Sequence";

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Evitamos parpadeos mientras Next.js detecta el tamaño de la pantalla
  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return (
    <main className="relative w-full bg-black">
      {/* 1. HERO: Sin contenedores que limiten su altura */}
      <HeroSequence isMobile={isMobile} />
      {/* 2. CONTENIDO SIGUIENTE: 
          Le damos un z-index alto para que pase por encima del Hero si es necesario 
      */}

      <div className="relative z-20 bg-black">
        <Section2Sequence isMobile={isMobile} />
        <Section3Sequence isMobile={isMobile} />
        <div className="h-[30vh]" />
      </div>
    </main>
  );
}
