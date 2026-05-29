export type ContactFormFeedbackVariant = "success" | "error" | "warning";

export function contactFormFeedbackVariant(
  state: { success: boolean; error?: string },
): ContactFormFeedbackVariant | null {
  if (state.success) return "success";
  if (!state.error) return null;

  const lower = state.error.toLowerCase();
  if (lower.includes("please wait before sending")) {
    return "warning";
  }

  return "error";
}

export function contactFormFeedbackMessage(state: {
  success: boolean;
  error?: string;
}): string | null {
  if (state.success) {
    return "Thanks for reaching out — I'll get back to you within 24 hours.";
  }

  return state.error ?? null;
}

export function contactFormFeedbackTitle(variant: ContactFormFeedbackVariant): string {
  switch (variant) {
    case "success":
      return "Message sent";
    case "warning":
      return "Please wait";
    case "error":
      return "Could not send";
  }
}
