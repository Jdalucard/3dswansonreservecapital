"use client";
import Section3Mobile from "./Section3Mobile";
import Section3Desktop from "./Section3Desktop";

export default function Section3Sequence({ isMobile }: { isMobile: boolean }) {
  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return isMobile ? <Section3Mobile /> : <Section3Desktop />;
}
