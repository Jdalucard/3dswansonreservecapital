"use client";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

function ModelContent({ rotationY }: { rotationY?: MotionValue<number> }) {
  const { scene } = useGLTF("/Models/swan_compressed_webp.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    modelRef.current.rotation.y += delta * 0.2;

    if (rotationY) {
      try {
        modelRef.current.rotation.y += rotationY.get() * 0.005;
      } catch {}
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <primitive
        ref={modelRef}
        object={scene}
        scale={2.2}
        position={[0, -1, 0]}
      />
      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.4}
        scale={6}
        blur={1.5}
        far={2}
        resolution={256}
      />
      <Environment preset="city" />
    </>
  );
}

export default function SwanModelViewer({
  rotationY,
}: {
  rotationY?: MotionValue<number>;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id =
      typeof window !== "undefined"
        ? window.requestAnimationFrame(() => setMounted(true))
        : undefined;
    return () => {
      if (typeof window !== "undefined" && typeof id === "number") {
        window.cancelAnimationFrame(id);
      }
    };
  }, []);

  if (!mounted) {
    return <div className="h-full w-full bg-transparent" />;
  }

  return (
    <div
      className="h-full w-full"
      style={{ touchAction: "none", pointerEvents: "none" }}
    >
      <Canvas
        dpr={1}
        camera={{ fov: 45, position: [0, 0, 8] }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          precision: "lowp",
        }}
        eventSource={
          typeof document !== "undefined"
            ? (document.getElementById("__next") as HTMLElement)
            : undefined
        }
      >
        <Suspense fallback={null}>
          <ModelContent rotationY={rotationY} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/Models/swan_compressed_webp.glb");
