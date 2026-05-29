import { SKILL_LAYERS } from "@/lib/data/skills";
import { SectionLabel } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

function sortSkillsPrimaryFirst<T extends { primary: boolean }>(skills: T[]): T[] {
  return [...skills].sort((a, b) => Number(b.primary) - Number(a.primary));
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-surface section-cv-auto" aria-labelledby="skills-heading">
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel n="03" label="Stack" />
        <h2 id="skills-heading" className="section-heading mb-2">Stack & tools</h2>
        <p className="section-comment mb-9">
          What I reach for daily — primary tools in bold
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {SKILL_LAYERS.map((layer) => (
            <article key={layer.id} className="panel panel-hover" aria-labelledby={`skill-layer-${layer.id}`}>
              <header className="px-4 pt-3 pb-2.5 border-b border-border bg-surface-subtle">
                <h3 id={`skill-layer-${layer.id}`} className="mono-sm font-semibold text-primary tracking-[0.04em]">
                  {layer.layer}
                </h3>
                <p className="mono-xs text-text-dim mt-0.5">{layer.desc}</p>
                <p className="mt-2 mono-xs text-text-faint">{layer.projectRefs}</p>
              </header>
              <ul className="p-3 grid grid-cols-2 gap-1.5 list-none m-0">
                {sortSkillsPrimaryFirst(layer.skills).map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <li
                      key={`${layer.id}-${skill.name}`}
                      className={`skill-tile ${skill.primary ? "skill-tile-primary" : ""}`}
                    >
                      <SkillIcon size={12} className={`shrink-0 ${skill.primary ? "text-primary" : "text-muted-foreground"}`} aria-hidden />
                      <span className={`mono-sm truncate ${skill.primary ? "text-text-secondary" : "text-muted-foreground"}`}>
                        {skill.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
