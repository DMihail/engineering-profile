import { PRIVACY_CONSENT_ERROR, PRIVACY_CONSENT_FIELD } from "@/lib/privacy-consent";
import {
  CONTACT_MESSAGE_MIN_LENGTH,
  CONTACT_NAME_MIN_LENGTH,
  MESSAGE_TOO_SHORT_ERROR,
  NAME_TOO_SHORT_ERROR,
  type ContactFormField,
  validateContactFields,
} from "@/lib/contact-form-validation";

type ValidatableField = HTMLInputElement | HTMLTextAreaElement;

const FIELD_MESSAGES: Partial<
  Record<ContactFormField, Partial<Record<"valueMissing" | "tooShort" | "typeMismatch", string>>>
> = {
  name: {
    valueMissing: NAME_TOO_SHORT_ERROR,
    tooShort: NAME_TOO_SHORT_ERROR,
  },
  email: {
    valueMissing: "Please enter a valid email address",
    typeMismatch: "Please enter a valid email address",
  },
  message: {
    valueMissing: MESSAGE_TOO_SHORT_ERROR,
    tooShort: MESSAGE_TOO_SHORT_ERROR,
  },
  consent: {
    valueMissing: PRIVACY_CONSENT_ERROR,
  },
};

function isValidatableField(
  element: Element | null,
): element is ValidatableField {
  return (
    element instanceof HTMLInputElement
    || element instanceof HTMLTextAreaElement
  );
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

export function setContactFieldCustomMessage(
  input: ValidatableField,
  field: ContactFormField,
) {
  const messages = FIELD_MESSAGES[field];
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

/** Trim, disposable email, and other rules HTML cannot enforce before submit. */
export function enforceExtendedContactRules(
  form: HTMLFormElement,
): { ok: true } | { ok: false; field: ContactFormField; error: string } {
  const failure = validateContactFields(readContactFormValues(form));
  if (!failure) return { ok: true };

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

  return { ok: false, field: failure.field, error: failure.error };
}

export { CONTACT_NAME_MIN_LENGTH, CONTACT_MESSAGE_MIN_LENGTH };
