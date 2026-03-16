"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ show }: { show: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-16 transition-all duration-1000 ease-in-out ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
    >
      {/* 1. Izquierda: Logo y Palabra (Agrupados) */}
      <div className="flex items-center gap-4">
        <div className="relative w-[65px] h-[55px]">
          <Image
            src="/logoName.png"
            alt="Swanson Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-white text-[50px] font-philosopher leading-none  tracking-normal">
          Swanson
        </span>
      </div>

      {/* 2. Centro: Menú de navegación */}
      <div className="hidden lg:flex items-center gap-10">
        {["About Us", "Our Story", "Team", "Governance"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium hover:text-white transition-colors font-montserrat"
          >
            {item}
          </Link>
        ))}
        <button className="bg-[#B89650] text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-black hover:bg-[#d4af37] transition-all duration-300 rounded-sm">
          + Schedule
        </button>
              <div className="flex items-center gap-8">
        <button className="flex flex-col gap-2 group cursor-pointer">
          <div className="w-8 h-[1.5px] bg-white group-hover:bg-[#B89650] transition-colors" />
          <div className="w-8 h-[1.5px] bg-white group-hover:bg-[#B89650] transition-colors" />
        </button>
      </div>
      </div>


    </nav>
  );
}
