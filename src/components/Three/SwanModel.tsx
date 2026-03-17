"use client";
import { useGLTF, Stage } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

function Model({ rotationY }: { rotationY?: MotionValue<number> }) {
  const { scene } = useGLTF("/Models/swan_compressed_webp.glb");
  const modelRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;

      if (rotationY) {
        modelRef.current.rotation.y += rotationY.get() * 0.01;
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={2.5}
      position={[0, -1.2, 0]}
    />
  );
}

export default function SwanModelViewer({
  rotationY,
}: {
  rotationY?: MotionValue<number>;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45, position: [0, 0, 10] }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Stage intensity={1.5} environment="city" adjustCamera={false}>
          <Model rotationY={rotationY} />
        </Stage>
        <ambientLight intensity={1} />
      </Suspense>
    </Canvas>
  );
}
