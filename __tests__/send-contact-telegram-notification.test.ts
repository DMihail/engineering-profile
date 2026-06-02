import {
  buildTelegramHtml,
  isTelegramContactNotifyConfigured,
  sendContactTelegramNotification,
} from "@/lib/send-contact-telegram-notification";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const payload = {
  messageId: "msg-abc",
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc",
  message: "Hello there",
};

describe("sendContactTelegramNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    delete process.env.INBOX_APP_URL;
  });

  it("reports not configured when env vars are missing", () => {
    expect(isTelegramContactNotifyConfigured()).toBe(false);
  });

  it("escapes HTML in user fields", () => {
    const html = buildTelegramHtml({
      ...payload,
      name: "A & B <script>",
      message: 'Say "hi"',
    });

    expect(html).toContain("A &amp; B &lt;script&gt;");
    expect(html).toContain("Say &quot;hi&quot;");
    expect(html).not.toContain("<script>");
  });

  it("omits company block when company is null", () => {
    const html = buildTelegramHtml({ ...payload, company: null });
    expect(html).not.toContain("🏢");
  });

  it("includes lead header, reply link, and message ref", () => {
    const html = buildTelegramHtml(payload);

    expect(html).toContain("New portfolio lead");
    expect(html).toContain("dzhezhelo.dev");
    expect(html).toContain("Reply by email");
    expect(html).toContain('href="mailto:john@example.com');
    expect(html).toContain("<pre>Hello there</pre>");
    expect(html).toContain("<code>msg-abc</code>");
    expect(html).toContain("Ireland");
  });

  it("adds inbox deep link when INBOX_APP_URL is set", () => {
    process.env.INBOX_APP_URL = "https://inbox.example.com/";
    const html = buildTelegramHtml(payload);

    expect(html).toContain("Open in inbox");
    expect(html).toContain("https://inbox.example.com/?message=msg-abc");
  });

  it("truncates very long messages", () => {
    const html = buildTelegramHtml({
      ...payload,
      message: "x".repeat(2000),
    });

    expect(html).toContain("(+");
    expect(html).toContain("chars)");
  });

  it("returns false without calling Telegram when not configured", async () => {
    const sent = await sendContactTelegramNotification(payload);
    expect(sent).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("sends HTML message to Telegram API when configured", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "123:ABC";
    process.env.TELEGRAM_CHAT_ID = "999";

    mockFetch.mockResolvedValueOnce({ ok: true });

    const sent = await sendContactTelegramNotification(payload);

    expect(sent).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bot123:ABC/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"parse_mode":"HTML"'),
      }),
    );

    const body = JSON.parse(String(mockFetch.mock.calls[0][1].body));
    expect(body.chat_id).toBe("999");
    expect(body.text).toContain("john@example.com");
    expect(body.text).toContain("msg-abc");
  });

  it("throws when Telegram API returns an error", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "123:ABC";
    process.env.TELEGRAM_CHAT_ID = "999";

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    });

    await expect(sendContactTelegramNotification(payload)).rejects.toThrow(/Telegram API 400/);
  });
});
