import { NextRequest, NextResponse } from "next/server";

const ALLOW_HEADERS = "Authorization, Content-Type";

function allowedOrigins(): Set<string> {
  const origins = new Set<string>();
  const inbox = process.env.INBOX_APP_URL?.trim().replace(/\/$/, "");
  if (inbox) origins.add(inbox);
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:5173");
    origins.add("http://127.0.0.1:5173");
  }
  return origins;
}

export function inboxCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins().has(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": ALLOW_HEADERS,
    "Vary": "Origin",
  };
}

export function withInboxCors(request: NextRequest, response: NextResponse): NextResponse {
  const cors = inboxCorsHeaders(request);
  for (const [key, value] of Object.entries(cors)) {
    response.headers.set(key, value);
  }
  return response;
}

export function inboxOptionsResponse(request: NextRequest): NextResponse {
  const origin = request.headers.get("origin");
  const allowed = allowedOrigins();
  if (!origin || !allowed.has(origin)) {
    return new NextResponse(null, { status: 204 });
  }
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": ALLOW_HEADERS,
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}
