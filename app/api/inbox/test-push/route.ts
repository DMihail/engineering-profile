import { NextRequest, NextResponse } from "next/server";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { inboxOptionsResponse, withInboxCors } from "@/lib/inbox-cors";
import { sendInboxTestPush } from "@/lib/send-inbox-test-push";
import { verifyInboxAuth } from "@/lib/verify-inbox-auth";

export async function OPTIONS(request: NextRequest) {
  return inboxOptionsResponse(request);
}

export async function POST(request: NextRequest) {
  const auth = await verifyInboxAuth(request);
  if (!auth.ok) {
    return auth.response;
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
              "No FCM token for this account. Enable push in the inbox app while signed in as this user.",
          },
          { status: 404 },
        ),
      );
    }

    return withInboxCors(request, NextResponse.json({ success: true }));
  } catch (err) {
    console.error("[api/inbox/test-push] Send failed:", err);
    const message = err instanceof Error ? err.message : "Failed to send test push";
    return withInboxCors(request, NextResponse.json({ error: message }, { status: 502 }));
  }
}
