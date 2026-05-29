import {
  NAME_TOO_SHORT_ERROR,
  applyContactFieldFailure,
  getContactFormFailure,
  readContactFormValues,
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

describe("contact form DOM helpers", () => {
  it("reads checkbox consent as checked value or null", () => {
    expect(readContactFormValues(makeForm({ consent: true })).consent).toBe(PRIVACY_CONSENT_VALUE);
    expect(readContactFormValues(makeForm({ consent: false })).consent).toBeNull();
  });

  it("delegates validation to readContactFormValues + validateContactFields", () => {
    const form = makeForm({
      name: "John Doe",
      email: "john@example.com",
      message: "Long enough message here",
      consent: true,
    });

    expect(getContactFormFailure(form)).toBeNull();
  });

  it("sets custom validity and focuses the failing field", () => {
    const form = makeForm({
      name: "  ",
      email: "john@example.com",
      message: "Long enough message here",
      consent: true,
    });
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const focusSpy = jest.spyOn(nameInput, "focus").mockImplementation(() => {});

    applyContactFieldFailure(form, { field: "name", error: NAME_TOO_SHORT_ERROR });

    expect(nameInput.validationMessage).toBe(NAME_TOO_SHORT_ERROR);
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it("uses consent error copy for unchecked checkbox", () => {
    const form = makeForm({
      name: "John Doe",
      email: "john@example.com",
      message: "Long enough message here",
      consent: false,
    });
    const consent = form.elements.namedItem("privacyConsent") as HTMLInputElement;
    const focusSpy = jest.spyOn(consent, "focus").mockImplementation(() => {});

    applyContactFieldFailure(form, { field: "consent", error: PRIVACY_CONSENT_ERROR });

    expect(consent.validationMessage).toBe(PRIVACY_CONSENT_ERROR);
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });
});
