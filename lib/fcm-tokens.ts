import type { App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export interface FcmDeviceRegistration {
  uid: string;
  deviceId: string;
  token: string;
  platform?: string;
}

const STALE_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

function firestore(app?: App): Firestore {
  return app ? getFirestore(app) : getFirestore();
}

/** Device tokens for one operator (`fcmTokens/{uid}/devices/*`). */
export async function listFcmDeviceRegistrations(
  uid: string,
  app?: App,
): Promise<FcmDeviceRegistration[]> {
  const db = firestore(app);
  const devicesSnap = await db.collection("fcmTokens").doc(uid).collection("devices").get();

  const registrations: FcmDeviceRegistration[] = [];
  devicesSnap.forEach((doc) => {
    const data = doc.data();
    const token = typeof data.token === "string" ? data.token : "";
    if (token) {
      registrations.push({
        uid,
        deviceId: doc.id,
        token,
        platform: typeof data.platform === "string" ? data.platform : undefined,
      });
    }
  });

  return registrations;
}

/** Every registered device for all operators (contact form → inbox push). */
export async function listAllFcmDeviceRegistrations(app?: App): Promise<FcmDeviceRegistration[]> {
  const db = firestore(app);
  const all: FcmDeviceRegistration[] = [];

  // Subcollection docs do not create `fcmTokens/{uid}` parent docs — use collection group.
  const deviceSnap = await db.collectionGroup("devices").get();
  deviceSnap.forEach((deviceDoc) => {
    const uid = deviceDoc.ref.parent.parent?.id;
    if (!uid) return;

    const token = typeof deviceDoc.data().token === "string" ? deviceDoc.data().token : "";
    if (!token) return;

    const data = deviceDoc.data();
    all.push({
      uid,
      deviceId: deviceDoc.id,
      token,
      platform: typeof data.platform === "string" ? data.platform : undefined,
    });
  });

  return all;
}

/** One multicast entry per FCM token (duplicate device docs break sendEach response indexing). */
export function dedupeFcmRegistrationsByToken(
  registrations: FcmDeviceRegistration[],
): FcmDeviceRegistration[] {
  const byToken = new Map<string, FcmDeviceRegistration>();
  for (const reg of registrations) {
    if (!reg.token) continue;
    byToken.set(reg.token, reg);
  }
  return [...byToken.values()];
}

export async function pruneStaleFcmDeviceRegistrations(
  registrations: FcmDeviceRegistration[],
  responses: { success: boolean; error?: { code?: string } }[],
  app?: App,
): Promise<void> {
  const db = firestore(app);

  await Promise.all(
    responses.map(async (result, index) => {
      if (result.success) return;

      const code = result.error?.code;
      if (!code || !STALE_TOKEN_CODES.has(code)) return;

      const reg = registrations[index];
      if (!reg) return;

      await db
        .collection("fcmTokens")
        .doc(reg.uid)
        .collection("devices")
        .doc(reg.deviceId)
        .delete()
        .catch(() => undefined);

      console.info(
        `[fcm] Removed stale device registration ${reg.platform ?? "?"}:${reg.deviceId} (${code})`,
      );
    }),
  );
}
