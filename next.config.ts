import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { getSecurityHeaders } from "@/lib/security-headers";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  // Next.js 16.4 Cache Components model (partialPrefetching is part of the recommended pair).
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  compress: true,

  // LAN / alternate hostnames for `next dev` HMR + static chunks
  allowedDevOrigins,

  serverExternalPackages: ["firebase-admin", "nodemailer"],

  // lucide-react is already on Next's default optimizePackageImports list — no experimental flag needed.
  // Legacy index redirects: proxy.ts (local/runtime) + vercel.json (CDN).

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: getSecurityHeaders(),
      },
      {
        source: "/icon.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Short agent briefs — revalidate weekly so crawl caches stay fresh with content edits.
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // PDF CVs are application downloads — keep them out of the search index.
        source: "/:file(.*)\\.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
