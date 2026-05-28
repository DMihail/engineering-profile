import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { withInboxCors } from "@/lib/inbox-cors";

export type InboxAuthResult =
  | { ok: true; uid: string; email?: string }
  | { ok: false; response: NextResponse };

export async function verifyInboxAuth(request: NextRequest): Promise<InboxAuthResult> {
  const unauthorized = (message: string, status = 401) =>
    ({
      ok: false as const,
      response: withInboxCors(
        request,
        NextResponse.json({ error: message }, { status }),
      ),
    });

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return unauthorized("Missing authorization token");
  }

  const app = getFirebaseAdminApp();
  if (!app) {
    return unauthorized("Server authentication is not configured", 503);
  }

  const idToken = authHeader.slice("Bearer ".length).trim();
  if (!idToken) {
    return unauthorized("Missing authorization token");
  }

  try {
    const decoded = await getAuth(app).verifyIdToken(idToken);
    const allowed = process.env.INBOX_ALLOWED_UIDS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (allowed?.length && !allowed.includes(decoded.uid)) {
      return unauthorized("Forbidden", 403);
    }

    return { ok: true, uid: decoded.uid, email: decoded.email };
  } catch {
    return unauthorized("Invalid or expired token");
  }
}
