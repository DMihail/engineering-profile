import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONTACT_REGION_COOKIE, type ContactRegion } from "@/lib/contact-region";
import { isLegacyIndexPage } from "@/lib/legacy-index-page";
import { PAGE_SECTION_IDS } from "@/lib/section-ids";
import { applySecurityHeaders, createCspNonce, CSP_NONCE_HEADER } from "@/lib/security-headers";

function contactRegionFromRequest(request: NextRequest): ContactRegion {
  const country =
    request.headers.get("x-vercel-ip-country")
    ?? request.headers.get("cf-ipcountry")
    ?? "";
  return country.toUpperCase() === "UA" ? "ua" : "intl";
}

function finalizeResponse(request: NextRequest, response: NextResponse, nonce: string): NextResponse {
  applySecurityHeaders(response, nonce);
  const region = contactRegionFromRequest(request);
  response.cookies.set(CONTACT_REGION_COOKIE, region, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

function forward(request: NextRequest, pathname: string): NextResponse {
  const nonce = createCspNonce();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set(CSP_NONCE_HEADER, nonce);
  return finalizeResponse(
    request,
    NextResponse.next({ request: { headers: requestHeaders } }),
    nonce,
  );
}

const HOME = "/";

const ALLOWED_EXACT = new Set([
  "/",
  "/resume",
  "/privacy",
  "/favicon.ico",
  "/icon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

const ALLOWED_PREFIXES = ["/api/", "/_next/"];
const ALLOWED_STARTS = ["/opengraph-image", "/apple-icon", "/profile-image"];

const SECTION_IDS = new Set<string>(PAGE_SECTION_IDS);

function isAllowed(pathname: string): boolean {
  if (ALLOWED_EXACT.has(pathname)) return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (ALLOWED_STARTS.some((prefix) => pathname.startsWith(prefix))) return true;
  return /\.[a-z0-9]+$/i.test(pathname);
}

function redirectHome(request: NextRequest): NextResponse {
  const nonce = createCspNonce();
  return finalizeResponse(
    request,
    NextResponse.redirect(new URL(HOME, request.url), 308),
    nonce,
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isLegacyIndexPage(pathname)) {
    return redirectHome(request);
  }

  if (isAllowed(pathname)) {
    return forward(request, pathname);
  }

  const segment = pathname.replace(/^\/+|\/+$/g, "").split("/")[0]?.toLowerCase();
  const isSingleSegment = /^\/[^/]+\/?$/.test(pathname);

  if (isSingleSegment && segment && SECTION_IDS.has(segment)) {
    const redirectUrl = new URL(HOME, request.url);
    redirectUrl.hash = segment;
    return finalizeResponse(request, NextResponse.redirect(redirectUrl, 308), createCspNonce());
  }

  return forward(request, pathname);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
