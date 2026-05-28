import { NextRequest, NextResponse } from "next/server";
import {
  getContactMessageById,
  markContactMessageReplied,
} from "@/lib/contact-message";
import { inboxOptionsResponse, withInboxCors } from "@/lib/inbox-cors";
import { isMailConfigured, sendReplyEmail, MAX_REPLY_BODY } from "@/lib/send-reply-email";
import { verifyInboxAuth } from "@/lib/verify-inbox-auth";

export async function OPTIONS(request: NextRequest) {
  return inboxOptionsResponse(request);
}

export async function POST(request: NextRequest) {
  const auth = await verifyInboxAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  if (!isMailConfigured()) {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 }),
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Invalid request body" }, { status: 400 }),
    );
  }

  const messageId = typeof body.messageId === "string" ? body.messageId.trim() : "";
  const replyBody = typeof body.body === "string" ? body.body : "";

  if (!messageId || messageId.length > 128) {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Invalid message id" }, { status: 400 }),
    );
  }

  if (replyBody.trim().length < 2) {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Reply is too short" }, { status: 400 }),
    );
  }

  if (replyBody.length > MAX_REPLY_BODY) {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Reply is too long" }, { status: 400 }),
    );
  }

  const contact = await getContactMessageById(messageId);
  if (!contact) {
    return withInboxCors(
      request,
      NextResponse.json({ error: "Message not found" }, { status: 404 }),
    );
  }

  try {
    const sent = await sendReplyEmail({ contact, replyBody });
    try {
      await markContactMessageReplied(messageId, {
        repliedByUid: auth.uid,
        replyPreview: replyBody.trim(),
      });
    } catch (markErr) {
      console.error("[api/inbox/reply] Failed to update Firestore:", markErr);
    }

    return withInboxCors(
      request,
      NextResponse.json({ success: true, emailMessageId: sent.messageId }),
    );
  } catch (err) {
    console.error("[api/inbox/reply] Send failed:", err);
    const message = err instanceof Error ? err.message : "Failed to send email";
    const status = message.includes("too short") ? 400 : 502;
    return withInboxCors(request, NextResponse.json({ error: message }, { status }));
  }
}
