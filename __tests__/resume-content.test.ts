import {
  getResumeContact,
  getResumeExperience,
  getResumeHeading,
  getResumeProjects,
  getResumeSkillGroups,
  getResumeVariantContent,
  parseResumeVariant,
  resumePath,
  resumePeriodDateTime,
} from "@/lib/resume-content";
import { PHONE_INTL, PHONE_UA } from "@/lib/contact-region";
import { SITE_EMAIL } from "@/lib/config";

describe("resume-content", () => {
  it("defaults unknown variants to ireland", () => {
    expect(parseResumeVariant(undefined)).toBe("ireland");
    expect(parseResumeVariant("ireland")).toBe("ireland");
    expect(parseResumeVariant("invalid")).toBe("ireland");
  });

  it("parses ua variant and legacy uk alias", () => {
    expect(parseResumeVariant("ua")).toBe("ua");
    expect(parseResumeVariant("uk")).toBe("ua");
  });

  it("does not use geo/cookie — missing query is always Ireland", () => {
    // Canonical /resume must stay indexable and identical for all visitors.
    expect(parseResumeVariant(undefined)).toBe("ireland");
  });

  it("builds resume paths", () => {
    expect(resumePath("ireland")).toBe("/resume");
    expect(resumePath("ua")).toBe("/resume?variant=ua");
  });

  it("matches CV heading and skill groups", () => {
    expect(getResumeHeading().role).toBe("Mobile Engineer | React Native | Web Developer");
    const groups = getResumeSkillGroups();
    expect(groups[0]?.label).toBe("React Native");
    expect(groups.some((g) => g.label === "Collaboration & Leadership")).toBe(true);
  });

  it("includes experience, projects, and PDF-aligned Elementica projects", () => {
    const elementica = getResumeExperience().find((xp) => xp.company === "Elementica");
    expect(elementica?.projects?.map((p) => p.title)).toEqual([
      "Vitadrop (Healthcare Mobile Application)",
      "Vidalytics Admin Platform",
    ]);
    expect(getResumeProjects().length).toBe(3);
  });

  it("uses PDF email and region-specific phone numbers", () => {
    expect(getResumeContact("ireland").email).toBe(SITE_EMAIL);
    expect(getResumeContact("ireland").email).toBe("dzezelomihail@gmail.com");
    expect(getResumeContact("ireland").phone).toBe(PHONE_INTL.display);
    expect(getResumeContact("ua").phone).toBe(PHONE_UA.display);
  });

  it("includes Temporary Protection only in Ireland summary", () => {
    expect(getResumeVariantContent("ireland").summary).toContain("Temporary Protection");
    expect(getResumeVariantContent("ua").summary).not.toContain("Temporary Protection");
  });

  it("formats resume periods as ISO 8601 intervals", () => {
    expect(resumePeriodDateTime("03/2025 – 12/2025")).toBe("2025-03/2025-12");
    expect(resumePeriodDateTime("09/2015 – 06/2019")).toBe("2015-09/2019-06");
    expect(resumePeriodDateTime("03/2025 – Present")).toBe("2025-03/..");
  });
});
