import {
  MESSAGE_TOO_SHORT_ERROR,
  NAME_TOO_SHORT_ERROR,
  validateContactFields,
} from "@/lib/contact-form-rules";
import { PRIVACY_CONSENT_ERROR, PRIVACY_CONSENT_VALUE } from "@/lib/privacy-consent";

const validInput = {
  name: "John Doe",
  email: "john@example.com",
  message: "Hello, I have a project for you.",
  consent: PRIVACY_CONSENT_VALUE,
};

describe("validateContactFields", () => {
  it("returns null when all fields are valid", () => {
    expect(validateContactFields(validInput)).toBeNull();
  });

  it("checks name before email, message, and consent", () => {
    expect(
      validateContactFields({
        name: "A",
        email: "bad",
        message: "short",
        consent: null,
      }),
    ).toEqual({ field: "name", error: NAME_TOO_SHORT_ERROR });
  });

  it("checks email before message and consent", () => {
    expect(
      validateContactFields({
        name: "John Doe",
        email: "not-an-email",
        message: "short",
        consent: null,
      }),
    ).toMatchObject({ field: "email" });
  });

  it("checks message before consent", () => {
    expect(
      validateContactFields({
        name: "John Doe",
        email: "john@example.com",
        message: "short",
        consent: null,
      }),
    ).toEqual({ field: "message", error: MESSAGE_TOO_SHORT_ERROR });
  });

  it("checks consent last", () => {
    expect(
      validateContactFields({
        ...validInput,
        consent: null,
      }),
    ).toEqual({ field: "consent", error: PRIVACY_CONSENT_ERROR });
  });
});
