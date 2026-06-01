/**
 * @jest-environment node
 */
import { POST, OPTIONS } from "@/app/api/inbox/test-push/route";
import { NextRequest } from "next/server";

const mockVerifyIdToken = jest.fn();
const mockSendTestPush = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: () => ({ verifyIdToken: mockVerifyIdToken }),
}));

jest.mock("@/lib/firebase-admin", () => ({
  getFirebaseAdminApp: () => ({}),
}));

jest.mock("@/lib/send-inbox-test-push", () => ({
  sendInboxTestPush: (...args: unknown[]) => mockSendTestPush(...args),
}));

function makeRequest(headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost:3000/api/inbox/test-push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173",
      Authorization: "Bearer valid-token",
      ...headers,
    },
    body: JSON.stringify({}),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "test-project";
  process.env.INBOX_APP_URL = "http://localhost:5173";
  mockVerifyIdToken.mockResolvedValue({ uid: "admin-uid", email: "me@example.com" });
  mockSendTestPush.mockResolvedValue({ sent: true });
});

describe("OPTIONS /api/inbox/test-push", () => {
  it("returns CORS headers for allowed origin", async () => {
    const res = await OPTIONS(
      new NextRequest("http://localhost:3000/api/inbox/test-push", {
        method: "OPTIONS",
        headers: { Origin: "http://localhost:5173" },
      }),
    );
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:5173");
  });
});

describe("POST /api/inbox/test-push", () => {
  it("returns 401 without token", async () => {
    const res = await POST(makeRequest({ Authorization: "" }));
    expect(res.status).toBe(401);
  });

  it("sends test push for authenticated user", async () => {
    const res = await POST(makeRequest());
    expect(res.status).toBe(200);
    expect(mockSendTestPush).toHaveBeenCalledWith("admin-uid");
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("returns 404 when user has no FCM token", async () => {
    mockSendTestPush.mockResolvedValueOnce({ sent: false, reason: "no-token" });
    const res = await POST(makeRequest());
    expect(res.status).toBe(404);
  });
});
