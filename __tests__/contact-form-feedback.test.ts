import {
  contactFormFeedbackMessage,
  contactFormFeedbackTitle,
  contactFormFeedbackVariant,
} from "@/lib/contact-form-feedback";

describe("contact form feedback", () => {
  it("maps success state to success toast copy", () => {
    const state = { success: true, ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("success");
    expect(contactFormFeedbackMessage(state)).toMatch(/get back to you/i);
    expect(contactFormFeedbackTitle("success")).toBe("Message sent");
  });

  it("maps throttle message to warning", () => {
    const state = { success: false, error: "Please wait before sending again", ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("warning");
    expect(contactFormFeedbackTitle("warning")).toBe("Please wait");
  });

  it("maps validation errors to error", () => {
    const state = { success: false, error: "Please enter your name", ts: 1 };
    expect(contactFormFeedbackVariant(state)).toBe("error");
    expect(contactFormFeedbackTitle("error")).toBe("Could not send");
  });
});
