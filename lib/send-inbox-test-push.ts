import { getFirebaseAdminApp } from "@/lib/firebase-admin";
import {
  dedupeFcmRegistrationsByToken,
  listFcmDeviceRegistrations,
  pruneStaleFcmDeviceRegistrations,
} from "@/lib/fcm-tokens";
import { resolveInboxAppUrl } from "@/lib/inbox-app-url";
import { getMessaging } from "firebase-admin/messaging";

export interface InboxTestPushResult {
  sent: boolean;
  deviceCount?: number;
  successCount?: number;
  reason?: "no-admin" | "no-token";
}

/** Sends a data-only FCM test message to every device registered for this operator. */
export async function sendInboxTestPush(uid: string): Promise<InboxTestPushResult> {
  const app = getFirebaseAdminApp();
  if (!app) {
    return { sent: false, reason: "no-admin" };
  }

  const registrations = dedupeFcmRegistrationsByToken(
    await listFcmDeviceRegistrations(uid, app),
  );
  if (registrations.length === 0) {
    return { sent: false, reason: "no-token" };
  }

  const inboxUrl = resolveInboxAppUrl();
  const hasAbsoluteInboxUrl = /^https?:\/\//i.test(inboxUrl);
  const messaging = getMessaging(app);

  const title = "Test notification";
  const body = "Developer Inbox — server push works.";

  const payload = {
    data: {
      title,
      body,
      messageId: "test",
      url: hasAbsoluteInboxUrl ? inboxUrl : "/",
      preview: "If you see this, FCM delivery from the API works.",
      senderName: "Test",
      senderEmail: "test@example.com",
    },
    webpush: {
      headers: { Urgency: "high" as const },
      ...(hasAbsoluteInboxUrl ? { fcmOptions: { link: inboxUrl } } : {}),
    },
    android: { priority: "high" as const },
  };

  const response = await messaging.sendEachForMulticast({
    tokens: registrations.map((r) => r.token),
    ...payload,
  });

  await pruneStaleFcmDeviceRegistrations(registrations, response.responses, app);

  if (response.successCount === 0) {
    return {
      sent: false,
      reason: "no-token",
      deviceCount: registrations.length,
      successCount: 0,
    };
  }

  return {
    sent: true,
    deviceCount: registrations.length,
    successCount: response.successCount,
  };
}
