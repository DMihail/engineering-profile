import { resolveContactFieldErrors } from "@/lib/contact-form-field-errors";
import { PRIVACY_CONSENT_ERROR } from "@/lib/privacy-consent";

describe("resolveContactFieldErrors", () => {
  it("maps privacy consent errors", () => {
    expect(resolveContactFieldErrors(PRIVACY_CONSENT_ERROR)).toEqual({
      byField: { consent: PRIVACY_CONSENT_ERROR },
      isFieldLevel: true,
      firstField: "consent",
    });
  });

  it("maps name validation errors", () => {
    expect(resolveContactFieldErrors("Please enter your name")).toEqual({
      byField: { name: "Please enter your name" },
      isFieldLevel: true,
      firstField: "name",
    });
  });

  it("maps email validation errors", () => {
    expect(resolveContactFieldErrors("Please enter a valid email address")).toEqual({
      byField: { email: "Please enter a valid email address" },
      isFieldLevel: true,
      firstField: "email",
    });
  });

  it("maps message validation errors", () => {
    const error = "Message is too short — describe the role or project";
    expect(resolveContactFieldErrors(error)).toEqual({
      byField: { message: error },
      isFieldLevel: true,
      firstField: "message",
    });
  });

  it("treats server errors as non-field-level", () => {
    expect(resolveContactFieldErrors("Captcha verification failed")).toEqual({
      byField: {},
      isFieldLevel: false,
      firstField: null,
    });
  });
});
