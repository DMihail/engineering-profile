import { ResumeDocument } from "@/components/resume/resume-document";
import { ResumeToolbar } from "@/components/resume/resume-toolbar";
import { parseResumeVariant } from "@/lib/resume-content";
import styles from "@/styles/resume.module.css";

interface ResumePageProps {
  searchParams: Promise<{ variant?: string }>;
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const { variant: variantParam } = await searchParams;
  const variant = parseResumeVariant(variantParam);

  return (
    <main className={styles.page}>
      <ResumeToolbar variant={variant} />
      <ResumeDocument variant={variant} />
    </main>
  );
}
