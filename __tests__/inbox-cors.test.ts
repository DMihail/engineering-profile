/**
 * @jest-environment node
 */
import { NextRequest, NextResponse } from "next/server";
import { inboxCorsHeaders, inboxOptionsResponse, withInboxCors } from "@/lib/inbox-cors";
import { withNodeEnv } from "./helpers/with-node-env";

describe("inbox-cors", () => {
  beforeEach(() => {
    process.env.INBOX_APP_URL = "https://inbox.example.com";
  });

  afterEach(() => {
    delete process.env.INBOX_APP_URL;
  });

  it("allows the configured inbox origin", () => {
    const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
      headers: { Origin: "https://inbox.example.com" },
    });
    expect(inboxCorsHeaders(request)).toMatchObject({
      "Access-Control-Allow-Origin": "https://inbox.example.com",
    });
  });

  it("rejects unknown origins", () => {
    const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
      headers: { Origin: "https://evil.example" },
    });
    expect(inboxCorsHeaders(request)).toEqual({});
  });

  it("allows localhost inbox origins outside production", () => {
    withNodeEnv("test", () => {
      const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
        headers: { Origin: "http://localhost:5173" },
      });
      expect(inboxCorsHeaders(request)).toMatchObject({
        "Access-Control-Allow-Origin": "http://localhost:5173",
      });
    });
  });

  it("blocks localhost inbox origins in production", () => {
    withNodeEnv("production", () => {
      const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
        headers: { Origin: "http://localhost:5173" },
      });
      expect(inboxCorsHeaders(request)).toEqual({});
    });
  });

  it("copies CORS headers onto JSON responses", () => {
    const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
      headers: { Origin: "https://inbox.example.com" },
    });
    const response = withInboxCors(
      request,
      NextResponse.json({ ok: true }, { status: 200 }),
    );
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://inbox.example.com",
    );
  });

  it("returns OPTIONS preflight for allowed origins", () => {
    const request = new NextRequest("http://localhost:3000/api/inbox/reply", {
      method: "OPTIONS",
      headers: { Origin: "https://inbox.example.com" },
    });
    const response = inboxOptionsResponse(request);
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });
});
