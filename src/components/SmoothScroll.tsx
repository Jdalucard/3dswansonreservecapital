"use client";
import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    const handleRefresh = () => {
      if (lenis) {
        lenis.resize();
      }
    };

    window.addEventListener("refresh-scroll", handleRefresh);
    return () => window.removeEventListener("refresh-scroll", handleRefresh);
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
