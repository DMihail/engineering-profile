import { buildKnowsAbout, projectFragmentId, projectUrl } from "@/lib/content/seo";
import { isHomeScrollTargetId, isProjectFragmentId, projectHref } from "@/lib/section-ids";
import { CASE_STUDIES } from "@/lib/content/portfolio/case-studies";

describe("content seo helpers", () => {
  it("builds stable project fragment ids and urls", () => {
    expect(projectFragmentId("vitadrop")).toBe("project-vitadrop");
    expect(projectUrl("vitadrop")).toBe("https://dzhezhelo.dev/#project-vitadrop");
    expect(projectHref("vitadrop")).toBe("/#project-vitadrop");
  });

  it("recognises homepage scroll targets including project panels", () => {
    expect(isProjectFragmentId("project-vitadrop")).toBe(true);
    expect(isHomeScrollTargetId("projects")).toBe(true);
    expect(isHomeScrollTargetId("project-vitadrop")).toBe(true);
    expect(isHomeScrollTargetId("unknown")).toBe(false);
  });

  it("derives knowsAbout from primary skills", () => {
    const topics = buildKnowsAbout();
    expect(topics).toContain("React Native");
    expect(topics).toContain("GraphQL");
    expect(topics.length).toBeGreaterThan(8);
  });

  it("aligns json-ld project urls with case study ids", () => {
    for (const study of CASE_STUDIES) {
      expect(projectUrl(study.id)).toBe(`https://dzhezhelo.dev/#project-${study.id}`);
    }
  });
});
