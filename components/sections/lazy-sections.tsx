"use client";

import dynamic from "next/dynamic";
import { LazySection } from "@/components/ui/lazy-section";

const ImpactSection = dynamic(
  () => import("./impact-section").then((m) => ({ default: m.ImpactSection })),
  { ssr: false },
);
const CaseStudiesSection = dynamic(
  () => import("./case-studies-section").then((m) => ({ default: m.CaseStudiesSection })),
  { ssr: false },
);
const SkillsSection = dynamic(
  () => import("./skills-section").then((m) => ({ default: m.SkillsSection })),
  { ssr: false },
);
const ExperienceSection = dynamic(
  () => import("./experience-section").then((m) => ({ default: m.ExperienceSection })),
  { ssr: false },
);
const ContactSection = dynamic(
  () => import("./contact-section").then((m) => ({ default: m.ContactSection })),
  { ssr: false },
);

export function LazySections() {
  return (
    <>
      <LazySection id="impact" className="bg-secondary border-t border-[rgba(56,189,248,0.1)] py-24">
        <ImpactSection />
      </LazySection>

      <LazySection id="projects" className="bg-background py-[88px]">
        <CaseStudiesSection />
      </LazySection>

      <LazySection id="skills" className="section-surface">
        <SkillsSection />
      </LazySection>

      <LazySection id="experience" className="section-dark">
        <ExperienceSection />
      </LazySection>

      <LazySection id="contact" className="section-surface">
        <ContactSection />
      </LazySection>
    </>
  );
}
