import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
