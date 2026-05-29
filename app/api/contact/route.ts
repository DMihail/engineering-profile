import { NextRequest, NextResponse } from "next/server";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { sendContactPushNotification } from "@/lib/send-contact-push-notification";

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

    const trimmedName = (typeof name === "string" ? name : "").trim().slice(0, MAX_NAME);
    const trimmedEmail = (typeof email === "string" ? email : "").trim().toLowerCase().slice(0, MAX_EMAIL);
    const trimmedCompany = (typeof company === "string" ? company : "").trim().slice(0, MAX_COMPANY) || null;
    const trimmedMessage = (typeof message === "string" ? message : "").trim().slice(0, MAX_MESSAGE);

    if (trimmedName.length < 2) {
      return NextResponse.json({ error: "Name is too short" }, { status: 400 });
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (trimmedMessage.length < 10) {
      return NextResponse.json({ error: "Message is too short" }, { status: 400 });
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
      createdAt: Timestamp.now(),
      source: "portfolio",
      read: false,
    });

    try {
      await sendContactPushNotification({
        messageId: docRef.id,
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        preview: trimmedMessage,
      });
    } catch (pushErr) {
      console.error("[api/contact] Push notification error:", pushErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
