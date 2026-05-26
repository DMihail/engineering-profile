import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY!;
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
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
  });
  return res.json() as Promise<RecaptchaResponse>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, recaptchaToken } = body;

    if (!recaptchaToken) {
      return NextResponse.json({ error: "Missing captcha token" }, { status: 400 });
    }

    const captcha = await verifyRecaptcha(recaptchaToken);

    if (!captcha.success || captcha.score < SCORE_THRESHOLD || captcha.action !== "contact_submit") {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const trimmedName = (name as string)?.trim().slice(0, MAX_NAME) ?? "";
    const trimmedEmail = (email as string)?.trim().toLowerCase().slice(0, MAX_EMAIL) ?? "";
    const trimmedCompany = (company as string)?.trim().slice(0, MAX_COMPANY) || null;
    const trimmedMessage = (message as string)?.trim().slice(0, MAX_MESSAGE) ?? "";

    if (trimmedName.length < 2) {
      return NextResponse.json({ error: "Name is too short" }, { status: 400 });
    }
    if (trimmedMessage.length < 10) {
      return NextResponse.json({ error: "Message is too short" }, { status: 400 });
    }

    await addDoc(collection(db, "messages"), {
      name: trimmedName,
      email: trimmedEmail,
      company: trimmedCompany,
      message: trimmedMessage,
      createdAt: serverTimestamp(),
      source: "portfolio",
      read: false,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
