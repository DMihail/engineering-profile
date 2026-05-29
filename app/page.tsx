import { NavBar } from "@/components/layout/nav-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeSections } from "@/components/sections/home-sections";
import { Footer } from "@/components/layout/footer";
import { MAIN_CONTENT_ID, sectionHref } from "@/lib/section-ids";

export default function Home() {
  return (
    <>
      <a href={sectionHref(MAIN_CONTENT_ID)} className="skip-link">
        Skip to content
      </a>
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="min-h-screen bg-background font-sans overflow-x-clip">
      <NavBar />
      <HeroSection />
      <HomeSections />
      <Footer />
    </main>
    </>
  );
}
