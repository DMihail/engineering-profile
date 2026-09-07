import { ExternalLink, GraduationCap } from "lucide-react";
import { EDUCATION } from "@/lib/content/portfolio/experience";
import {
  SITE_EDUCATION_FOCUS,
  SITE_ENGLISH_CERTIFICATE_HREF,
  SITE_ENGLISH_LEVEL,
  SITE_ENGLISH_NOTE,
} from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";

const INSTITUTION = EDUCATION[0]?.institution ?? "University";

function periodDateTime(period: string): string | undefined {
  const monthYear = period.match(/(\d{1,2})\/(\d{4})\s*[—–-]\s*(\d{1,2})\/(\d{4})/);
  if (monthYear) {
    return `${monthYear[2]}-${monthYear[1].padStart(2, "0")}/${monthYear[4]}-${monthYear[3].padStart(2, "0")}`;
  }
  const yearOnly = period.match(/(\d{4})\s*[—–-]\s*(\d{4})/);
  if (!yearOnly) return undefined;
  return `${yearOnly[1]}/${yearOnly[2]}`;
}

export function EducationSection() {
  const headingId = sectionHeadingId("education");

  return (
    <section
      id="education"
      className="section-surface section-cv-auto border-t border-border-primary-soft"
      aria-labelledby={headingId}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="education" />

        <div className="grid gap-4 max-w-2xl">
          <article className="panel" aria-labelledby="education-institution">
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
              <div className="icon-well icon-well-md shrink-0 self-start">
                <GraduationCap size={16} className="text-icon" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 id="education-institution" className="text-base font-semibold text-foreground tracking-[-0.01em]">
                  {INSTITUTION}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{SITE_EDUCATION_FOCUS}</p>

                <ul className="mt-5 space-y-3 list-none p-0 m-0" aria-label={UI_LABELS.education.degrees}>
                  {[...EDUCATION].reverse().map((entry) => (
                    <li
                      key={entry.period ?? entry.field}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 px-3.5 rounded-lg bg-surface-subtle border border-surface-muted"
                    >
                      <span className="text-sm font-medium text-foreground">{entry.field}</span>
                      {entry.period && (
                        <time className="mono-sm text-muted-foreground shrink-0" dateTime={periodDateTime(entry.period)}>
                          {entry.period}
                        </time>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <article className="panel" aria-labelledby="education-english">
            <div className="p-5 sm:p-6">
              <h3 id="education-english" className="text-base font-semibold text-foreground tracking-[-0.01em]">
                {SITE_ENGLISH_LEVEL}
              </h3>
              <p className="text-sm text-text-secondary mt-1 text-pretty">{SITE_ENGLISH_NOTE}</p>
              <a
                href={SITE_ENGLISH_CERTIFICATE_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary no-underline hover:underline underline-offset-2"
              >
                {UI_LABELS.education.englishCertificate}
                <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
