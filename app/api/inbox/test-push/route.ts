import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { inboxOptionsResponse, withInboxCors } from "@/lib/inbox-cors";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInboxTestPush } from "@/lib/send-inbox-test-push";
import { verifyInboxAuth } from "@/lib/verify-inbox-auth";

/** 10 test pushes per authenticated UID per 10 minutes. */
const INBOX_TEST_PUSH_RATE_LIMIT = 10;
const INBOX_TEST_PUSH_RATE_WINDOW_MS = 10 * 60 * 1000;

export async function OPTIONS(request: NextRequest) {
  return inboxOptionsResponse(request);
}

export async function POST(request: NextRequest) {
  const auth = await verifyInboxAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  const rate = checkRateLimit(`inbox-test-push:${auth.uid}`, {
    limit: INBOX_TEST_PUSH_RATE_LIMIT,
    windowMs: INBOX_TEST_PUSH_RATE_WINDOW_MS,
  });
  if (!rate.ok) {
    return withInboxCors(
      request,
      NextResponse.json(
        { error: "Too many requests — please wait before trying again" },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        },
      ),
    );
  }

  if (!getFirebaseAdminApp()) {
    console.error(
      "[api/inbox/test-push] Firebase Admin is not configured — set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY (+ project id) in .env.local",
    );
    return withInboxCors(
      request,
      NextResponse.json(
        {
          error:
            "Push is not configured on the server (FCM). Add Firebase Admin credentials to engineering-profile .env.local and restart npm run dev.",
        },
        { status: 503 },
      ),
    );
  }

  try {
    const result = await sendInboxTestPush(auth.uid);
    if (!result.sent) {
      if (result.reason === "no-admin") {
        return withInboxCors(
          request,
          NextResponse.json(
            {
              error:
                "Push is not configured on the server (FCM). Add Firebase Admin credentials to engineering-profile .env.local.",
            },
            { status: 503 },
          ),
        );
      }
      return withInboxCors(
        request,
        NextResponse.json(
          {
            error:
              "No FCM devices for this account. Enable push on each phone or browser while signed in as this user.",
          },
          { status: 404 },
        ),
      );
    }

    return withInboxCors(
      request,
      NextResponse.json({
        success: true,
        deviceCount: result.deviceCount,
        successCount: result.successCount,
      }),
    );
  } catch (err) {
    console.error("[api/inbox/test-push] Send failed:", err);
    const message = err instanceof Error ? err.message : "Failed to send test push";
    return withInboxCors(request, NextResponse.json({ error: message }, { status: 502 }));
  }
}
