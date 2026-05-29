import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/lib/data/experience";
import { EDUCATION_ID } from "@/lib/section-ids";
import { SectionLabel } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

const INSTITUTION =
  EDUCATION[0]?.institution ?? "University";

function periodDateTime(period: string): string | undefined {
  const match = period.match(/(\d{4})\s*[—–-]\s*(\d{4})/);
  if (!match) return undefined;
  return `${match[1]}/${match[2]}`;
}

export function EducationSection() {
  return (
    <section
      id={EDUCATION_ID}
      className="section-surface section-cv-auto border-t border-border-primary-soft"
      aria-labelledby="education-heading"
    >
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <SectionLabel n="05" label="Education" />
        <h2 id="education-heading" className="section-heading mb-2">
          Education
        </h2>
        <p className="section-comment mb-10 max-w-copy">
          Systems analysis — analytical foundation for product and backend work
        </p>

        <article className="panel panel-hover max-w-2xl">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <div className="icon-well icon-well-md shrink-0 self-start">
              <GraduationCap size={16} className="text-primary" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">
                {INSTITUTION}
              </h3>
              <p className="text-sm text-text-secondary mt-1">Systems Analysis</p>

              <ul className="mt-5 space-y-3 list-none p-0 m-0" aria-label="Degrees">
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
      </FadeIn>
    </section>
  );
}
