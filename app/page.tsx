import { NavBar } from "@/components/layout/nav-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { LazySections } from "@/components/sections/lazy-sections";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <LazySections />
      <Footer />
    </main>
  );
}
