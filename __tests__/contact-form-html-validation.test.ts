import {
  MESSAGE_TOO_SHORT_ERROR,
  NAME_TOO_SHORT_ERROR,
  enforceExtendedContactRules,
  getContactFormFailure,
  readContactFormValues,
  setContactFieldCustomMessage,
} from "@/lib/contact-form-rules";
import { PRIVACY_CONSENT_ERROR, PRIVACY_CONSENT_VALUE } from "@/lib/privacy-consent";

function makeForm(values: {
  name?: string;
  email?: string;
  message?: string;
  consent?: boolean;
}) {
  const form = document.createElement("form");
  form.innerHTML = `
    <input name="name" value="${values.name ?? ""}" />
    <input name="email" value="${values.email ?? ""}" />
    <textarea name="message">${values.message ?? ""}</textarea>
    <input type="checkbox" name="privacyConsent" value="${PRIVACY_CONSENT_VALUE}" ${values.consent ? "checked" : ""} />
  `;
  return form;
}

describe("contact form HTML rules", () => {
  it("reads checkbox consent as checked value or null", () => {
    expect(readContactFormValues(makeForm({ consent: true })).consent).toBe(PRIVACY_CONSENT_VALUE);
    expect(readContactFormValues(makeForm({ consent: false })).consent).toBeNull();
  });

  it("returns the first failure in field order when multiple values are invalid", () => {
    const form = makeForm({
      name: "A",
      email: "bad",
      message: "short",
      consent: false,
    });

    expect(getContactFormFailure(form)).toEqual({ field: "name", error: NAME_TOO_SHORT_ERROR });
  });

  it("blocks submit when trimmed name is too short", () => {
    const form = makeForm({
      name: "  ",
      email: "john@example.com",
      message: "Long enough message here",
      consent: true,
    });

    const result = enforceExtendedContactRules(form);
    expect(result).toEqual({ ok: false, field: "name", error: NAME_TOO_SHORT_ERROR });
  });

  it("blocks submit for disposable email after HTML email format passes", () => {
    const form = makeForm({
      name: "John Doe",
      email: "test@mailinator.com",
      message: "Long enough message here",
      consent: true,
    });

    const result = enforceExtendedContactRules(form);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.field).toBe("email");
      expect(result.error).toMatch(/disposable email/i);
    }
  });

  it("passes when all extended rules succeed", () => {
    const form = makeForm({
      name: "John Doe",
      email: "john@example.com",
      message: "Long enough message here",
      consent: true,
    });

    expect(enforceExtendedContactRules(form)).toEqual({ ok: true });
  });

  it("maps native name validity flags to custom messages", () => {
    const input = document.createElement("input");
    Object.defineProperty(input, "validity", {
      configurable: true,
      value: {
        valid: false,
        valueMissing: false,
        tooShort: true,
        typeMismatch: false,
      },
    });

    setContactFieldCustomMessage(input, "name");
    expect(input.validationMessage).toBe(NAME_TOO_SHORT_ERROR);
  });

  it("maps native message validity flags to custom messages", () => {
    const message = document.createElement("textarea");
    Object.defineProperty(message, "validity", {
      configurable: true,
      value: {
        valid: false,
        valueMissing: true,
        tooShort: false,
        typeMismatch: false,
      },
    });

    setContactFieldCustomMessage(message, "message");
    expect(message.validationMessage).toBe(MESSAGE_TOO_SHORT_ERROR);
  });

  it("uses consent error copy for unchecked checkbox", () => {
    const consent = document.createElement("input");
    consent.setCustomValidity(PRIVACY_CONSENT_ERROR);
    expect(consent.validationMessage).toBe(PRIVACY_CONSENT_ERROR);
  });
});
