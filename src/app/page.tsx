import HeroSequence from "@/components/HeroSequence";

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSequence />
      

      <section className="h-screen flex items-center justify-center bg-white">
        <h2 className="text-black text-4xl font-bold">Inversores Acreditados</h2>
      </section>
    </main>
  );
}