import { NextRequest, NextResponse } from "next/server";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { sendContactPushNotification } from "@/lib/send-contact-push-notification";
import { hasPrivacyConsentInBody } from "@/lib/privacy-consent";
import { validateContactFields } from "@/lib/contact-form-rules";

const SCORE_THRESHOLD = 0.5;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 120;
const MAX_MESSAGE = 2000;

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  "error-codes"?: string[];
}

async function verifyRecaptcha(token: string): Promise<RecaptchaResponse> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY is not configured");
  }

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  if (!res.ok) {
    throw new Error(`reCAPTCHA API returned ${res.status}`);
  }

  return res.json() as Promise<RecaptchaResponse>;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const { name, email, company, message, recaptchaToken } = body;

    const trimmedName = (typeof name === "string" ? name : "").trim().slice(0, MAX_NAME);
    const trimmedEmail = (typeof email === "string" ? email : "").trim().toLowerCase().slice(0, MAX_EMAIL);
    const trimmedCompany = (typeof company === "string" ? company : "").trim().slice(0, MAX_COMPANY) || null;
    const trimmedMessage = (typeof message === "string" ? message : "").trim().slice(0, MAX_MESSAGE);

    const fieldFailure = validateContactFields({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      consent: hasPrivacyConsentInBody(body),
    });
    if (fieldFailure) {
      return NextResponse.json({ error: fieldFailure.error }, { status: 400 });
    }

    if (!recaptchaToken || typeof recaptchaToken !== "string") {
      return NextResponse.json({ error: "Missing captcha token" }, { status: 400 });
    }

    let captcha: RecaptchaResponse;
    try {
      captcha = await verifyRecaptcha(recaptchaToken);
    } catch (captchaErr) {
      console.error("[api/contact] reCAPTCHA verification error:", captchaErr);
      return NextResponse.json({ error: "Security verification unavailable — try again later" }, { status: 503 });
    }

    if (!captcha.success || captcha.score < SCORE_THRESHOLD || captcha.action !== "contact_submit") {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const app = getFirebaseAdminApp();
    if (!app) {
      console.error("[api/contact] Firebase Admin is not configured");
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const docRef = await getFirestore(app).collection("messages").add({
      name: trimmedName,
      email: trimmedEmail,
      company: trimmedCompany,
      message: trimmedMessage,
      privacyConsentAccepted: true,
      privacyConsentAt: Timestamp.now(),
      createdAt: Timestamp.now(),
      source: "portfolio",
      read: false,
    });

    try {
      const pushResult = await sendContactPushNotification({
        messageId: docRef.id,
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        preview: trimmedMessage,
      });
      if (pushResult === null) {
        console.warn("[api/contact] Push skipped — Firebase Admin not configured");
      } else if (pushResult.sent === 0) {
        console.warn(
          "[api/contact] Push not delivered — no FCM devices in Firestore (enable push in inbox PWA on each device)",
        );
      } else {
        console.info(
          `[api/contact] Push sent to ${pushResult.sent} device(s), failed=${pushResult.failed}`,
        );
      }
    } catch (pushErr) {
      console.error("[api/contact] Push notification error:", pushErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
