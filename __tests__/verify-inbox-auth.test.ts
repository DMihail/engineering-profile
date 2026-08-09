/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { verifyInboxAuth } from "@/lib/verify-inbox-auth";
import { withNodeEnvAsync } from "./helpers/with-node-env";

const mockVerifyIdToken = jest.fn();

jest.mock("firebase-admin/auth", () => ({
  getAuth: () => ({ verifyIdToken: mockVerifyIdToken }),
}));

jest.mock("@/lib/firebase-admin", () => ({
  getFirebaseAdminApp: () => ({}),
}));

function makeRequest(auth = "Bearer valid-token") {
  return new NextRequest("http://localhost:3000/api/inbox/reply", {
    method: "POST",
    headers: {
      Authorization: auth,
      Origin: "http://localhost:5173",
    },
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  delete process.env.INBOX_ALLOWED_UIDS;
  process.env.INBOX_APP_URL = "http://localhost:5173";
  mockVerifyIdToken.mockResolvedValue({ uid: "admin-uid", email: "me@example.com" });
});

describe("verifyInboxAuth", () => {
  it("allows any verified uid when allowlist is empty outside production", async () => {
    const result = await verifyInboxAuth(makeRequest());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.uid).toBe("admin-uid");
  });

  it("requires allowlist in production", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    const result = await withNodeEnvAsync("production", () => verifyInboxAuth(makeRequest()));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(503);
    }
    spy.mockRestore();
  });

  it("enforces allowlist when configured", async () => {
    process.env.INBOX_ALLOWED_UIDS = "other-uid";
    const result = await verifyInboxAuth(makeRequest());
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(403);
    }
  });

  it("allows listed uid", async () => {
    process.env.INBOX_ALLOWED_UIDS = "admin-uid, other-uid";
    const result = await verifyInboxAuth(makeRequest());
    expect(result.ok).toBe(true);
  });
});
