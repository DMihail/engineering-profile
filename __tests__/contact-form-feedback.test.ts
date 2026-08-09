import {
  contactFormFeedbackMessage,
  contactFormFeedbackVariant,
} from "@/components/contact/submit-contact-form";

describe("contact form feedback", () => {
  it("maps success state to success toast copy", () => {
    const state = { success: true, ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("success");
    expect(contactFormFeedbackMessage(state)).toMatch(/get back to you/i);
  });

  it("maps throttle message to warning", () => {
    const state = { success: false, error: "Please wait before sending again", ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("warning");
  });

  it("maps validation errors to error", () => {
    const state = { success: false, error: "Please enter your name", field: "name" as const, ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("error");
  });
});
