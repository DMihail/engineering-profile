import type { Metadata } from "next";
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
  title,
  description: SITE_DESCRIPTION,
  openGraph: { title, description: SITE_SHORT_DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title, description: SITE_SHORT_DESCRIPTION },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
