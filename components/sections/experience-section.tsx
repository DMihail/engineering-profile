import { MapPin } from "lucide-react";
import { XP_ENTRIES } from "@/lib/data/experience";
import { sectionHref } from "@/lib/section-ids";
import { SectionHeader, Chip, sectionHeadingId } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

export function ExperienceSection() {
  const headingId = sectionHeadingId("experience");

  return (
    <section id="experience" className="section-dark section-cv-auto" aria-labelledby={headingId}>
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader sectionId="experience" />

        <div className="relative">
          <div className="absolute top-2 bottom-8 w-px hidden md:block inset-s-0 bg-linear-to-b from-primary/40 to-primary/5" aria-hidden />
          <div className="space-y-5">
            {XP_ENTRIES.map((xp) => {
              const entryHeadingId = `xp-${xp.company.replace(/\s+/g, "-").toLowerCase()}`;

              return (
                <article key={xp.company} className="relative md:ps-10" aria-labelledby={entryHeadingId}>
                  <div
                    className={`absolute hidden md:block w-2.5 h-2.5 rounded-full -inset-s-1.25 top-5.5 border-2 ${
                      xp.current
                        ? "bg-primary border-primary shadow-primary-glow"
                        : "bg-card border-border-primary-emphasis"
                    }`}
                    aria-hidden
                  />
                  <div className="panel panel-hover">
                    <header className="p-5 sm:p-6 pb-3 sm:pb-4">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 id={entryHeadingId} className="text-base font-semibold text-foreground tracking-[-0.01em]">
                            {xp.role}
                          </h3>
                          <p className="text-sm text-primary mt-0.5">{xp.company}</p>
                        </div>
                        <div className="text-end">
                          <time className="mono-md text-muted-foreground">{xp.period}</time>
                          <p className="flex items-center gap-1 justify-end mt-1 mono-sm text-text-dim">
                            <MapPin size={10} className="text-text-dim shrink-0" aria-hidden />
                            {xp.location}
                          </p>
                          {xp.current && (
                            <p className="flex items-center gap-1.5 justify-end mt-1.5">
                              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-success" aria-hidden />
                              <span className="mono-xs text-success tracking-[0.06em]">CURRENT</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-text-secondary leading-relaxed text-pretty">{xp.highlight}</p>

                      <div className="flex flex-wrap gap-1.5 mt-3" aria-label={`Technologies at ${xp.company}`}>
                        {xp.tags.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>

                      {xp.relatedCaseTitle && (
                        <p className="mt-3">
                          <a
                            href={sectionHref("projects")}
                            className="mono-xs text-primary no-underline hover:underline underline-offset-2"
                          >
                            Related project: {xp.relatedCaseTitle} →
                          </a>
                        </p>
                      )}

                      <p className="px-3 py-2 rounded-lg bg-surface-subtle border border-surface-muted mono-xs text-text-faint leading-loose mt-4">
                        {xp.systems}
                      </p>
                    </header>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-surface-muted">
                      <ul className="space-y-2 list-none m-0 p-0">
                        {xp.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mono-sm text-text-dim mt-1 shrink-0" aria-hidden>→</span>
                            <span className="text-sm text-text-secondary leading-looser text-pretty">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
