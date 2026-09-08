import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  SITE_URL,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
} from "@/lib/config";
import {
  DEFAULT_SITE_TITLE,
  ROOT_SITE_METADATA,
} from "@/lib/site-metadata";
import { ScrollHashBootstrap } from "@/components/layout/scroll-hash-bootstrap";
import { ThemeSync } from "@/components/layout/theme-sync";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { fontBodyClassName, fontVariableClassName } from "@/lib/fonts";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  verification: {
    google: "lle48wjp7HiGdH_6SV2SEHd7_ShE51gH92oFBCJVLYA",
    yandex: "0b930a278e22c1b1",
  },
  openGraph: ROOT_SITE_METADATA.openGraph,
  twitter: ROOT_SITE_METADATA.twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
};

/**
 * Root layout stays sync so Cache Components can prerender a static shell.
 * CSP comes from `getSecurityHeaders()` via `proxy.ts` and `next.config` (no nonces).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IE"
      data-scroll-behavior="smooth"
      className={`${fontVariableClassName} h-full`}
      suppressHydrationWarning
    >
      <body className={`${fontBodyClassName} min-h-full`}>
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }}
        />
        <ScrollHashBootstrap />
        <ThemeSync />
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
