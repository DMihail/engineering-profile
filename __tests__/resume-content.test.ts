import {
  getResumeContact,
  getResumeExperience,
  getResumeHeading,
  getResumeProjects,
  getResumeSkillGroups,
  getResumeVariantContent,
  parseResumeVariant,
  resolveResumeVariant,
  resumePath,
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

  it("resolves default variant from contact region", () => {
    expect(resolveResumeVariant(undefined, "intl")).toBe("ireland");
    expect(resolveResumeVariant(undefined, "ua")).toBe("ua");
  });

  it("prefers explicit query variant over region", () => {
    expect(resolveResumeVariant("ireland", "ua")).toBe("ireland");
    expect(resolveResumeVariant("ua", "intl")).toBe("ua");
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
});
