/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";
import { NextRequest } from "next/server";

const mockAddDoc = jest.fn().mockResolvedValue({ id: "test-doc-id" });
const mockSendContactPush = jest.fn().mockResolvedValue({ sent: 1, failed: 0 });

jest.mock("@/lib/send-contact-push-notification", () => ({
  sendContactPushNotification: (...args: unknown[]) => mockSendContactPush(...args),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: (...args: unknown[]) => mockAddDoc(...args),
  serverTimestamp: () => "MOCK_TIMESTAMP",
}));

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: () => [],
  getApp: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function mockRecaptchaSuccess(score = 0.9) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true, score, action: "contact_submit" }),
  });
}

function mockRecaptchaFail(score = 0.2) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true, score, action: "contact_submit" }),
  });
}

const validBody = {
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Inc",
  message: "Hello, I have a project for you. Let's talk about it!",
  recaptchaToken: "valid-token",
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.RECAPTCHA_SECRET_KEY = "test-secret";
});

describe("POST /api/contact", () => {
  it("returns 400 if recaptchaToken is missing", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { recaptchaToken, ...body } = validBody;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/captcha/i);
  });

  it("returns 403 if reCAPTCHA score is too low", async () => {
    mockRecaptchaFail(0.2);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json.error).toMatch(/captcha/i);
  });

  it("returns 403 if reCAPTCHA action does not match", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, score: 0.9, action: "wrong_action" }),
    });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(403);
  });

  it("returns 400 if name is too short", async () => {
    mockRecaptchaSuccess();
    const res = await POST(makeRequest({ ...validBody, name: "A" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/name/i);
  });

  it("returns 400 if message is too short", async () => {
    mockRecaptchaSuccess();
    const res = await POST(makeRequest({ ...validBody, message: "Hi" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/message/i);
  });

  it("returns 200 and writes to Firestore on success", async () => {
    mockRecaptchaSuccess();
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockAddDoc).toHaveBeenCalledTimes(1);
    expect(mockAddDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        company: "Acme Inc",
        message: validBody.message,
        source: "portfolio",
        read: false,
      })
    );
    expect(mockSendContactPush).toHaveBeenCalledWith({
      messageId: "test-doc-id",
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Inc",
      preview: validBody.message,
    });
  });

  it("still returns 200 if push notification fails", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockRecaptchaSuccess();
    mockSendContactPush.mockRejectedValueOnce(new Error("FCM down"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    spy.mockRestore();
  });

  it("trims and lowercases email", async () => {
    mockRecaptchaSuccess();
    await POST(makeRequest({ ...validBody, email: "  USER@GMAIL.COM  " }));
    expect(mockAddDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ email: "user@gmail.com" })
    );
  });

  it("sets company to null if empty", async () => {
    mockRecaptchaSuccess();
    await POST(makeRequest({ ...validBody, company: "   " }));
    expect(mockAddDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ company: null })
    );
  });

  it("truncates fields to max length", async () => {
    mockRecaptchaSuccess();
    const longName = "A".repeat(200);
    await POST(makeRequest({ ...validBody, name: longName }));
    const savedDoc = mockAddDoc.mock.calls[0][1];
    expect(savedDoc.name.length).toBe(100);
  });

  it("returns 500 on Firestore error", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockRecaptchaSuccess();
    mockAddDoc.mockRejectedValueOnce(new Error("Firestore down"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    spy.mockRestore();
  });
});
