"use client";
import { useState, useEffect } from "react";
import HeroSequence from "@/components/Hero/HeroSequence";
import Section2Sequence from "@/components/Section2/Section2Sequence";
import Section3Sequence from "@/components/Section3/section3Sequence";

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return (
    <main className="relative w-full bg-black">
      <HeroSequence isMobile={isMobile} />

      <div className="relative z-20 bg-black">
        <Section2Sequence isMobile={isMobile} />
        <Section3Sequence isMobile={isMobile} />
        <div className="h-[30vh]" />
      </div>
    </main>
  );
}
