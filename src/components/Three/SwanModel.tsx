"use client";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

function Model({ rotationY }: { rotationY?: MotionValue<number> }) {
  const { scene } = useGLTF("/Models/swan_compressed_webp.glb");
  const modelRef = useRef<THREE.Group>(null);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
      if (rotationY) {
        modelRef.current.rotation.y += rotationY.get() * 0.005;
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={copiedScene}
      scale={2.2}
      position={[0, -1, 0]}
    />
  );
}

export default function SwanModelViewer({
  rotationY,
}: {
  rotationY?: MotionValue<number>;
}) {
  return (
    <div className="h-full w-full" style={{ touchAction: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 45, position: [0, 0, 8] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <Model rotationY={rotationY} />
          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
