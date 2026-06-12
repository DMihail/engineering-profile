import { buildKnowsAbout, projectUrl } from "@/lib/content/seo";
import { projectHref } from "@/lib/section-ids";
import { CASE_STUDIES } from "@/lib/content/portfolio/case-studies";
import { CAREER_EXPERIENCE } from "@/lib/content/career/data";
import { toResumeExperience, toXpEntries } from "@/lib/content/career/adapters";
import { RESUME_EXPERIENCE } from "@/lib/content/resume";
import { XP_ENTRIES } from "@/lib/content/portfolio/experience";

describe("content seo helpers", () => {
  it("builds homepage hash urls for projects", () => {
    expect(projectUrl("vitadrop")).toBe("https://dzhezhelo.dev/#project-vitadrop");
    expect(projectHref("vitadrop")).toBe("/#project-vitadrop");
  });

  it("lists all case studies with fragment urls", () => {
    for (const study of CASE_STUDIES) {
      expect(projectUrl(study.id)).toBe(`https://dzhezhelo.dev/#project-${study.id}`);
    }
  });

  it("derives knowsAbout from primary skills", () => {
    const topics = buildKnowsAbout();
    expect(topics).toContain("React Native");
    expect(topics).toContain("GraphQL");
    expect(topics.length).toBeGreaterThan(8);
  });
});

describe("unified career data", () => {
  it("derives matching resume and portfolio experience from one source", () => {
    expect(toResumeExperience(CAREER_EXPERIENCE)).toEqual(RESUME_EXPERIENCE);
    expect(toXpEntries(CAREER_EXPERIENCE)).toEqual(XP_ENTRIES);
  });

  it("keeps Elementica project titles aligned", () => {
    const elementica = CAREER_EXPERIENCE.find((entry) => entry.company === "Elementica");
    expect(elementica?.projects?.map((project) => project.title)).toEqual([
      "Vitadrop (Healthcare Mobile Application)",
      "Vidalytics Admin Platform",
    ]);
  });
});
