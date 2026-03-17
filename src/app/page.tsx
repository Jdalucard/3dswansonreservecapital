import HeroSequence from "@/components/HeroSequence";
import Section2 from "@/components/Section2";
import SwanModelViewer from "@/components/Three/SwanModel";

export default function Page() {
  return (
    <main className="bg-black relative">
      <SwanModelViewer />

      <div className="relative z-10 w-full">
        {/* SECCIÓN 1 */}
        <section className="w-full min-h-screen flex items-center justify-center">
          <HeroSequence />
        </section>

        {/* SECCIÓN 2 */}
        <Section2 />
        
        <div className="h-[30vh]" /> 
      </div>
    </main>
  );
}