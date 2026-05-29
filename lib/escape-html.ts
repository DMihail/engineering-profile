const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text for safe insertion into HTML content. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE[char] ?? char);
}

/** Strip control chars that could break email headers (CRLF injection). */
export function sanitizeEmailHeaderValue(value: string): string {
  return value.replace(/[\0\r\n]/g, " ").trim();
}
