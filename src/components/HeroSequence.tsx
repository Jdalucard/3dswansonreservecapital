"use client";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function HeroSequence({ isMobile }: { isMobile: boolean }) {
  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
