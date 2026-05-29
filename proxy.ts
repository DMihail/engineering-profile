import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONTACT_REGION_COOKIE, type ContactRegion } from "@/lib/contact-region";

function contactRegionFromRequest(request: NextRequest): ContactRegion {
  const country =
    request.headers.get("x-vercel-ip-country")
    ?? request.headers.get("cf-ipcountry")
    ?? "";
  return country.toUpperCase() === "UA" ? "ua" : "intl";
}

function withContactRegionCookie(request: NextRequest, response: NextResponse): NextResponse {
  const region = contactRegionFromRequest(request);
  response.cookies.set(CONTACT_REGION_COOKIE, region, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

const HOME = "/";

/** Legacy index URLs → canonical home (Yandex / Google sitemap checks). */
const INDEX_ALIASES = new Set([
  "/index.html",
  "/index.htm",
  "/index.php",
  "/index.asp",
  "/default.html",
  "/default.htm",
  "/home.html",
  "/home.htm",
]);

const ALLOWED_EXACT = new Set([
  "/",
  "/favicon.ico",
  "/icon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

const ALLOWED_PREFIXES = ["/api/", "/_next/"];
const ALLOWED_STARTS = ["/opengraph-image", "/apple-icon", "/profile-image"];

/** Section ids on the home page — optional redirect to /#section */
const SECTION_IDS = new Set([
  "hero",
  "impact",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
]);

function isIndexAlias(pathname: string): boolean {
  return INDEX_ALIASES.has(pathname.toLowerCase());
}

function isAllowed(pathname: string): boolean {
  if (isIndexAlias(pathname)) return false;
  if (ALLOWED_EXACT.has(pathname)) return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (ALLOWED_STARTS.some((prefix) => pathname.startsWith(prefix))) return true;
  // Public files (CV PDFs, etc.)
  return /\.[a-z0-9]+$/i.test(pathname);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isIndexAlias(pathname)) {
    return withContactRegionCookie(
      request,
      NextResponse.redirect(new URL(HOME, request.url), 301),
    );
  }

  if (isAllowed(pathname)) {
    return withContactRegionCookie(request, NextResponse.next());
  }

  const redirectUrl = new URL(HOME, request.url);
  const segment = pathname.replace(/^\/+|\/+$/g, "").split("/")[0]?.toLowerCase();

  if (segment && SECTION_IDS.has(segment)) {
    redirectUrl.hash = segment;
  }

  return withContactRegionCookie(request, NextResponse.redirect(redirectUrl, 308));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
