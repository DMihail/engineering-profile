/**
 * @jest-environment node
 */
import { POST, OPTIONS } from "@/app/api/inbox/reply/route";
import { NextRequest } from "next/server";

const mockVerifyIdToken = jest.fn();
const mockGetMessage = jest.fn();
const mockMarkReplied = jest.fn();
const mockSendReplyEmail = jest.fn();
const mockIsMailConfigured = jest.fn(() => true);

jest.mock("firebase-admin/auth", () => ({
  getAuth: () => ({ verifyIdToken: mockVerifyIdToken }),
}));

jest.mock("@/lib/firebase-admin", () => ({
  getFirebaseAdminApp: () => ({}),
}));

jest.mock("@/lib/contact-message", () => ({
  getContactMessageById: (...args: unknown[]) => mockGetMessage(...args),
  markContactMessageReplied: (...args: unknown[]) => mockMarkReplied(...args),
}));

jest.mock("@/lib/send-reply-email", () => ({
  isMailConfigured: () => mockIsMailConfigured(),
  sendReplyEmail: (...args: unknown[]) => mockSendReplyEmail(...args),
  MAX_REPLY_BODY: 10000,
}));

function makeRequest(
  body: Record<string, unknown>,
  headers: Record<string, string> = {},
) {
  return new NextRequest("http://localhost:3000/api/inbox/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173",
      Authorization: "Bearer valid-token",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const contact = {
  id: "msg-1",
  name: "Jane",
  email: "jane@example.com",
  company: "Acme",
  message: "Hello there, I need help with a project.",
  createdAt: new Date("2026-01-01T12:00:00Z"),
};

beforeEach(() => {
  jest.clearAllMocks();
  mockIsMailConfigured.mockReturnValue(true);
  delete process.env.INBOX_ALLOWED_UIDS;
  process.env.INBOX_APP_URL = "http://localhost:5173";
  mockVerifyIdToken.mockResolvedValue({ uid: "admin-uid", email: "me@example.com" });
  mockGetMessage.mockResolvedValue(contact);
  mockSendReplyEmail.mockResolvedValue({ messageId: "<smtp-id>" });
  mockMarkReplied.mockResolvedValue(undefined);
});

describe("OPTIONS /api/inbox/reply", () => {
  it("returns CORS headers for allowed origin", async () => {
    const res = await OPTIONS(
      new NextRequest("http://localhost:3000/api/inbox/reply", {
        method: "OPTIONS",
        headers: { Origin: "http://localhost:5173" },
      }),
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:5173");
  });
});

describe("POST /api/inbox/reply", () => {
  it("returns 401 without token", async () => {
    const res = await POST(
      makeRequest({ messageId: "msg-1", body: "Thanks for reaching out!" }, {
        Authorization: "",
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 when message missing", async () => {
    mockGetMessage.mockResolvedValueOnce(null);
    const res = await POST(makeRequest({ messageId: "missing", body: "Hi" }));
    expect(res.status).toBe(404);
  });

  it("sends email and marks message replied", async () => {
    const res = await POST(
      makeRequest({ messageId: "msg-1", body: "Thanks, let's schedule a call." }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockSendReplyEmail).toHaveBeenCalledWith({
      contact,
      replyBody: "Thanks, let's schedule a call.",
    });
    expect(mockMarkReplied).toHaveBeenCalledWith("msg-1", {
      repliedByUid: "admin-uid",
      replyPreview: "Thanks, let's schedule a call.",
    });
  });

  it("returns 403 for disallowed uid", async () => {
    process.env.INBOX_ALLOWED_UIDS = "other-uid";
    mockVerifyIdToken.mockResolvedValueOnce({ uid: "admin-uid", email: "me@example.com" });
    const res = await POST(makeRequest({ messageId: "msg-1", body: "Thanks!" }));
    expect(res.status).toBe(403);
    expect(mockSendReplyEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when mail is not configured", async () => {
    mockIsMailConfigured.mockReturnValueOnce(false);
    const res = await POST(makeRequest({ messageId: "msg-1", body: "Thanks!" }));
    expect(res.status).toBe(503);
    expect(mockSendReplyEmail).not.toHaveBeenCalled();
  });
});
