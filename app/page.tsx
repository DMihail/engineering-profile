import type { Metadata } from "next";
import { NavBar } from "@/components/layout/nav-bar";
import { SectionHashScroll } from "@/components/layout/section-hash-scroll";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeSections } from "@/components/sections/home-sections";
import { Footer } from "@/components/layout/footer";
import { WebPageJsonLdScript, buildWebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { SITE_DESCRIPTION } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import { MAIN_CONTENT_ID, sectionHref } from "@/lib/section-ids";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

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
      <a href={sectionHref(MAIN_CONTENT_ID)} className="skip-link">
        {UI_LABELS.skipToContent}
      </a>
      <NavBar />
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
