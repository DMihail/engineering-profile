import { SKILL_LAYERS } from "@/lib/data/skills";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";
import styles from "@/styles/sections/skills-section.module.css";

function sortSkillsPrimaryFirst<T extends { primary: boolean }>(skills: T[]): T[] {
  return [...skills].sort((a, b) => Number(b.primary) - Number(a.primary));
}

export function SkillsSection() {
  const headingId = sectionHeadingId("skills");

  return (
    <section id="skills" className="section-surface section-cv-auto" aria-labelledby={headingId}>
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader sectionId="skills" commentClassName="mb-9" />

        <div className={styles.grid}>
          {SKILL_LAYERS.map((layer) => (
            <article
              key={layer.id}
              className={`panel ${styles.card}`}
              aria-labelledby={`skill-layer-${layer.id}`}
            >
              <header className={styles.header}>
                <h3 id={`skill-layer-${layer.id}`} className={styles.layerTitle}>
                  {layer.layer}
                </h3>
                <p className={styles.desc}>{layer.desc}</p>
                <p className={styles.refs}>{layer.projectRefs}</p>
              </header>
              <ul className={styles.skills} aria-label={`${layer.layer} tools`}>
                {sortSkillsPrimaryFirst(layer.skills).map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <li
                      key={`${layer.id}-${skill.name}`}
                      className={`${styles.chip} ${skill.primary ? styles.chipPrimary : ""}`}
                    >
                      <SkillIcon
                        size={11}
                        className={`shrink-0 ${skill.primary ? "text-primary" : "text-muted-foreground"}`}
                        aria-hidden
                      />
                      <span className={`${styles.chipLabel} ${skill.primary ? styles.chipLabelPrimary : ""}`}>
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
