/** Mask FCM token for server logs (first/last chars only). */
export function maskFcmTokenForLog(token: string): string {
  const trimmed = token.trim();
  if (!trimmed) return "(empty)";
  if (trimmed.length <= 12) return "***";
  return `${trimmed.slice(0, 8)}…${trimmed.slice(-6)}`;
}

export function logFcmSendTarget(
  context: string,
  target: { platform?: string; deviceId: string; token: string },
  messageId: string,
): void {
  console.info(
    `[fcm] ${context} SENDING messageId=${messageId} → ${target.platform ?? "?"}:${target.deviceId} token=${maskFcmTokenForLog(target.token)}`,
  );
}
