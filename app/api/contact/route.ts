import { NextRequest, NextResponse } from "next/server";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { sendContactPushNotification } from "@/lib/send-contact-push-notification";
import { sendContactTelegramNotification } from "@/lib/send-contact-telegram-notification";
import { hasPrivacyConsentInBody } from "@/lib/privacy-consent";
import { validateContactFields } from "@/lib/contact-form-rules";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

const SCORE_THRESHOLD = 0.5;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 120;
const MAX_MESSAGE = 2000;

/** 5 submissions per IP per 10 minutes (server-side; client has its own throttle). */
const CONTACT_RATE_LIMIT = 5;
const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000;

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
  const ip = clientIpFromHeaders(req.headers);
  const rate = checkRateLimit(`contact:${ip}`, {
    limit: CONTACT_RATE_LIMIT,
    windowMs: CONTACT_RATE_WINDOW_MS,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests — please wait before sending again" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSec),
        },
      },
    );
  }

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
        const targets =
          pushResult.targets?.map((t) => `${t.platform ?? "?"}:${t.deviceId}`).join(", ") ?? "";
        console.info(
          `[api/contact] Push sent to ${pushResult.sent} device(s), failed=${pushResult.failed}${targets ? ` (${targets})` : ""}`,
        );
      }
    } catch (pushErr) {
      console.error("[api/contact] Push notification error:", pushErr);
    }

    try {
      const telegramSent = await sendContactTelegramNotification({
        messageId: docRef.id,
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        message: trimmedMessage,
      });
      if (telegramSent) {
        console.info("[api/contact] Telegram notification sent");
      }
    } catch (telegramErr) {
      console.error("[api/contact] Telegram notification error:", telegramErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
