"use client";
import { useGLTF, Stage, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/Models/swan_compressed_webp.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
   
      const autoRotation = state.clock.elapsedTime * 0.4;

      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const scrollRotation = scrollY * 0.003; 

      modelRef.current.rotation.y = autoRotation + scrollRotation;
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={1.8}
      position={[0, -1.4, 0]} 
    />
  );
}

export default function SwanModelViewer() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ fov: 45, position: [0, 0, 10] }}
        // Evitamos que el motor oscurezca los brillos intensos del oro
        gl={{ 
          antialias: true, 
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        <Suspense fallback={null}>
          {/* 'Stage' crea una iluminación profesional automática de estudio */}
          <Stage intensity={1.5} environment="city" adjustCamera={false}>
            <Model />
          </Stage>
          
          {/* Refuerzo de luz para que la textura granulada brille siempre */}
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}