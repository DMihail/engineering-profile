import { PRIVACY_CONSENT_ERROR, PRIVACY_CONSENT_FIELD, isPrivacyConsentGiven } from "@/lib/privacy-consent";
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
export const EMAIL_REQUIRED_ERROR = "Please enter a valid email address";
export const MESSAGE_TOO_SHORT_ERROR =
  "Message is too short — describe the role or project";

export const CONTACT_NAME_MIN_LENGTH = 2;
export const CONTACT_MESSAGE_MIN_LENGTH = 10;

export type ContactFieldValidationFailure = {
  field: ContactFormField;
  error: string;
};

type ValidatableField = HTMLInputElement | HTMLTextAreaElement;

const HTML_FIELD_MESSAGES: Partial<
  Record<ContactFormField, Partial<Record<"valueMissing" | "tooShort" | "typeMismatch", string>>>
> = {
  name: {
    valueMissing: NAME_TOO_SHORT_ERROR,
    tooShort: NAME_TOO_SHORT_ERROR,
  },
  email: {
    valueMissing: EMAIL_REQUIRED_ERROR,
    typeMismatch: EMAIL_REQUIRED_ERROR,
  },
  message: {
    valueMissing: MESSAGE_TOO_SHORT_ERROR,
    tooShort: MESSAGE_TOO_SHORT_ERROR,
  },
  consent: {
    valueMissing: PRIVACY_CONSENT_ERROR,
  },
};

function isConsentGiven(consent: FormDataEntryValue | null | undefined | boolean): boolean {
  if (typeof consent === "boolean") return consent;
  return isPrivacyConsentGiven(consent);
}

function isValidatableField(element: Element | null): element is ValidatableField {
  return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
}

export function validateContactFields(input: {
  name: string;
  email: string;
  message: string;
  consent: FormDataEntryValue | null | undefined | boolean;
}): ContactFieldValidationFailure | null {
  const name = input.name.trim();
  if (name.length < CONTACT_NAME_MIN_LENGTH) {
    return { field: "name", error: NAME_TOO_SHORT_ERROR };
  }

  const email = input.email.trim().toLowerCase();
  const emailError = validateEmail(email);
  if (emailError) {
    return { field: "email", error: emailError };
  }

  const message = input.message.trim();
  if (message.length < CONTACT_MESSAGE_MIN_LENGTH) {
    return { field: "message", error: MESSAGE_TOO_SHORT_ERROR };
  }

  if (!isConsentGiven(input.consent)) {
    return { field: "consent", error: PRIVACY_CONSENT_ERROR };
  }

  return null;
}

export function readContactFormValues(form: HTMLFormElement) {
  const nameEl = form.elements.namedItem("name");
  const emailEl = form.elements.namedItem("email");
  const messageEl = form.elements.namedItem("message");
  const consentEl = form.elements.namedItem(PRIVACY_CONSENT_FIELD);

  return {
    name: isValidatableField(nameEl) ? nameEl.value : "",
    email: isValidatableField(emailEl) ? emailEl.value : "",
    message: messageEl instanceof HTMLTextAreaElement ? messageEl.value : "",
    consent:
      consentEl instanceof HTMLInputElement && consentEl.type === "checkbox"
        ? consentEl.checked
          ? consentEl.value
          : null
        : null,
  };
}

export function setContactFieldCustomMessage(input: ValidatableField, field: ContactFormField) {
  const messages = HTML_FIELD_MESSAGES[field];
  const { validity } = input;

  if (validity.valid) {
    input.setCustomValidity("");
    return;
  }

  if (validity.valueMissing && messages?.valueMissing) {
    input.setCustomValidity(messages.valueMissing);
    return;
  }

  if (validity.tooShort && messages?.tooShort) {
    input.setCustomValidity(messages.tooShort);
    return;
  }

  if (validity.typeMismatch && messages?.typeMismatch) {
    input.setCustomValidity(messages.typeMismatch);
    return;
  }

  input.setCustomValidity(
    messages?.tooShort
    ?? messages?.valueMissing
    ?? messages?.typeMismatch
    ?? "Please check this field.",
  );
}

export function clearContactFieldValidity(
  event: React.FormEvent<ValidatableField | HTMLInputElement>,
) {
  event.currentTarget.setCustomValidity("");
}

/** First failing field in priority order (name → email → message → consent). */
export function getContactFormFailure(
  form: HTMLFormElement,
): ContactFieldValidationFailure | null {
  return validateContactFields(readContactFormValues(form));
}

export function applyContactFieldFailure(
  form: HTMLFormElement,
  failure: ContactFieldValidationFailure,
): void {
  const element = form.elements.namedItem(
    failure.field === "consent" ? PRIVACY_CONSENT_FIELD : failure.field,
  );

  if (isValidatableField(element)) {
    element.setCustomValidity(failure.error);
    element.focus();
  } else if (failure.field === "consent" && element instanceof HTMLInputElement) {
    element.setCustomValidity(failure.error);
    element.focus();
  }
}

/** @deprecated Use getContactFormFailure + applyContactFieldFailure */
export function enforceExtendedContactRules(
  form: HTMLFormElement,
): { ok: true } | { ok: false; field: ContactFormField; error: string } {
  const failure = getContactFormFailure(form);
  if (!failure) return { ok: true };

  applyContactFieldFailure(form, failure);
  return { ok: false, field: failure.field, error: failure.error };
}

export function focusContactField(field: ContactFormField): void {
  document.getElementById(CONTACT_FIELD_DOM_IDS[field])?.focus();
}
