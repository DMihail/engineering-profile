import type { MulticastMessage } from "firebase-admin/messaging";

export interface InboxFcmDataInput {
  title: string;
  body: string;
  messageId: string;
  preview: string;
  senderName: string;
  senderEmail: string;
}

/** Payload for `sendEachForMulticast` excluding `tokens` (FCM requires string values in `data`). */
export type InboxFcmMulticastPayload = Omit<MulticastMessage, "tokens">;

/** Data-only FCM fields shared by contact + test push (no `webpush.notification` — it breaks iOS SW). */
export function buildInboxFcmMulticastFields(
  inboxUrl: string,
  fields: InboxFcmDataInput,
): InboxFcmMulticastPayload {
  const hasAbsoluteInboxUrl = /^https?:\/\//i.test(inboxUrl);
  const url = hasAbsoluteInboxUrl ? inboxUrl.replace(/\/$/, "") : "/";

  const data: Record<string, string> = {
    title: fields.title,
    body: fields.body,
    messageId: fields.messageId,
    preview: fields.preview,
    senderName: fields.senderName,
    senderEmail: fields.senderEmail,
    url,
  };

  return {
    data,
    webpush: {
      headers: { Urgency: "high" },
      ...(hasAbsoluteInboxUrl ? { fcmOptions: { link: url } } : {}),
    },
    android: { priority: "high" },
    apns: {
      headers: { "apns-priority": "10" },
      payload: {
        aps: {
          alert: { title: fields.title, body: fields.body },
          sound: "default",
        },
      },
    },
  };
}
