import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import {
  listAllFcmDeviceRegistrations,
  pruneStaleFcmDeviceRegistrations,
} from "@/lib/fcm-tokens";
import { getMessaging } from "firebase-admin/messaging";

export interface ContactPushPayload {
  messageId: string;
  name: string;
  email: string;
  company: string | null;
  preview: string;
}

const DEFAULT_TITLE = "New contact message";

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
): Promise<{ sent: number; failed: number } | null> {
  const app = getFirebaseAdminApp();
  if (!app) {
    return null;
  }

  const registrations = await listAllFcmDeviceRegistrations(app);
  if (registrations.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const title = DEFAULT_TITLE;
  const body = buildBody(payload);
  const preview = buildPreview(payload.preview);
  const inboxUrl = process.env.INBOX_APP_URL?.trim() || "/";

  const messaging = getMessaging(app);
  const response = await messaging.sendEachForMulticast({
    tokens: registrations.map((r) => r.token),
    data: {
      title,
      body,
      messageId: payload.messageId,
      url: inboxUrl,
      preview,
      senderName: payload.name,
      senderEmail: payload.email,
    },
    webpush: {
      headers: { Urgency: "high" },
      fcmOptions: { link: inboxUrl },
    },
  });

  await pruneStaleFcmDeviceRegistrations(registrations, response.responses, app);

  return {
    sent: response.successCount,
    failed: response.failureCount,
  };
}
