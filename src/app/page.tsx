import HeroSequence from "@/components/HeroSequence";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";

export default function Page() {
  return (
    <main className="bg-black relative">
      <div className="relative z-10 w-full">
        <section className="w-full min-h-screen flex items-center justify-center">
          <HeroSequence />
        </section>

        <Section2 />

        <Section3 />

        <div className="h-[30vh]" />
      </div>
    </main>
  );
}
