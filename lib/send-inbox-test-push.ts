import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

export interface InboxTestPushResult {
  sent: boolean;
  reason?: "no-admin" | "no-token";
}

/** Sends a data-only FCM test message to the signed-in operator's device token. */
export async function sendInboxTestPush(uid: string): Promise<InboxTestPushResult> {
  const app = getFirebaseAdminApp();
  if (!app) {
    return { sent: false, reason: "no-admin" };
  }

  const tokenSnap = await getFirestore(app).collection("fcmTokens").doc(uid).get();
  const token = typeof tokenSnap.data()?.token === "string" ? tokenSnap.data()!.token : "";
  if (!token) {
    return { sent: false, reason: "no-token" };
  }

  const inboxUrl = process.env.INBOX_APP_URL?.trim() || "/";
  const messaging = getMessaging(app);

  try {
    await messaging.send({
      token,
      data: {
        title: "Test notification",
        body: "Developer Inbox — server push works.",
        messageId: "test",
        url: inboxUrl,
        preview: "If you see this, FCM delivery from the API works.",
        senderName: "Test",
        senderEmail: "test@example.com",
      },
      webpush: {
        headers: { Urgency: "high" },
        fcmOptions: { link: inboxUrl },
      },
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: string }).code)
        : "";
    if (
      code === "messaging/registration-token-not-registered" ||
      code === "messaging/invalid-registration-token"
    ) {
      await getFirestore(app).collection("fcmTokens").doc(uid).delete().catch(() => undefined);
      return { sent: false, reason: "no-token" };
    }
    throw error;
  }

  return { sent: true };
}
