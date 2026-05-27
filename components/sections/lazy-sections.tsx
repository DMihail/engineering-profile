"use client";

import { LazySection } from "@/components/ui/lazy-section";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { ContactSection } from "./contact-section";

export function LazySections() {
  return (
    <>
      <LazySection id="impact" className="bg-secondary border-t border-[rgba(56,189,248,0.1)] py-24">
        <SectionErrorBoundary>
          <ImpactSection />
        </SectionErrorBoundary>
      </LazySection>

      <LazySection id="projects" className="bg-background py-22">
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

      <LazySection id="education" className="section-surface">
        <SectionErrorBoundary>
          <EducationSection />
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
