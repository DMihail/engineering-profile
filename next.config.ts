import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { getSecurityHeaders } from "@/lib/security-headers";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? "192.168.1.144")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,

  // LAN / alternate hostnames for `next dev` HMR + static chunks
  allowedDevOrigins,

  serverExternalPackages: ["firebase-admin", "nodemailer"],

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Legacy index redirects: proxy.ts (local/runtime) + vercel.json (CDN). Avoid a third copy here.

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
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
