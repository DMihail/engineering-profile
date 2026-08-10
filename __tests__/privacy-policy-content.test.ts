import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_SECTIONS,
} from "@/lib/privacy-policy-content";
import { SITE_EMAIL } from "@/lib/config";

function policyText(): string {
  return PRIVACY_POLICY_SECTIONS.flatMap((section) => [
    ...section.paragraphs,
    ...(section.list?.map((item) => (typeof item === "string" ? item : `${item.term} ${item.detail}`)) ?? []),
  ]).join(" ");
}

describe("privacy policy content", () => {
  it("includes controller contact details and an updated date", () => {
    expect(PRIVACY_POLICY_INTRO.controller).toBeTruthy();
    expect(PRIVACY_POLICY_INTRO.contactEmail).toBe(SITE_EMAIL);
    expect(PRIVACY_POLICY_LAST_UPDATED).toMatch(/August 2026/i);
  });

  it("covers contact form, cookies, reCAPTCHA, and core processors", () => {
    const text = policyText();

    expect(text).toMatch(/contact form/i);
    expect(text).toMatch(/contact-region/i);
    expect(text).toMatch(/reCAPTCHA/i);
    expect(text).toMatch(/Firestore/i);
    expect(text).toMatch(/Vercel/i);
    expect(text).toMatch(/Cloud Messaging/i);
  });

  it("discloses Telegram Bot API and SMTP email replies", () => {
    const text = policyText();

    expect(text).toMatch(/Telegram Bot API/i);
    expect(text).toMatch(/SMTP/i);
    expect(text).toMatch(/name, email/i);
  });

  it("scopes contact-region cookie to the homepage, not resume variant", () => {
    const text = policyText();
    expect(text).toMatch(/homepage/i);
    expect(text).toMatch(/\?variant=ua/i);
  });

  it("treats the form checkbox as acknowledgement, not GDPR consent", () => {
    const legal = PRIVACY_POLICY_SECTIONS.find((section) => section.id === "legal-basis");
    const body = [
      ...(legal?.paragraphs ?? []),
      ...(legal?.list?.map((item) => (typeof item === "string" ? item : `${item.term} ${item.detail}`)) ?? []),
    ].join(" ");

    expect(body).toMatch(/acknowledgement/i);
    expect(body).not.toMatch(/desktop notifications/i);
    expect(body).toMatch(/Legitimate interests/i);
    expect(legal?.list?.some((item) => typeof item !== "string" && item.term === "Consent")).toBe(false);
  });

  it("includes GDPR rights and DPC reference", () => {
    const rights = PRIVACY_POLICY_SECTIONS.find((section) => section.id === "rights");
    const body = rights?.paragraphs.join(" ") ?? "";
    expect(body).toMatch(/access/i);
    expect(body).toMatch(/dataprotection\.ie/i);
  });

  it("offers an accessibility feedback channel", () => {
    const contact = PRIVACY_POLICY_SECTIONS.find((section) => section.id === "contact");
    const body = contact?.paragraphs.join(" ") ?? "";
    expect(body).toMatch(/accessibility/i);
  });
});
