import { cacheLife, cacheTag } from "next/cache";
import { SectionErrorBoundary } from "@/components/ui/section-error-boundary";
import { ImpactSection } from "@/components/sections/impact-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { CACHE_TAGS } from "@/lib/cache-tags";

/**
 * Static portfolio body — Cache Components (`use cache`) so the RSC payload
 * is reusable across requests. Contact stays outside (client region / form).
 *
 * `weeks` keeps a deploy-friendly TTL; on-demand refresh via
 * `POST /api/revalidate` with tag `portfolio`.
 */
export async function CachedPortfolioSections() {
  "use cache";
  cacheLife("weeks");
  cacheTag(CACHE_TAGS.portfolio);

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
