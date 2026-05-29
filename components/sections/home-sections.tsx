import dynamic from "next/dynamic";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "./impact-section";
import { CaseStudiesSection } from "./case-studies-section";
import { SkillsSection } from "./skills-section";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";
import { TestimonialsSection } from "./testimonials-section";
import { TESTIMONIALS } from "@/lib/data/testimonials";

const ContactSection = dynamic(() =>
  import("./contact-section").then((mod) => mod.ContactSection),
);

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
