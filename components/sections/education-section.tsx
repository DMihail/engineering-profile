import { EDUCATION } from "@/lib/data";
import { SectionLabel } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

export function EducationSection() {
  return (
    <section id="education" className="section-surface" aria-labelledby="education-heading">
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <SectionLabel n="05" label="Education" />
        <h2 id="education-heading" className="section-heading mb-8">Education</h2>

        <ul className="space-y-4 list-none p-0 m-0 max-w-2xl">
          {EDUCATION.map((entry) => (
            <li key={entry.period || entry.institution}>
              <article className="panel px-5 py-4 sm:px-6 sm:py-5">
                <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">{entry.institution}</h3>
                <p className="text-sm text-text-secondary mt-1">{entry.field}</p>
                {entry.period && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <time>{entry.period}</time>
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
