import { escapeHtml } from "@/lib/escape-html";

export interface ContactTelegramPayload {
  messageId: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
}

export function isTelegramContactNotifyConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHAT_ID?.trim(),
  );
}

function buildTelegramHtml(payload: ContactTelegramPayload): string {
  const lines = [
    "📬 <b>New contact form message</b>",
    `👤 <b>Name:</b> ${escapeHtml(payload.name)}`,
    `✉️ <b>Email:</b> ${escapeHtml(payload.email)}`,
  ];

  if (payload.company) {
    lines.push(`🏢 <b>Company:</b> ${escapeHtml(payload.company)}`);
  }

  lines.push(`📝 <b>Message:</b>\n${escapeHtml(payload.message)}`);
  lines.push(`\n<i>ID: ${escapeHtml(payload.messageId)}</i>`);

  return lines.join("\n");
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

export { buildTelegramHtml };
