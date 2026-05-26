import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Mykhailo Dzhezhelo — React Native Engineer",
  description:
    "React Native Engineer specializing in real-time systems, native integrations, and performance-critical mobile applications. 6+ years production across iOS, Android, and web.",
  openGraph: {
    title: "Mykhailo Dzhezhelo — React Native Engineer",
    description:
      "Building high-performance mobile systems, real-time applications, and scalable frontend architectures.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mykhailo Dzhezhelo — React Native Engineer",
    description:
      "Building high-performance mobile systems, real-time applications, and scalable frontend architectures.",
  },
  metadataBase: new URL("https://dzhezhelo.dev"),
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
