import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

export interface ContactPushPayload {
  messageId: string;
  name: string;
  email: string;
  company: string | null;
  preview: string;
}

interface TokenRegistration {
  uid: string;
  token: string;
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

async function loadFcmRegistrations(): Promise<TokenRegistration[]> {
  const app = getFirebaseAdminApp();
  if (!app) return [];

  const snap = await getFirestore(app).collection("fcmTokens").get();
  const registrations: TokenRegistration[] = [];

  snap.forEach((docSnap) => {
    const data = docSnap.data();
    const token = typeof data.token === "string" ? data.token : "";
    if (!token) return;
    registrations.push({ uid: docSnap.id, token });
  });

  return registrations;
}

export async function sendContactPushNotification(
  payload: ContactPushPayload,
): Promise<{ sent: number; failed: number } | null> {
  const app = getFirebaseAdminApp();
  if (!app) {
    return null;
  }

  const registrations = await loadFcmRegistrations();
  if (registrations.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const title = DEFAULT_TITLE;
  const body = buildBody(payload);
  const preview = buildPreview(payload.preview);
  const inboxUrl = process.env.INBOX_APP_URL?.trim() || "/";

  const messaging = getMessaging(app);
  // Data-only: Web FCM invokes `onBackgroundMessage` in the inbox service worker when the app is closed.
  // A top-level `notification` field is handled by the browser inconsistently and often skips the SW handler.
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

  const staleUids: string[] = [];
  response.responses.forEach((result, index) => {
    if (result.success) return;
    const code = result.error?.code;
    if (
      code === "messaging/registration-token-not-registered" ||
      code === "messaging/invalid-registration-token"
    ) {
      staleUids.push(registrations[index]!.uid);
    }
  });

  if (staleUids.length > 0) {
    const db = getFirestore(app);
    await Promise.all(
      staleUids.map((uid) =>
        db.collection("fcmTokens").doc(uid).delete().catch(() => undefined),
      ),
    );
  }

  return {
    sent: response.successCount,
    failed: response.failureCount,
  };
}
