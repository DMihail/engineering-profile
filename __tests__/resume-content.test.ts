import {
  getResumeContact,
  getResumeSkillGroups,
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

  it("uses grouped skills from site data", () => {
    const groups = getResumeSkillGroups();
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0]?.skills).toMatch(/React Native|Expo|TypeScript/);
  });

  it("uses region-specific phone numbers in contact helpers", () => {
    expect(getResumeContact("ireland").email).toBe(SITE_EMAIL);
    expect(getResumeContact("ireland").phone).toBe(PHONE_INTL.display);
    expect(getResumeContact("ireland").phoneTel).toBe(PHONE_INTL.e164);
    expect(getResumeContact("ua").phone).toBe(PHONE_UA.display);
    expect(getResumeContact("ua").phoneTel).toBe(PHONE_UA.e164);
  });
});
