"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Section2() {
  // Configuración de la animación que se dispara con el scroll
  const sideAnimation = {
    initial: { 
      opacity: 0, 
      scaleX: 0.1, 
      scale: 0.8, 
      filter: "blur(8px)" 
    },
    whileInView: { 
      opacity: 1, 
      scaleX: 1, 
      scale: 1, 
      filter: "blur(0px)" 
    },
    // margin: "-100px" asegura que no aparezcan todas de golpe, sino una por una al bajar
    viewport: { once: true, amount: 0.3, margin: "-50px" },
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] as const
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-transparent py-32 overflow-hidden gap-40">
      
      {/* --- PRIMERA FILA: Introducción y Punto 1 --- */}
      <div className="relative z-20 grid grid-cols-[1fr,0.6fr,1fr] gap-12 w-full max-w-[1600px] px-12 items-center">
        
        {/* IZQUIERDA: Introducción */}
        <motion.div 
          {...sideAnimation} 
          transition={{ ...sideAnimation.transition, delay: 0.1 }}
          className="flex flex-col gap-8 items-end origin-right"
        >
          <div className="relative w-[500px] h-[320px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/office.png" alt="Office" fill className="object-cover" priority />
          </div>
          <div className="max-w-[450px] text-right">
            <p className="text-white font-montserrat text-[20px] leading-[1.3] opacity-90">
              Swanson Reserve Capital is private investment fund with dual Share Classes, Structured Notes & Long Equity Quantitative investing.
            </p>
          </div>
        </motion.div>

        <div className="h-full pointer-events-none" /> {/* Espacio central libre */}

        {/* DERECHA: Punto 1 */}
        <motion.div 
          {...sideAnimation} 
          transition={{ ...sideAnimation.transition, delay: 0.3 }}
          className="flex flex-col gap-8 items-start origin-left"
        >
          <div className="max-w-[450px] text-left">
            <p className="text-white font-montserrat text-[20px] leading-snug opacity-90 tracking-tight">
              <span className="text-[#dcc562] font-bold mr-2 text-[22px]">1.</span>
              Create Quarterly Income: Pay ongoing expenses, kids tuition, mortgages, car payments, private jet, or fund charitable contributions.
            </p>
          </div>
          <div className="relative w-[500px] h-[320px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/family.png" alt="Partners" fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>

      {/* --- SEGUNDA FILA: Punto 2 y Punto 3 --- */}
      <div className="relative z-20 grid grid-cols-[1fr,0.6fr,1fr] gap-12 w-full max-w-[1600px] px-12 items-center">
        
        {/* IZQUIERDA: Punto 2 */}
        <motion.div 
          {...sideAnimation} 
          transition={{ ...sideAnimation.transition, delay: 0.1 }}
          className="flex flex-col gap-8 items-end origin-right"
        >
          <div className="max-w-[450px] text-right">
            <p className="text-white font-montserrat text-[20px] leading-[1.3] opacity-90 tracking-tight">
              <span className="text-[#dcc562] font-bold mr-2 text-[22px]">2.</span>
              Achieve Long Term Growth: While still receiving quarterly distributions, our Growth Notes and Equity Allocations are designed to accumulate long term wealth.
            </p>
          </div>
          <div className="relative w-[500px] h-[320px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/family.png" alt="Growth" fill className="object-cover" />
          </div>
        </motion.div>

        <div className="h-full pointer-events-none" /> {/* Espacio central libre */}

        {/* DERECHA: Punto 3 */}
        <motion.div 
          {...sideAnimation} 
          transition={{ ...sideAnimation.transition, delay: 0.3 }}
          className="flex flex-col gap-8 items-start origin-left"
        >
          <div className="relative w-[500px] h-[320px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
            <Image src="/office.png" alt="Preservation" fill className="object-cover" />
          </div>
          <div className="max-w-[450px] text-left">
            <p className="text-white font-montserrat text-[20px] leading-snug opacity-90 tracking-tight">
              <span className="text-[#dcc562] font-bold mr-2 text-[22px]">3.</span>
              Capital Preservation: Both investment Share Classes are designed to shield our investors from large market downturns.
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}