import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { ContactSection } from "./contact-section";

export function HomeSections() {
  return (
    <>
      <SectionErrorBoundary>
        <ImpactSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <CaseStudiesSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <SkillsSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <ExperienceSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <EducationSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <ContactSection />
      </SectionErrorBoundary>
    </>
  );
}
