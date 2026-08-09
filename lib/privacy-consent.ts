export const PRIVACY_CONSENT_FIELD = "privacyConsent";
export const PRIVACY_CONSENT_VALUE = "yes";

export const PRIVACY_CONSENT_ERROR = "Please confirm you have read the privacy policy to continue";

export function isPrivacyConsentGiven(value: FormDataEntryValue | null | undefined): boolean {
  return value === PRIVACY_CONSENT_VALUE;
}

export function hasPrivacyConsentInBody(body: Record<string, unknown>): boolean {
  const value = body[PRIVACY_CONSENT_FIELD];
  return value === true || value === PRIVACY_CONSENT_VALUE;
}
