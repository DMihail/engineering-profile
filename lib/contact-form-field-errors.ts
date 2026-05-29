import {
  CONTACT_FIELD_ORDER,
  MESSAGE_TOO_SHORT_ERROR,
  NAME_TOO_SHORT_ERROR,
  type ContactFormField,
} from "@/lib/contact-form-validation";
import { isPrivacyConsentError } from "@/lib/privacy-consent";

export type { ContactFormField };
export { CONTACT_FIELD_ORDER } from "@/lib/contact-form-validation";

export type ContactFieldErrors = Partial<Record<ContactFormField, string>>;

export function contactFieldErrorId(field: ContactFormField): string {
  return `contact-${field}-error`;
}

export function resolveContactFieldErrors(error: string | undefined): {
  byField: ContactFieldErrors;
  isFieldLevel: boolean;
  firstField: ContactFormField | null;
} {
  if (!error) {
    return { byField: {}, isFieldLevel: false, firstField: null };
  }

  if (error === NAME_TOO_SHORT_ERROR || error.toLowerCase().includes("please enter your name")) {
    return { byField: { name: error }, isFieldLevel: true, firstField: "name" };
  }

  const lower = error.toLowerCase();

  if (
    lower.includes("valid email")
    || lower.includes("disposable email")
    || lower.includes("email address")
  ) {
    return { byField: { email: error }, isFieldLevel: true, firstField: "email" };
  }

  if (
    error === MESSAGE_TOO_SHORT_ERROR
    || (lower.includes("message") && (lower.includes("short") || lower.includes("describe")))
  ) {
    return { byField: { message: error }, isFieldLevel: true, firstField: "message" };
  }

  if (isPrivacyConsentError(error)) {
    return { byField: { consent: error }, isFieldLevel: true, firstField: "consent" };
  }

  return { byField: {}, isFieldLevel: false, firstField: null };
}

export function getFirstFieldWithError(byField: ContactFieldErrors): ContactFormField | null {
  for (const field of CONTACT_FIELD_ORDER) {
    if (byField[field]) return field;
  }
  return null;
}
