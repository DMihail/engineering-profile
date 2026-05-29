/**
 * @jest-environment node
 */
const mockSendMail = jest.fn().mockResolvedValue({ messageId: "msg-1" });

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: (...args: unknown[]) => mockSendMail(...args),
  })),
}));

import { sendReplyEmail } from "@/lib/send-reply-email";
import type { ContactMessageRecord } from "@/lib/contact-message";

const contact: ContactMessageRecord = {
  id: "msg-id",
  name: "Jane\r\nBcc: evil@example.com",
  email: "jane@example.com",
  company: null,
  message: "<script>alert('x')</script>",
  createdAt: new Date("2026-05-01T12:00:00Z"),
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.SMTP_HOST = "smtp.test";
  process.env.SMTP_USER = "user";
  process.env.SMTP_PASS = "pass";
  process.env.MAIL_FROM = "from@example.com";
});

describe("sendReplyEmail", () => {
  it("escapes HTML in reply body and quoted original", async () => {
    await sendReplyEmail({
      contact,
      replyBody: `<b>Hi</b>\n<script>alert(1)</script>`,
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    const mail = mockSendMail.mock.calls[0][0];
    expect(mail.html).toContain("&lt;b&gt;Hi&lt;/b&gt;");
    expect(mail.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(mail.html).toContain("&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;");
    expect(mail.html).not.toContain("<script>");
  });

  it("sanitizes subject header values", async () => {
    await sendReplyEmail({ contact, replyBody: "Thanks for reaching out." });

    const mail = mockSendMail.mock.calls[0][0];
    expect(mail.subject).toBe("Re: Message from Jane  Bcc: evil@example.com");
    expect(mail.subject).not.toMatch(/[\r\n]/);
  });
});
