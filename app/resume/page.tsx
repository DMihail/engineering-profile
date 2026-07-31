import type { Metadata } from "next";
import { ResumeDocument } from "@/components/resume/resume-document";
import { ResumeToolbar } from "@/components/resume/resume-toolbar";
import { getContactRegionFromCookies } from "@/lib/contact-region-server";
import { resolveResumeVariant } from "@/lib/resume-content";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import styles from "@/styles/resume.module.css";

interface ResumePageProps {
  searchParams: Promise<{ variant?: string }>;
}

export async function generateMetadata({ searchParams }: ResumePageProps): Promise<Metadata> {
  const { variant } = await searchParams;
  const region = await getContactRegionFromCookies();
  const resolved = resolveResumeVariant(variant, region);

  // UA-targeted resume (query or geo cookie) must not be indexed under /resume.
  if (resolved === "ua") {
    return {
      robots: { index: false, follow: true },
    };
  }

  return {};
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const { variant: variantParam } = await searchParams;
  const region = await getContactRegionFromCookies();
  const variant = resolveResumeVariant(variantParam, region);

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.page}>
      <ResumeToolbar variant={variant} />
      <ResumeDocument variant={variant} />
    </main>
  );
}
