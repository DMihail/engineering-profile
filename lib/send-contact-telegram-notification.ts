import { SITE_URL } from "@/lib/config";
import { escapeHtml } from "@/lib/escape-html";

export interface ContactTelegramPayload {
  messageId: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
}

const MESSAGE_PREVIEW_MAX = 1200;
const TELEGRAM_TEXT_MAX = 3900;

export function isTelegramContactNotifyConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim(),
  );
}

function formatReceivedAt(): string {
  return new Date().toLocaleString("en-IE", {
    timeZone: "Europe/Dublin",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function truncateMessage(text: string, max = MESSAGE_PREVIEW_MAX): string {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (normalized.length <= max) return normalized;
  const omitted = normalized.length - max + 1;
  return `${normalized.slice(0, max - 1)}… (+${omitted} chars)`;
}

function buildReplyMailto(email: string, name: string): string {
  const subject = encodeURIComponent("Re: Your message on dzhezhelo.dev");
  const body = encodeURIComponent(
    `Hi ${name},\n\nThanks for reaching out via dzhezhelo.dev — I received your message and will get back to you within 24 hours.\n\n`,
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

function inboxDeepLink(messageId: string): string | null {
  const base = process.env.INBOX_APP_URL?.trim().replace(/\/$/, "");
  if (!base || !/^https?:\/\//i.test(base)) return null;
  return `${base}/?message=${encodeURIComponent(messageId)}`;
}

export function buildTelegramHtml(payload: ContactTelegramPayload): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const company = payload.company ? escapeHtml(payload.company) : null;
  const preview = escapeHtml(truncateMessage(payload.message));
  const messageId = escapeHtml(payload.messageId);
  const receivedAt = escapeHtml(formatReceivedAt());
  const siteHost = escapeHtml(SITE_URL.replace(/^https?:\/\//, ""));

  const replyHref = escapeHtml(buildReplyMailto(payload.email, payload.name));
  const inboxHref = inboxDeepLink(payload.messageId);
  const inboxLine = inboxHref
    ? `\n📥 <a href="${escapeHtml(inboxHref)}">Open in inbox</a>`
    : "";

  const blocks = [
    "━━━━━━━━━━━━━━━━━━━━",
    `🎯 <b>New portfolio lead</b>`,
    `🌐 <a href="${escapeHtml(SITE_URL)}">${siteHost}</a>`,
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    `<b>${name}</b>${company ? `\n🏢 ${company}` : ""}`,
    "",
    "✉️ <b>Email</b>",
    `<a href="${replyHref}">${email}</a>`,
    "",
    "💬 <b>Message</b>",
    `<pre>${preview}</pre>`,
    "",
    `↩️ <a href="${replyHref}"><b>Reply by email</b></a>${inboxLine}`,
    "",
    "────────────────────",
    `🕐 ${receivedAt} · Ireland`,
    `🔖 Ref <code>${messageId}</code>`,
  ];

  let text = blocks.join("\n");
  if (text.length > TELEGRAM_TEXT_MAX) {
    const shorterPreview = escapeHtml(truncateMessage(payload.message, 600));
    text = blocks
      .map((line) => (line.startsWith("<pre>") ? `<pre>${shorterPreview}</pre>` : line))
      .join("\n");
  }

  return text;
}

/** Sends a Telegram alert when bot token and chat id are configured. */
export async function sendContactTelegramNotification(
  payload: ContactTelegramPayload,
): Promise<boolean> {
  if (!isTelegramContactNotifyConfigured()) {
    return false;
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN!.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID!.trim();

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramHtml(payload),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Telegram API ${response.status}: ${detail.slice(0, 200)}`);
  }

  return true;
}
