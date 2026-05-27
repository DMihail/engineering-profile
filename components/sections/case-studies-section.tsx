"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import type { CaseStudy } from "@/lib/types";
import { CASE_STUDIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel, Chip } from "@/components/ui/primitives";
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
  return (
    <details className={styles.panel} name="case-studies">
      <summary className={styles.summary}>
        <div className="flex items-start gap-4 sm:gap-5">
          <span className={`hidden sm:block shrink-0 font-mono font-bold tracking-[-0.05em] leading-none mt-0.5 ${styles.studyNum}`}>
            {cs.num}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
              <span className="sm:hidden text-xs text-primary/60 font-bold">#{cs.num}</span>
              <span className="text-xs text-text-dim tracking-[0.04em] uppercase">{cs.type}</span>
              <span className="text-text-faint" aria-hidden>·</span>
              <span className="text-xs text-text-faint">{cs.version}</span>
            </div>

            <h3 className="font-sans text-case-title font-bold tracking-[-0.025em] text-foreground mb-2">{cs.title}</h3>
            <p className="text-sm text-text-secondary leading-[1.62] max-w-[620px] mb-3">{cs.summary}</p>

            <div className="flex flex-wrap gap-4 sm:gap-5">
              {cs.results.map((r) => (
                <div key={r.label}>
                  <div className="font-sans text-sm sm:text-base font-bold text-success">{r.metric}</div>
                  <div className="text-xs text-text-dim mt-0.5">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chevron} aria-hidden>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </summary>

      <div className={styles.content}>
        <section className={styles.block} aria-labelledby={`${cs.id}-context`}>
          <StudyHeading id={`${cs.id}-context`}>Context</StudyHeading>
          <p className={styles.bodyText}>{cs.context}</p>
        </section>

        <section className={`${styles.problemBox} ${styles.block}`} aria-labelledby={`${cs.id}-problem`}>
          <StudyHeading id={`${cs.id}-problem`}>Problem</StudyHeading>
          <p className={styles.bodyText}>{cs.problem}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${cs.id}-solution`}>
          <StudyHeading id={`${cs.id}-solution`}>Solution</StudyHeading>
          <p className={styles.bodyText}>{cs.solution}</p>
        </section>

        <section className={styles.block} aria-labelledby={`${cs.id}-results`}>
          <StudyHeading id={`${cs.id}-results`}>Results</StudyHeading>
          <ul className={styles.resultGrid}>
            {cs.results.map((r) => (
              <li key={r.label} className={styles.resultCard}>
                <div className="font-sans text-case-metric font-extrabold text-success tracking-[-0.04em] leading-none mb-1.5">{r.metric}</div>
                <div className="text-xs text-[rgba(34,197,94,0.55)]">{r.label}</div>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.deepDive}>
          <CollapsibleBlock title="Architecture" name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.architecture.map((a) => (
                <li key={a.decision}>
                  <span className="text-sm font-medium text-foreground">{a.decision}</span>
                  <span className="text-sm text-muted-foreground"> — {a.rationale}</span>
                </li>
              ))}
            </ul>
          </CollapsibleBlock>

          <CollapsibleBlock title="Technical details" name={`${cs.id}-deep`}>
            <div className="space-y-5">
              <div>
                <p className={styles.subLabel}>Engineering focus</p>
                <ul className={styles.bulletList}>
                  {cs.technicalPoints.map((point) => (
                    <li key={point} className="text-sm text-text-secondary leading-[1.65]">{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.subLabel}>Constraints</p>
                <ul className={styles.bulletList}>
                  {cs.constraints.map((c) => (
                    <li key={c} className="text-sm text-muted-foreground leading-[1.65]">{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.subLabel}>Stack</p>
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

          <CollapsibleBlock title="Trade-offs" name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.tradeoffs.map((tr) => (
                <li key={tr.chosen}>
                  <span className="text-sm font-medium text-text-secondary">{tr.chosen}</span>
                  <span className="text-sm text-muted-foreground"> — {tr.rationale}</span>
                </li>
              ))}
            </ul>
          </CollapsibleBlock>

          <CollapsibleBlock title="Performance notes" name={`${cs.id}-deep`}>
            <ul className={styles.bulletList}>
              {cs.performanceNotes.map((note) => (
                <li key={note} className="text-sm text-text-secondary leading-[1.65]">{note}</li>
              ))}
            </ul>
          </CollapsibleBlock>
        </div>
      </div>
    </details>
  );
}

export function CaseStudiesSection() {
  const { ref, fade } = useFadeIn();
  return (
    <section id="projects" className="bg-background py-22" aria-labelledby="projects-heading">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="02" label="Case Studies" />
        <h2 id="projects-heading" className="section-heading">Case studies</h2>
        <p className="section-comment mb-10">
          Production mobile work — context, outcomes, and optional technical depth.
        </p>
        <div className="space-y-5">
          {CASE_STUDIES.map((cs) => <CaseStudyPanel key={cs.id} cs={cs} />)}
        </div>
      </div>
    </section>
  );
}
