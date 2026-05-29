import type { Metadata, Viewport } from "next";
import {
  SITE_URL,
  SITE_AUTHOR,
  SITE_ROLE,
  SITE_DESCRIPTION,
  SITE_SHORT_DESCRIPTION,
  SITE_OG_IMAGE_PATH,
} from "@/lib/config";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { fontBodyClassName, fontVariableClassName } from "@/lib/fonts";
import "./globals.css";

const title = `${SITE_AUTHOR} — ${SITE_ROLE}`;
const ogImage = {
  url: SITE_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: title,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "React Native", "Expo", "Full-Stack Developer", "Mobile Developer", "iOS", "Android",
    "TypeScript", "React", "Next.js", "Node.js", "Jest", "Detox",
    "Firebase", "Crashlytics", "Redux", "WebSockets", "GraphQL",
    "App Store", "Google Play", "Dublin", "Ireland", "Remote",
    SITE_AUTHOR,
  ],
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  verification: {
    google: "lle48wjp7HiGdH_6SV2SEHd7_ShE51gH92oFBCJVLYA",
    yandex: "0b930a278e22c1b1",
  },
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: SITE_URL,
    siteName: SITE_AUTHOR,
    title,
    description: SITE_SHORT_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_SHORT_DESCRIPTION,
    creator: "@mykhailo_dev",
    images: [SITE_OG_IMAGE_PATH],
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariableClassName} h-full`}>
      <body className={`${fontBodyClassName} min-h-full`}>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
