import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_SECTIONS,
} from "@/lib/privacy-policy-content";
import { SITE_EMAIL } from "@/lib/config";

describe("privacy policy content", () => {
  it("includes controller contact details", () => {
    expect(PRIVACY_POLICY_INTRO.controller).toBeTruthy();
    expect(PRIVACY_POLICY_INTRO.contactEmail).toBe(SITE_EMAIL);
  });

  it("covers contact form, cookies, and reCAPTCHA", () => {
    const text = PRIVACY_POLICY_SECTIONS.flatMap((section) => [
      ...section.paragraphs,
      ...(section.list?.map((item) => (typeof item === "string" ? item : `${item.term} ${item.detail}`)) ?? []),
    ]).join(" ");

    expect(text).toMatch(/contact form/i);
    expect(text).toMatch(/contact-region/i);
    expect(text).toMatch(/reCAPTCHA/i);
    expect(text).toMatch(/Firestore/i);
    expect(text).toMatch(/Vercel/i);
  });

  it("includes GDPR rights and DPC reference", () => {
    const rights = PRIVACY_POLICY_SECTIONS.find((section) => section.id === "rights");
    const body = rights?.paragraphs.join(" ") ?? "";
    expect(body).toMatch(/access/i);
    expect(body).toMatch(/dataprotection\.ie/i);
  });
});
