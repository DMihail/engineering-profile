import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/lib/types";
import { CASE_STUDIES } from "@/lib/content/portfolio/case-studies";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { projectFragmentId } from "@/lib/content/seo";
import { SectionHeader, Chip, sectionHeadingId } from "@/components/ui/primitives";
import styles from "@/styles/sections/case-studies-section.module.css";

function StudyHeading({
  id,
  children,
}: {
  id?: string;
  children: string;
}) {
  return (
    <h4 id={id} className={styles.studyHeading}>
      {children}
    </h4>
  );
}

function CollapsibleBlock({
  title,
  children,
  name,
}: {
  title: string;
  children: ReactNode;
  name: string;
}) {
  return (
    <details className={styles.subPanel} name={name}>
      <summary className={styles.subSummary}>
        <span>{title}</span>
        <ChevronDown size={14} className={styles.subChevron} aria-hidden />
      </summary>
      <div className={styles.subContent}>{children}</div>
    </details>
  );
}

function CaseStudyPanel({ cs }: { cs: CaseStudy }) {
  const [typePrimary, typeSecondary] = cs.type.split(" · ");
  const panelHeadingId = `${cs.id}-title`;

  return (
    <article aria-labelledby={panelHeadingId}>
      <details id={projectFragmentId(cs.id)} className={`${styles.panel} case-details`} name="case-studies">
        <summary className={styles.summary}>
          <div className="flex items-start gap-4 sm:gap-5">
            <span className={`hidden sm:block shrink-0 font-mono font-bold tracking-[-0.05em] leading-none mt-0.5 ${styles.studyNum}`}>
              {cs.num}
            </span>

            <div className="flex-1 min-w-0">
              <div className={styles.metaRow}>
                <span className="sm:hidden text-xs text-primary font-bold">#{cs.num}</span>
                <span className={`${styles.metaBadge} ${styles.metaBadgePrimary}`}>
                  {typePrimary ?? cs.type}
                </span>
                {typeSecondary && (
                  <span className={`${styles.metaBadge} hidden sm:inline-flex`}>{typeSecondary}</span>
                )}
                <span className={styles.metaBadge}>{cs.version}</span>
              </div>

              <h3
                id={panelHeadingId}
                className="font-sans text-case-title font-bold tracking-[-0.025em] text-foreground mb-2"
              >
                {cs.title}
              </h3>
            <p className="text-sm text-text-secondary leading-loose max-w-copy mb-4 text-pretty">
              {cs.summary}
            </p>

            <ul className={styles.metricStrip} aria-label={UI_LABELS.caseStudies.keyResults}>
              {cs.results.map((r) => (
                <li key={r.label} className={styles.metricPill}>
                  <span className={styles.metricValue}>{r.metric}</span>
                  <span className={styles.metricLabel}>{r.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.chevron} aria-hidden>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </summary>

      <div className={`${styles.content} case-details-content`}>
        <section className={styles.block} aria-labelledby={`${cs.id}-context`}>
          <StudyHeading id={`${cs.id}-context`}>{UI_LABELS.caseStudies.context}</StudyHeading>
          <p className={styles.bodyText}>{cs.context}</p>
        </section>

        <section className={`${styles.problemBox} ${styles.block}`} aria-labelledby={`${cs.id}-problem`}>
          <StudyHeading id={`${cs.id}-problem`}>{UI_LABELS.caseStudies.problem}</StudyHeading>
          <p className={styles.bodyText}>{cs.problem}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${cs.id}-solution`}>
          <StudyHeading id={`${cs.id}-solution`}>{UI_LABELS.caseStudies.solution}</StudyHeading>
          <p className={styles.bodyText}>{cs.solution}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${cs.id}-results`}>
          <StudyHeading id={`${cs.id}-results`}>{UI_LABELS.caseStudies.results}</StudyHeading>
          <ul className={styles.resultGrid}>
            {cs.results.map((r) => (
              <li key={r.label} className={styles.resultCard}>
                <div className="font-sans text-case-metric font-extrabold text-success tracking-[-0.04em] leading-none mb-1.5">
                  {r.metric}
                </div>
                <div className="text-xs text-success-muted">{r.label}</div>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.deepDive}>
          <CollapsibleBlock title={UI_LABELS.caseStudies.architecture} name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.architecture.map((a) => (
                <li key={a.decision}>
                  <span className="text-sm font-medium text-foreground">{a.decision}</span>
                  <span className="text-sm text-muted-foreground"> — {a.rationale}</span>
                </li>
              ))}
            </ul>
          </CollapsibleBlock>

          <CollapsibleBlock title={UI_LABELS.caseStudies.technicalDetails} name={`${cs.id}-deep`}>
            <div className="space-y-5">
              <div>
                <p className={styles.subLabel}>{UI_LABELS.caseStudies.engineeringFocus}</p>
                <ul className={styles.bulletList}>
                  {cs.technicalPoints.map((point) => (
                    <li key={point} className="text-sm text-text-secondary leading-looser text-pretty">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.subLabel}>{UI_LABELS.caseStudies.constraints}</p>
                <ul className={styles.bulletList}>
                  {cs.constraints.map((c) => (
                    <li key={c} className="text-sm text-muted-foreground leading-looser text-pretty">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.subLabel}>{UI_LABELS.caseStudies.stack}</p>
                <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                  {cs.stack.map((t) => (
                    <li key={t}>
                      <Chip label={t} variant="blue" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleBlock>

          <CollapsibleBlock title={UI_LABELS.caseStudies.tradeoffs} name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.tradeoffs.map((tr) => (
                <li key={tr.chosen}>
                  <span className="text-sm font-medium text-text-secondary">{tr.chosen}</span>
                  <span className="text-sm text-muted-foreground"> — {tr.rationale}</span>
                </li>
              ))}
            </ul>
          </CollapsibleBlock>

          <CollapsibleBlock title={UI_LABELS.caseStudies.performanceNotes} name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.performanceNotes.map((note) => (
                <li key={note} className="text-sm text-text-secondary leading-looser text-pretty">
                  {note}
                </li>
              ))}
            </ul>
          </CollapsibleBlock>
        </div>
      </div>
    </details>
    </article>
  );
}

export function CaseStudiesSection() {
  const headingId = sectionHeadingId("projects");

  return (
    <section id="projects" className="section-dark section-cv-auto" aria-labelledby={headingId}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="projects" />
        <div className="space-y-4 sm:space-y-5">
          {CASE_STUDIES.map((cs) => (
            <CaseStudyPanel key={cs.id} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
