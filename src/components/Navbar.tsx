"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ show }: { show: boolean }) {
  return (
    <nav
      className={`fixed top-0 left-0 z-150 flex w-full items-center justify-between px-6 py-8 transition-all duration-1000 ease-in-out md:px-16 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-12">
          <Image
            src="/logoName.png"
            alt="Swanson Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-philosopher text-[32px] leading-none tracking-tight text-white antialiased">
          Swanson
        </span>
      </div>

      <div className="hidden items-center gap-8 lg:flex">
        <div className="flex items-center gap-20 rounded-lg border border-white/10 bg-black/20 px-10 py-3 backdrop-blur-2xl">
          {["About Us", "Our Story", "Team", "Governance"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="font-sans text-[12px] font-bold tracking-[0.25em] text-white/70 uppercase antialiased transition-colors hover:text-[#dcc562]"
            >
              {item}
            </Link>
          ))}

          <button className="flex items-center gap-2 rounded-sm bg-[#dcc562] px-6 py-2.5 text-[11px] font-black tracking-widest text-black uppercase transition-all duration-300 hover:scale-105 hover:brightness-110">
            <span className="text-sm">+</span> Schedule
          </button>
        </div>

        <button className="group flex cursor-pointer flex-col gap-1.75 pl-4">
          <div className="h-[2.5px] w-12 bg-[#dcc562] transition-transform duration-300 group-hover:translate-x-1" />
          <div className="h-[2.5px] w-12 bg-[#dcc562] transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
      </div>

      <div className="lg:hidden">
        <button className="flex flex-col gap-1.75">
          <div className="h-[2.8px] w-10 bg-[#dcc562]" />
          <div className="h-[2.8px] w-10 bg-[#dcc562]" />
        </button>
      </div>
    </nav>
  );
}
