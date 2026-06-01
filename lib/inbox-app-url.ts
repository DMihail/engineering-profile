/** Absolute inbox PWA URL for FCM `data.url` / webpush link (required for iOS/Android). */
export function resolveInboxAppUrl(): string {
  const raw = process.env.INBOX_APP_URL?.trim() ?? "";
  if (raw && /^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }

  if (raw) {
    console.warn(
      "[push] INBOX_APP_URL must be absolute (https://…). Got:",
      raw,
    );
  } else {
    console.warn(
      "[push] INBOX_APP_URL is not set — notifications may not open the inbox app on mobile.",
    );
  }

  return raw || "/";
}
