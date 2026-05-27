import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HOME = "/";

const ALLOWED_EXACT = new Set([
  "/",
  "/favicon.ico",
  "/icon.svg",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
]);

const ALLOWED_PREFIXES = ["/api/", "/_next/"];
const ALLOWED_STARTS = ["/opengraph-image", "/apple-icon"];

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

function isAllowed(pathname: string): boolean {
  if (ALLOWED_EXACT.has(pathname)) return true;
  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  if (ALLOWED_STARTS.some((prefix) => pathname.startsWith(prefix))) return true;
  // Public files (CV PDFs, etc.)
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAllowed(pathname)) {
    return NextResponse.next();
  }

  const redirectUrl = new URL(HOME, request.url);
  const segment = pathname.replace(/^\/+|\/+$/g, "").split("/")[0]?.toLowerCase();

  if (segment && SECTION_IDS.has(segment)) {
    redirectUrl.hash = segment;
  }

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
