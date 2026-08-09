import type { Metadata } from "next";
import { BreadcrumbNav } from "@/components/layout/breadcrumb-nav";
import { SkipLink } from "@/components/layout/skip-link";
import { SubpageHeader } from "@/components/layout/subpage-header";
import { BreadcrumbJsonLdScript, buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/components/seo/breadcrumb-json-ld";
import {
  ProfilePageJsonLdScript,
  buildProfilePageJsonLd,
} from "@/components/seo/profile-page-json-ld";
import { SITE_RESUME_OG_IMAGE_PATH } from "@/lib/config";
import { buildRouteMetadata, titledPage } from "@/lib/page-metadata";
import styles from "@/styles/resume/resume-shell.module.css";

const resumeTitle = titledPage("Resume", " — ");
const resumeDescription =
  "ATS-friendly resume for Mykhailo Dzhezhelo — Mobile Engineer, React Native and Web Developer. Print or save as PDF.";

export const metadata: Metadata = buildRouteMetadata({
  title: resumeTitle,
  description: resumeDescription,
  path: "/resume",
  ogImagePath: SITE_RESUME_OG_IMAGE_PATH,
});

const resumeProfilePageJsonLd = buildProfilePageJsonLd({
  name: resumeTitle,
  description: resumeDescription,
});

const resumeBreadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Resume", path: "/resume" },
] satisfies BreadcrumbItem[];

const resumeBreadcrumbJsonLd = buildBreadcrumbJsonLd(resumeBreadcrumbItems);

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.root}>
      <ProfilePageJsonLdScript data={resumeProfilePageJsonLd} />
      <BreadcrumbJsonLdScript data={resumeBreadcrumbJsonLd} />
      <SkipLink />
      <SubpageHeader />
      <BreadcrumbNav items={resumeBreadcrumbItems} />
      {children}
    </div>
  );
}
