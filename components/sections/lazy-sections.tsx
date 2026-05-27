"use client";

import { LazySection } from "@/components/ui/lazy-section";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { ContactSection } from "./contact-section";

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
