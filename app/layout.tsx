import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL, SITE_AUTHOR, SITE_ROLE, SITE_DESCRIPTION, SITE_SHORT_DESCRIPTION } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <title>{title}</title>
        <meta name="theme-color" content="#0B0F17" />
        {/* Search engine verification — fill content after registering */}
        <meta name="google-site-verification" content="" />
        <meta name="yandex-verification" content="" />
        <meta name="msvalidate.01" content="" />
        <meta name="naver-site-verification" content="" />
        <meta name="baidu-site-verification" content="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="site-main" className="min-h-full">
        <a href="#site-main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
    </html>
  );
}
