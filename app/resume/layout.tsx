import type { Metadata } from "next";
import { SITE_AUTHOR, SITE_URL } from "@/lib/config";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import styles from "@/styles/resume.module.css";

const resumeTitle = `Resume — ${SITE_AUTHOR}`;
const resumeDescription =
  "ATS-friendly resume for Mykhailo Dzhezhelo — Senior React Native and full-stack developer. Print or save as PDF.";
const resumeUrl = `${SITE_URL}/resume`;

export const metadata: Metadata = {
  title: resumeTitle,
  description: resumeDescription,
  alternates: {
    canonical: resumeUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: buildOpenGraph({
    url: resumeUrl,
    title: resumeTitle,
    description: resumeDescription,
  }),
  twitter: buildTwitter({
    title: resumeTitle,
    description: resumeDescription,
  }),
};

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.root}>{children}</div>;
}
