import {
  hasPrivacyConsentInBody,
  isPrivacyConsentGiven,
  PRIVACY_CONSENT_VALUE,
} from "@/lib/privacy-consent";

describe("privacy consent helpers", () => {
  it("accepts checked form value", () => {
    expect(isPrivacyConsentGiven(PRIVACY_CONSENT_VALUE)).toBe(true);
    expect(isPrivacyConsentGiven(null)).toBe(false);
  });

  it("accepts boolean or string in API body", () => {
    expect(hasPrivacyConsentInBody({ privacyConsent: true })).toBe(true);
    expect(hasPrivacyConsentInBody({ privacyConsent: PRIVACY_CONSENT_VALUE })).toBe(true);
    expect(hasPrivacyConsentInBody({ privacyConsent: false })).toBe(false);
    expect(hasPrivacyConsentInBody({})).toBe(false);
  });
});
