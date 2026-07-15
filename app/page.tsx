import type { Metadata } from "next";
import { NavBar } from "@/components/layout/nav-bar";
import { NavBarNoScript } from "@/components/layout/nav-bar-noscript";
import { SectionHashScroll } from "@/components/layout/section-hash-scroll";
import { SkipLink } from "@/components/layout/skip-link";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeSections } from "@/components/sections/home-sections";
import { Footer } from "@/components/layout/footer";
import { WebPageJsonLdScript, buildWebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SITE_DESCRIPTION } from "@/lib/config";
import { DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import { buildRouteMetadata } from "@/lib/page-metadata";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";

export const metadata: Metadata = buildRouteMetadata({
  title: DEFAULT_SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

const homeWebPageJsonLd = buildWebPageJsonLd({
  path: "/",
  name: DEFAULT_SITE_TITLE,
  description: SITE_DESCRIPTION,
  aboutPerson: true,
});

export default function Home() {
  return (
    <>
      <WebPageJsonLdScript data={homeWebPageJsonLd} />
      <SkipLink home />
      <NavBar />
      <NavBarNoScript />
      <SectionHashScroll />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="min-h-screen bg-background font-sans overflow-x-clip"
      >
        <HeroSection />
        <HomeSections />
      </main>
      <Footer />
    </>
  );
}
