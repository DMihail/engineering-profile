import {
  getResumeContact,
  getResumeSkillGroups,
  parseResumeVariant,
  resumePath,
} from "@/lib/resume-content";
import { SITE_EMAIL } from "@/lib/config";

describe("resume-content", () => {
  it("defaults unknown variants to ireland", () => {
    expect(parseResumeVariant(undefined)).toBe("ireland");
    expect(parseResumeVariant("ireland")).toBe("ireland");
    expect(parseResumeVariant("invalid")).toBe("ireland");
  });

  it("parses uk variant", () => {
    expect(parseResumeVariant("uk")).toBe("uk");
  });

  it("builds resume paths", () => {
    expect(resumePath("ireland")).toBe("/resume");
    expect(resumePath("uk")).toBe("/resume?variant=uk");
  });

  it("uses grouped skills from site data", () => {
    const groups = getResumeSkillGroups();
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0]?.skills).toMatch(/React Native|Expo|TypeScript/);
  });

  it("uses the site email in contact helpers", () => {
    expect(getResumeContact().email).toBe(SITE_EMAIL);
  });
});
