import type { Metadata } from "next";
import { Suspense } from "react";
import { ResumeDocument } from "@/components/resume/resume-document";
import { ResumeToolbar } from "@/components/resume/resume-toolbar";
import { parseResumeVariant, type ResumeVariant } from "@/lib/resume-content";
import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import styles from "@/styles/resume/resume-shell.module.css";

interface ResumePageProps {
  searchParams: Promise<{ variant?: string }>;
}

/**
 * Canonical `/resume` is always the Ireland (indexable) variant.
 * UA content is opt-in via `?variant=ua` and must not be indexed.
 */
export async function generateMetadata({ searchParams }: ResumePageProps): Promise<Metadata> {
  const { variant } = await searchParams;
  if (parseResumeVariant(variant) === "ua") {
    return {
      robots: { index: false, follow: true },
    };
  }

  return {};
}

function ResumeMain({ variant }: { variant: ResumeVariant }) {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.page}>
      <ResumeToolbar variant={variant} />
      <ResumeDocument variant={variant} />
    </main>
  );
}

async function ResumeFromRequest({ searchParams }: ResumePageProps) {
  const { variant: variantParam } = await searchParams;
  return <ResumeMain variant={parseResumeVariant(variantParam)} />;
}

export default function ResumePage({ searchParams }: ResumePageProps) {
  return (
    <Suspense fallback={<ResumeMain variant="ireland" />}>
      <ResumeFromRequest searchParams={searchParams} />
    </Suspense>
  );
}
