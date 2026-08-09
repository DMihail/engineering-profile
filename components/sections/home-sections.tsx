import { CachedPortfolioSections } from "@/components/sections/cached-portfolio-sections";
import { ContactSection } from "@/components/sections/contact-section";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";

export function HomeSections() {
  return (
    <>
      <CachedPortfolioSections />

      <SectionErrorBoundary>
        <ContactSection />
      </SectionErrorBoundary>
    </>
  );
}
