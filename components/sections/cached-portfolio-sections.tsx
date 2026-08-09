import { cacheLife, cacheTag } from "next/cache";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "@/components/sections/impact-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";

/**
 * Static portfolio body — Cache Components (`use cache`) so the RSC payload
 * is reusable across requests. Contact stays outside (client region / form).
 */
export async function CachedPortfolioSections() {
  "use cache";
  cacheLife("max");
  cacheTag("portfolio");

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
    </>
  );
}
