import dynamic from "next/dynamic";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ExperienceSection } from "./experience-section";
import { EducationSection } from "./education-section";

const ImpactSection = dynamic(
  () => import("./impact-section").then((m) => m.ImpactSection),
  { ssr: true },
);

const CaseStudiesSection = dynamic(
  () => import("./case-studies-section").then((m) => m.CaseStudiesSection),
  { ssr: true },
);

const SkillsSection = dynamic(
  () => import("./skills-section").then((m) => m.SkillsSection),
  { ssr: true },
);

const ContactSection = dynamic(
  () => import("./contact-section").then((m) => m.ContactSection),
  { ssr: true },
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

      <SectionErrorBoundary>
        <ContactSection />
      </SectionErrorBoundary>
    </>
  );
}
