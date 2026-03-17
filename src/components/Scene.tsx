"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        x: 2,
        y: -1,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      gsap.to(meshRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "center center",
          scrub: true,
        },
      });
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={1.5}>
      <MeshDistortMaterial color="#3b82f6" speed={3} distort={0.4} />
    </Sphere>
  );
}

import React from "react";

export default function Scene(): React.ReactElement {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}
