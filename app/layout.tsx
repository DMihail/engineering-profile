import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import {
  SITE_URL,
  SITE_AUTHOR,
  SITE_DESCRIPTION,
} from "@/lib/config";
import {
  DEFAULT_SITE_TITLE,
  ROOT_SITE_METADATA,
} from "@/lib/site-metadata";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { AppProviders } from "@/components/providers/app-providers";
import { fontBodyClassName, fontVariableClassName } from "@/lib/fonts";
import { CSP_NONCE_HEADER } from "@/lib/security-headers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Senior React Native", "Expo", "Full-Stack Developer", "Mobile Developer", "iOS", "Android",
    "TypeScript", "React", "Next.js", "Node.js", "Jest", "Detox",
    "Firebase", "Crashlytics", "Redux", "WebSockets", "GraphQL",
    "App Store", "Google Play", "Dublin", "Ireland", "Stamp 4", "Remote",
    SITE_AUTHOR,
  ],
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
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    "yandex": "index, follow",
  } as Metadata["robots"],
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0F17",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const nonce = headerStore.get(CSP_NONCE_HEADER) ?? undefined;

  return (
    <html
      lang="en-IE"
      data-scroll-behavior="smooth"
      className={`${fontVariableClassName} h-full`}
      {...(nonce ? { nonce } : {})}
      suppressHydrationWarning
    >
      <body className={`${fontBodyClassName} min-h-full`}>
        <SiteJsonLd />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
