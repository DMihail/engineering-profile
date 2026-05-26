"use client";

// import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { ContactSection } from "./contact-section";

// const ImpactSection = dynamic(
//   () => import("./impact-section").then((m) => ({ default: m.ImpactSection })),
//   { ssr: false },
// );
// const CaseStudiesSection = dynamic(
//   () => import("./case-studies-section").then((m) => ({ default: m.CaseStudiesSection })),
//   { ssr: false },
// );
// const SkillsSection = dynamic(
//   () => import("./skills-section").then((m) => ({ default: m.SkillsSection })),
//   { ssr: false },
// );
// const ExperienceSection = dynamic(
//   () => import("./experience-section").then((m) => ({ default: m.ExperienceSection })),
//   { ssr: false },
// );
// const ContactSection = dynamic(
//   () => import("./contact-section").then((m) => ({ default: m.ContactSection })),
//   { ssr: false },
// );

export function LazySections() {
  return (
    <>
      <LazySection id="impact" className="bg-secondary border-t border-[rgba(56,189,248,0.1)] py-24">
        <SectionErrorBoundary>
          <ImpactSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection id="projects" className="bg-background py-[88px]">
        <SectionErrorBoundary>
          <CaseStudiesSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection id="skills" className="section-surface">
        <SectionErrorBoundary>
          <SkillsSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection id="experience" className="section-dark">
        <SectionErrorBoundary>
          <ExperienceSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection id="contact" className="section-surface">
        <SectionErrorBoundary>
          <ContactSection />
        </SectionErrorBoundary>
      </LazySection>
    </>
  );
}
