import { MapPin } from "lucide-react";
import { XP_ENTRIES } from "@/lib/data/experience";
import { sectionHref } from "@/lib/section-ids";
import type { XPProject } from "@/lib/types";
import { SectionHeader, Chip, sectionHeadingId } from "@/components/ui/primitives";

function ExperienceBulletList({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className="space-y-2 list-none m-0 p-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mono-sm text-text-dim mt-1 shrink-0" aria-hidden>
            →
          </span>
          <span className="text-sm text-text-secondary leading-looser text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceProjectBlock({ project }: { project: XPProject }) {
  return (
    <div className="mt-5 first:mt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-foreground m-0">{project.title}</h4>
        {project.relatedCaseId ? (
          <a
            href={`${sectionHref("projects")}#project-${project.relatedCaseId}`}
            className="mono-xs text-primary no-underline hover:underline underline-offset-2 shrink-0"
          >
            View project →
          </a>
        ) : null}
      </div>
      <ExperienceBulletList items={project.items} />
    </div>
  );
}

export function ExperienceSection() {
  const headingId = sectionHeadingId("experience");

  return (
    <section id="experience" className="section-dark section-cv-auto" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="experience" />

        <div className="relative">
          <div
            className="absolute top-2 bottom-8 w-px hidden md:block inset-s-0 bg-linear-to-b from-primary/40 to-primary/5"
            aria-hidden
          />
          <div className="space-y-5">
            {XP_ENTRIES.map((xp) => {
              const entryHeadingId = `xp-${xp.company.replace(/\s+/g, "-").toLowerCase()}`;
              const hasBody =
                xp.items.length > 0 ||
                (xp.projects?.length ?? 0) > 0 ||
                (xp.applications?.length ?? 0) > 0;

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
                          <h3
                            id={entryHeadingId}
                            className="text-base font-semibold text-foreground tracking-[-0.01em]"
                          >
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
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5" aria-label={`Technologies at ${xp.company}`}>
                        {xp.tags.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>

                      {xp.relatedCaseTitle && !xp.projects?.length ? (
                        <p className="mt-3 mb-0">
                          <a
                            href={`${sectionHref("projects")}#project-${xp.relatedCaseId}`}
                            className="mono-xs text-primary no-underline hover:underline underline-offset-2"
                          >
                            Related project: {xp.relatedCaseTitle} →
                          </a>
                        </p>
                      ) : null}
                    </header>

                    {hasBody ? (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-surface-muted">
                        <ExperienceBulletList items={xp.items} />

                        {xp.projects?.map((project) => (
                          <ExperienceProjectBlock key={project.title} project={project} />
                        ))}

                        {xp.applications?.length ? (
                          <div className="mt-5">
                            <p className="text-sm font-semibold text-foreground m-0 mb-2">
                              {xp.applicationsLabel ?? "Applications:"}
                            </p>
                            <ExperienceBulletList items={xp.applications} />
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
