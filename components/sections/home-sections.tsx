import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { TestimonialsSection } from "./testimonials-section";
import { ContactSection } from "./contact-section";
import { TESTIMONIALS } from "@/lib/data/testimonials";

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

      {TESTIMONIALS.length > 0 && (
        <SectionErrorBoundary>
          <TestimonialsSection />
        </SectionErrorBoundary>
      )}

      <SectionErrorBoundary>
        <ContactSection />
      </SectionErrorBoundary>
    </>
  );
}
