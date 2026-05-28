import { getApps, initializeApp, cert, type App } from "firebase-admin/app";

type ServiceAccountJson = {
  project_id: string;
  client_email: string;
  private_key: string;
};

/** Normalizes PEM from .env / Vercel (escaped \\n, one-line paste, stray quotes). */
export function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;

  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }

  key = key.replace(/\\n/g, "\n");

  const begin = "-----BEGIN PRIVATE KEY-----";
  const end = "-----END PRIVATE KEY-----";

  if (process.env.FIREBASE_PRIVATE_KEY_BASE64?.trim()) {
    try {
      key = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64.trim(), "base64").toString(
        "utf8",
      );
    } catch {
      console.error("[firebase-admin] FIREBASE_PRIVATE_KEY_BASE64 is invalid");
    }
  }

  if (!key.includes(begin) || !key.includes(end)) {
    if (key === begin || key.startsWith(begin) && !key.includes(end)) {
      console.error(
        "[firebase-admin] FIREBASE_PRIVATE_KEY looks truncated — use one line with \\n or FIREBASE_PRIVATE_KEY_BASE64",
      );
    }
    return key;
  }

  // Strip indentation/spaces from multiline .env paste
  const inner = key
    .replace(begin, "")
    .replace(end, "")
    .replace(/\s/g, "");
  if (inner.length > 0) {
    const lines = inner.match(/.{1,64}/g) ?? [];
    key = `${begin}\n${lines.join("\n")}\n${end}\n`;
  }

  return key;
}

function parseServiceAccount(): ServiceAccountJson | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ServiceAccountJson;
      const privateKey = normalizePrivateKey(parsed.private_key);
      if (parsed.project_id && parsed.client_email && privateKey) {
        return { ...parsed, private_key: privateKey };
      }
    } catch {
      console.error("[firebase-admin] FIREBASE_SERVICE_ACCOUNT_JSON is invalid JSON");
    }
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (projectId && clientEmail && privateKey) {
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  return null;
}

export function getFirebaseAdminApp(): App | null {
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0]!;
  }

  const serviceAccount = parseServiceAccount();
  if (!serviceAccount) {
    return null;
  }

  return initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });
}

export function isFirebaseAdminConfigured(): boolean {
  return parseServiceAccount() !== null;
}
