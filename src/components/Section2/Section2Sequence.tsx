"use client";
import Section2Mobile from "./Section2Mobile";
import Section2Desktop from "./Section2Desktop";

export default function Section2Sequence({ isMobile }: { isMobile: boolean }) {
  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return isMobile ? <Section2Mobile /> : <Section2Desktop />;
}
