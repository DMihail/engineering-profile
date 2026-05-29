import {
  isPrivacyConsentGiven,
  PRIVACY_CONSENT_ERROR,
} from "@/lib/privacy-consent";
import { validateEmail } from "@/lib/validate-email";

/** Validation order: first failing field wins. */
export const CONTACT_FIELD_ORDER = ["name", "email", "message", "consent"] as const;

export type ContactFormField = (typeof CONTACT_FIELD_ORDER)[number];

export const CONTACT_FIELD_DOM_IDS: Record<ContactFormField, string> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
  consent: "contact-privacy-consent",
};

export const NAME_TOO_SHORT_ERROR = "Please enter your name";
export const MESSAGE_TOO_SHORT_ERROR =
  "Message is too short — describe the role or project";

export const CONTACT_NAME_MIN_LENGTH = 2;
export const CONTACT_MESSAGE_MIN_LENGTH = 10;

export type ContactFieldValidationFailure = {
  field: ContactFormField;
  error: string;
};

function isConsentGiven(consent: FormDataEntryValue | null | undefined | boolean): boolean {
  if (typeof consent === "boolean") return consent;
  return isPrivacyConsentGiven(consent);
}

export function validateContactFields(input: {
  name: string;
  email: string;
  message: string;
  consent: FormDataEntryValue | null | undefined | boolean;
}): ContactFieldValidationFailure | null {
  const name = input.name.trim();
  if (name.length < 2) {
    return { field: "name", error: NAME_TOO_SHORT_ERROR };
  }

  const email = input.email.trim().toLowerCase();
  const emailError = validateEmail(email);
  if (emailError) {
    return { field: "email", error: emailError };
  }

  const message = input.message.trim();
  if (message.length < 10) {
    return { field: "message", error: MESSAGE_TOO_SHORT_ERROR };
  }

  if (!isConsentGiven(input.consent)) {
    return { field: "consent", error: PRIVACY_CONSENT_ERROR };
  }

  return null;
}

export function focusContactField(field: ContactFormField): void {
  document.getElementById(CONTACT_FIELD_DOM_IDS[field])?.focus();
}
