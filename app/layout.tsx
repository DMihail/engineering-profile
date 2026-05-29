import type { Metadata, Viewport } from "next";
import { SITE_URL, SITE_AUTHOR, SITE_ROLE, SITE_DESCRIPTION, SITE_SHORT_DESCRIPTION } from "@/lib/config";
import { fontBodyClassName, fontVariableClassName } from "@/lib/fonts";
import "./globals.css";

const title = `${SITE_AUTHOR} — ${SITE_ROLE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "React Native", "Mobile Developer", "iOS", "Android",
    "TypeScript", "React", "Next.js", "Node.js",
    "Firebase", "Redux", "WebSockets", "GraphQL",
    SITE_AUTHOR,
  ],
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_AUTHOR,
    title,
    description: SITE_SHORT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_SHORT_DESCRIPTION,
    creator: "@mykhailo_dev",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  url: SITE_URL,
  jobTitle: "React Native & Mobile Systems Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  sameAs: [
    "https://github.com/DMihail",
    "https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/",
  ],
  knowsAbout: [
    "React Native",
    "TypeScript",
    "iOS",
    "Android",
    "Real-time Systems",
    "Mobile Architecture",
    "Performance Optimization",
    "Native Modules",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariableClassName} h-full`}>
      <head>
        <meta name="theme-color" content="#0B0F17" />
        <meta name="google-site-verification" content="lle48wjp7HiGdH_6SV2SEHd7_ShE51gH92oFBCJVLYA" />
        <meta name="yandex-verification" content="0b930a278e22c1b1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontBodyClassName} min-h-full`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
