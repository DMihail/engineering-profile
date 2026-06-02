import { PRIVACY_CONSENT_FIELD } from "@/lib/privacy-consent";
import {
  type ContactFormField,
  validateContactFields,
} from "@/lib/contact-form-rules";

export type ContactFormFeedbackVariant = "success" | "error" | "warning";

export type ContactFormState = {
  success: boolean;
  error?: string;
  field?: ContactFormField;
  ts: number;
};

export const CONTACT_FORM_INITIAL_STATE: ContactFormState = { success: false, ts: 0 };

const THROTTLE_MS = 10_000;
let lastSubmitAt = 0;

function fail(error: string, ts: number, field?: ContactFormField): ContactFormState {
  return { success: false, error, field, ts };
}

export function contactFormFeedbackVariant(
  state: Pick<ContactFormState, "success" | "error">,
): ContactFormFeedbackVariant | null {
  if (state.success) return "success";
  if (!state.error) return null;

  const lower = state.error.toLowerCase();
  if (lower.includes("please wait before sending")) {
    return "warning";
  }

  return "error";
}

export function contactFormFeedbackMessage(
  state: Pick<ContactFormState, "success" | "error">,
): string | null {
  if (state.success) {
    return "Thanks for reaching out — I'll get back to you within 24 hours.";
  }

  return state.error ?? null;
}

function getRecaptchaToken(): Promise<string> {
  return import("@/lib/recaptcha-client").then(({ ensureRecaptchaLoaded }) =>
    ensureRecaptchaLoaded().then(
      () =>
        new Promise((resolve, reject) => {
          const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
          if (!siteKey) {
            reject(new Error("reCAPTCHA is not configured"));
            return;
          }
          if (!window.grecaptcha) {
            reject(new Error("reCAPTCHA not loaded — check your connection"));
            return;
          }
          const timeout = setTimeout(() => reject(new Error("reCAPTCHA timed out")), 10_000);
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(siteKey, { action: "contact_submit" })
              .then((token) => {
                clearTimeout(timeout);
                resolve(token);
              })
              .catch((err) => {
                clearTimeout(timeout);
                reject(err);
              });
          });
        }),
    ),
  );
}

export async function submitContactForm(
  _prev: ContactFormState,
  data: FormData,
): Promise<ContactFormState> {
  void _prev;

  const now = Date.now();
  if (now - lastSubmitAt < THROTTLE_MS) {
    return fail("Please wait before sending again", now);
  }

  const fieldFailure = validateContactFields({
    name: (data.get("name") as string) ?? "",
    email: (data.get("email") as string) ?? "",
    message: (data.get("message") as string) ?? "",
    consent: data.get(PRIVACY_CONSENT_FIELD),
  });
  if (fieldFailure) {
    return fail(fieldFailure.error, now, fieldFailure.field);
  }

  const name = (data.get("name") as string).trim();
  const email = (data.get("email") as string).trim().toLowerCase();
  const message = (data.get("message") as string).trim();
  const company = (data.get("company") as string)?.trim() || null;

  try {
    let recaptchaToken: string;
    try {
      recaptchaToken = await getRecaptchaToken();
    } catch (captchaErr) {
      console.warn("[contact] reCAPTCHA failed:", captchaErr);
      return fail("Security check failed — please reload and try again", Date.now());
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        recaptchaToken,
        [PRIVACY_CONSENT_FIELD]: true,
      }),
    });

    if (!res.ok) {
      let serverError = "Request failed";
      try {
        const body = await res.json();
        serverError = body.error || serverError;
      } catch {
        /* non-JSON response */
      }
      return fail(serverError, Date.now());
    }

    lastSubmitAt = Date.now();
    return { success: true, ts: Date.now() };
  } catch (err) {
    console.error("[contact] Submit failed:", err);
    const errorMsg =
      err instanceof Error && err.message.includes("failed to fetch")
        ? "Network error — check your connection"
        : "Failed to send — please try again or email directly";
    return fail(errorMsg, Date.now());
  }
}
