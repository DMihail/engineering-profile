/** Shared allowlist for inbox auth and contact → FCM fan-out. */

function parseInboxAllowedUids(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getInboxAllowedUids(): string[] {
  return parseInboxAllowedUids(process.env.INBOX_ALLOWED_UIDS);
}
