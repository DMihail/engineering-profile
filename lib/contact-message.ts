import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "@/lib/firebase-admin";

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  createdAt: Date | null;
  source?: string;
}

export async function getContactMessageById(
  messageId: string,
): Promise<ContactMessageRecord | null> {
  const app = getFirebaseAdminApp();
  if (!app) return null;

  const snap = await getFirestore(app).collection("messages").doc(messageId).get();
  if (!snap.exists) return null;

  const data = snap.data();
  if (!data) return null;

  const name = typeof data.name === "string" ? data.name : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const message = typeof data.message === "string" ? data.message : "";
  if (!name || !email || !message) return null;

  const createdAt =
    data.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;

  return {
    id: snap.id,
    name,
    email,
    company: typeof data.company === "string" ? data.company : null,
    message,
    createdAt,
    source: typeof data.source === "string" ? data.source : undefined,
  };
}

export async function markContactMessageReplied(
  messageId: string,
  meta: { repliedByUid: string; replyPreview: string },
): Promise<void> {
  const app = getFirebaseAdminApp();
  if (!app) return;

  await getFirestore(app)
    .collection("messages")
    .doc(messageId)
    .update({
      read: true,
      repliedAt: Timestamp.now(),
      lastReplyPreview: meta.replyPreview.slice(0, 500),
      lastReplyByUid: meta.repliedByUid,
    });
}
