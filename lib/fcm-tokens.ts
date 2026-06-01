import type { App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

export interface FcmDeviceRegistration {
  uid: string;
  deviceId: string;
  token: string;
}

const STALE_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

function firestore(app?: App): Firestore {
  return app ? getFirestore(app) : getFirestore();
}

/** All device tokens for one operator (`fcmTokens/{uid}/devices/*`), with legacy doc fallback. */
export async function listFcmDeviceRegistrations(
  uid: string,
  app?: App,
): Promise<FcmDeviceRegistration[]> {
  const db = firestore(app);
  const devicesSnap = await db.collection("fcmTokens").doc(uid).collection("devices").get();

  const registrations: FcmDeviceRegistration[] = [];
  devicesSnap.forEach((doc) => {
    const token = typeof doc.data().token === "string" ? doc.data().token : "";
    if (token) {
      registrations.push({ uid, deviceId: doc.id, token });
    }
  });

  if (registrations.length > 0) {
    return registrations;
  }

  const legacySnap = await db.collection("fcmTokens").doc(uid).get();
  const legacyToken =
    typeof legacySnap.data()?.token === "string" ? legacySnap.data()!.token : "";
  if (legacyToken) {
    return [{ uid, deviceId: "__legacy__", token: legacyToken }];
  }

  return [];
}

export async function listFcmTokensForUser(uid: string, app?: App): Promise<string[]> {
  const registrations = await listFcmDeviceRegistrations(uid, app);
  return [...new Set(registrations.map((r) => r.token))];
}

/** Every registered device for all operators (contact form → inbox push). */
export async function listAllFcmDeviceRegistrations(app?: App): Promise<FcmDeviceRegistration[]> {
  const db = firestore(app);
  const all: FcmDeviceRegistration[] = [];
  const uidsFromDevices = new Set<string>();

  // Subcollection docs do not create `fcmTokens/{uid}` parent docs — use collection group.
  const deviceSnap = await db.collectionGroup("devices").get();
  deviceSnap.forEach((deviceDoc) => {
    const uid = deviceDoc.ref.parent.parent?.id;
    if (!uid) return;

    const token = typeof deviceDoc.data().token === "string" ? deviceDoc.data().token : "";
    if (!token) return;

    uidsFromDevices.add(uid);
    all.push({ uid, deviceId: deviceDoc.id, token });
  });

  const userSnaps = await db.collection("fcmTokens").get();
  for (const userDoc of userSnaps.docs) {
    if (uidsFromDevices.has(userDoc.id)) continue;

    const legacyToken =
      typeof userDoc.data().token === "string" ? userDoc.data().token : "";
    if (legacyToken) {
      all.push({ uid: userDoc.id, deviceId: "__legacy__", token: legacyToken });
    }
  }

  return all;
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

      if (reg.deviceId === "__legacy__") {
        await db.collection("fcmTokens").doc(reg.uid).delete().catch(() => undefined);
        return;
      }

      await db
        .collection("fcmTokens")
        .doc(reg.uid)
        .collection("devices")
        .doc(reg.deviceId)
        .delete()
        .catch(() => undefined);
    }),
  );
}
