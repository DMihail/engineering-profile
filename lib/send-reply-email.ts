import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { ContactMessageRecord } from "@/lib/contact-message";
import { escapeHtml, sanitizeEmailHeaderValue } from "@/lib/escape-html";

const MAX_REPLY_BODY = 10_000;

export interface SendReplyEmailInput {
  contact: ContactMessageRecord;
  replyBody: string;
}

export interface SendReplyEmailResult {
  messageId: string;
}

let transporter: Transporter | null | undefined;

function getMailTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;

  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.MAIL_FROM?.trim();

  if (!host || !user || !pass || !from) {
    transporter = null;
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true";

  transporter = nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 587,
    secure,
    auth: { user, pass },
  });

  return transporter;
}

export function isMailConfigured(): boolean {
  return getMailTransporter() !== null;
}

function formatQuotedOriginal(contact: ContactMessageRecord): string {
  const date = contact.createdAt
    ? contact.createdAt.toLocaleString("en-IE", { dateStyle: "medium", timeStyle: "short" })
    : "earlier";
  const lines = contact.message.split(/\r?\n/).map((line) => `> ${line}`);
  return `On ${date}, ${contact.name} wrote:\n${lines.join("\n")}`;
}

function buildSubject(contact: ContactMessageRecord): string {
  return `Re: Message from ${sanitizeEmailHeaderValue(contact.name)}`;
}

function buildReplyHtml(trimmed: string, contact: ContactMessageRecord): string {
  const bodyHtml = escapeHtml(trimmed).replace(/\n/g, "<br>");
  const quotedHtml = escapeHtml(formatQuotedOriginal(contact));
  return `<p>${bodyHtml}</p><hr><pre style="white-space:pre-wrap;color:#666">${quotedHtml}</pre>`;
}

export async function sendReplyEmail({
  contact,
  replyBody,
}: SendReplyEmailInput): Promise<SendReplyEmailResult> {
  const trimmed = replyBody.trim().slice(0, MAX_REPLY_BODY);
  if (trimmed.length < 2) {
    throw new Error("Reply is too short");
  }

  const transport = getMailTransporter();
  if (!transport) {
    throw new Error("SMTP is not configured");
  }

  const from = process.env.MAIL_FROM!.trim();
  const fromName = process.env.MAIL_FROM_NAME?.trim() || "Mykhailo Dzhezhelo";
  const replyTo = process.env.MAIL_REPLY_TO?.trim() || from;

  const text = `${trimmed}\n\n--\n${formatQuotedOriginal(contact)}`;
  const html = buildReplyHtml(trimmed, contact);

  const info = await transport.sendMail({
    from: `"${fromName}" <${from}>`,
    to: contact.email,
    replyTo,
    subject: buildSubject(contact),
    text,
    html,
    headers: {
      "X-Contact-Message-Id": contact.id,
    },
  });

  return { messageId: info.messageId };
}

export { MAX_REPLY_BODY };
