"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ show }: { show: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-16 transition-all duration-1000 ease-in-out ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-[60px] h-[50px]">
          <Image
            src="/logoName.png"
            alt="Swanson Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-white text-[41px] font-philosopher leading-none tracking-tight antialiased">
          Swanson
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-10 px-10 py-3 rounded-l-md bg-gradient-to-r from-black/50 to-black/20 backdrop-blur-md border-l border-white/5">
          {["About Us", "Our Story", "Team", "Governance"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-medium hover:text-white transition-colors font-montserrat antialiased"
            >
              {item}
            </Link>
          ))}

          <button className="bg-[#dcc562] text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-black hover:brightness-110 transition-all duration-300 rounded-sm shadow-lg">
            + Schedule
          </button>
        </div>

        <button className="flex flex-col gap-2 group cursor-pointer pl-4">
          <div className="w-10 h-[1.5px] bg-[#dcc562] transition-transform duration-300 group-hover:scale-x-110 origin-right" />
          <div className="w-10 h-[1.5px] bg-[#dcc562] transition-transform duration-300 group-hover:scale-x-110 origin-right" />
        </button>
      </div>
    </nav>
  );
}
