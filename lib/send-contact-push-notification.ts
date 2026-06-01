import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import {
  type FcmDeviceRegistration,
  dedupeFcmRegistrationsByToken,
  listAllFcmDeviceRegistrations,
  pruneStaleFcmDeviceRegistrations,
} from "@/lib/fcm-tokens";
import { buildInboxFcmMulticastFields } from "@/lib/build-inbox-fcm-message";
import { resolveInboxAppUrl } from "@/lib/inbox-app-url";
import { getMessaging } from "firebase-admin/messaging";

export interface ContactPushPayload {
  messageId: string;
  name: string;
  email: string;
  company: string | null;
  preview: string;
}

function buildTitle(name: string): string {
  const trimmed = name.trim();
  return trimmed ? `Message from ${trimmed}` : "New contact message";
}

function buildBody({ name, email }: Pick<ContactPushPayload, "name" | "email">): string {
  return `${name} · ${email}`;
}

function buildPreview(message: string): string {
  const oneLine = message.replace(/\s+/g, " ").trim();
  if (oneLine.length <= 120) return oneLine;
  return `${oneLine.slice(0, 117)}…`;
}

export async function sendContactPushNotification(
  payload: ContactPushPayload,
): Promise<{ sent: number; failed: number; targets?: FcmDeviceRegistration[] } | null> {
  const app = getFirebaseAdminApp();
  if (!app) {
    return null;
  }

  const registrations = dedupeFcmRegistrationsByToken(
    await listAllFcmDeviceRegistrations(app),
  );
  if (registrations.length === 0) {
    console.warn(
      "[api/contact] No FCM device tokens in Firestore — enable push in the inbox PWA and check fcmTokens/{uid}/devices",
    );
    return { sent: 0, failed: 0, targets: [] };
  }

  const title = buildTitle(payload.name);
  const body = buildBody(payload);
  const preview = buildPreview(payload.preview);
  const inboxUrl = resolveInboxAppUrl();
  const hasAbsoluteInboxUrl = /^https?:\/\//i.test(inboxUrl);
  if (!hasAbsoluteInboxUrl) {
    console.warn(
      "[api/contact] INBOX_APP_URL must be https://your-inbox.vercel.app — iOS/Android may not show or open notifications",
    );
  }

  const messaging = getMessaging(app);
  const fcmFields = buildInboxFcmMulticastFields(inboxUrl, {
    title,
    body,
    messageId: payload.messageId,
    preview,
    senderName: payload.name,
    senderEmail: payload.email,
  });

  const response = await messaging.sendEachForMulticast({
    tokens: registrations.map((r) => r.token),
    ...fcmFields,
  });

  response.responses.forEach((result, index) => {
    if (result.success) return;
    const target = registrations[index];
    console.warn(
      `[api/contact] FCM failed for ${target?.platform ?? "?"} device ${target?.deviceId ?? "?"}:`,
      result.error?.code,
      result.error?.message,
    );
  });

  await pruneStaleFcmDeviceRegistrations(registrations, response.responses, app);

  if (response.successCount === 0 && registrations.length > 0) {
    console.warn(
      `[api/contact] FCM delivered to 0/${registrations.length} device(s) — tokens may be stale; re-enable push in inbox`,
    );
  }

  return {
    sent: response.successCount,
    failed: response.failureCount,
    targets: registrations,
  };
}
