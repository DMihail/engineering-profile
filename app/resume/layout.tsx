import type { Metadata } from "next";
import { WebPageJsonLdScript, buildWebPageJsonLd } from "@/components/seo/web-page-json-ld";
import { buildRouteMetadata, titledPage } from "@/lib/page-metadata";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import styles from "@/styles/resume.module.css";

const resumeTitle = titledPage("Resume", " — ");
const resumeDescription =
  "ATS-friendly resume for Mykhailo Dzhezhelo — Senior React Native and full-stack developer. Print or save as PDF.";

export const metadata: Metadata = buildRouteMetadata({
  title: resumeTitle,
  description: resumeDescription,
  path: "/resume",
});

const resumeWebPageJsonLd = buildWebPageJsonLd({
  path: "/resume",
  name: resumeTitle,
  description: resumeDescription,
});

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.root}>
      <WebPageJsonLdScript data={resumeWebPageJsonLd} />
      <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
        Skip to content
      </a>
      {children}
    </div>
  );
}
