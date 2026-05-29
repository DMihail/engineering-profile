import { NavBar } from "@/components/layout/nav-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeSections } from "@/components/sections/home-sections";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background font-sans overflow-x-clip">
      <NavBar />
      <HeroSection />
      <HomeSections />
      <Footer />
    </main>
  );
}
