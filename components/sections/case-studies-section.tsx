"use client";

import { ChevronDown } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import { CASE_STUDIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel, Chip } from "@/components/ui/primitives";
import styles from "@/styles/sections/case-studies-section.module.css";

function StudyHeading({
  id,
  n,
  children,
  accent = "blue",
}: {
  id?: string;
  n: string;
  children: string;
  accent?: "blue" | "green";
}) {
  return (
    <h4
      id={id}
      className={`${styles.studyLabel} ${accent === "blue" ? styles.studyLabelBlue : styles.studyLabelGreen}`}
    >
      <span className={accent === "blue" ? "text-[rgba(56,189,248,0.35)]" : "text-[rgba(34,197,94,0.35)]"} aria-hidden="true">{n}</span>
      {children}
    </h4>
  );
}

function CaseStudyPanel({ cs }: { cs: CaseStudy }) {
  return (
    <details className={styles.panel} name="case-studies">
      <summary className={styles.summary}>
        <div className="flex items-start gap-5">
          <span className={`hidden sm:block shrink-0 font-mono text-[38px] font-bold tracking-[-0.05em] leading-none mt-0.5 ${styles.studyNum}`}>
            {cs.num}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5">
              <span className="sm:hidden mono-md text-[rgba(56,189,248,0.35)] font-bold">#{cs.num}</span>
              <span className="mono-sm text-text-dim tracking-[0.07em] uppercase">{cs.type}</span>
              <span className="mono-sm text-text-faint">·</span>
              <span className="chip-blue mono-xs py-px px-[7px]">{cs.archType}</span>
              <span className="mono-sm text-text-faint">·</span>
              <span className="mono-sm text-text-faint">{cs.version}</span>
            </div>

            <h3 className="font-sans text-[20px] font-bold tracking-[-0.025em] text-foreground mb-[7px]">{cs.title}</h3>
            <p className="text-sm text-text-secondary leading-[1.62] max-w-[580px] mb-2.5">{cs.summary}</p>

            <div className="hidden sm:flex items-baseline gap-1.5 flex-wrap">
              <span className="mono-xs text-text-dim shrink-0">arch:</span>
              <span className="mono-xs text-text-faint leading-[1.6]">{cs.archSig}</span>
            </div>

            <div className="lg:hidden mt-3 space-y-3">
              <div className="flex flex-wrap gap-1.5">{cs.stack.slice(0, 4).map((t) => <Chip key={t} label={t} />)}</div>
              <div className="flex flex-wrap gap-4">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <div className="font-sans text-sm font-bold text-success">{r.metric}</div>
                    <div className="mono-xs text-text-dim">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-3 shrink-0">
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[240px]">
              {cs.stack.slice(0, 4).map((t) => <Chip key={t} label={t} />)}
            </div>
            <div className="flex gap-5">
              {cs.results.map((r) => (
                <div key={r.label} className="text-right">
                  <div className="font-sans text-base font-bold text-success tracking-[-0.025em]">{r.metric}</div>
                  <div className="mono-xs text-text-dim mt-px">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chevron}>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </summary>

      <div className={styles.content}>
        <section className="mb-7" aria-labelledby={`${cs.id}-context`}>
          <StudyHeading id={`${cs.id}-context`} n="01">Context</StudyHeading>
          <p className="text-sm text-muted-foreground leading-[1.78] italic">{cs.context}</p>
        </section>

        <section className={`${styles.problemBox} mb-8`} aria-labelledby={`${cs.id}-problem`}>
          <StudyHeading id={`${cs.id}-problem`} n="02">Problem statement</StudyHeading>
          <p className="text-sm text-text-secondary leading-[1.8]">{cs.problem}</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <section aria-labelledby={`${cs.id}-constraints`}>
            <StudyHeading id={`${cs.id}-constraints`} n="03">Technical constraints</StudyHeading>
            <ul className="space-y-3">
              {cs.constraints.map((c) => (
                <li key={c} className="text-[13px] text-muted-foreground leading-[1.7]">{c}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby={`${cs.id}-approach`}>
            <StudyHeading id={`${cs.id}-approach`} n="04">Technical approach</StudyHeading>
            <p className="text-sm text-text-secondary leading-[1.8]">{cs.approach}</p>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <section aria-labelledby={`${cs.id}-architecture`}>
            <StudyHeading id={`${cs.id}-architecture`} n="05">Architecture decisions</StudyHeading>
            <div className="hidden lg:block">
              <div className="grid grid-cols-[auto_14px_1fr] gap-2 items-baseline">
                {cs.architecture.flatMap((a, i) => [
                  <span key={`ad${i}`} className="mono-md text-primary font-semibold whitespace-nowrap">{a.decision}</span>,
                  <span key={`aa${i}`} className="mono-sm text-text-dim text-center">→</span>,
                  <span key={`ar${i}`} className="text-[13px] text-muted-foreground leading-[1.5]">{a.rationale}</span>,
                ])}
              </div>
            </div>
            <div className="lg:hidden space-y-3">
              {cs.architecture.map((a, i) => (
                <div key={i}>
                  <div className="mono-md text-primary font-semibold">{a.decision}</div>
                  <div className="text-[13px] text-muted-foreground mt-0.5">→ {a.rationale}</div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby={`${cs.id}-tradeoffs`}>
            <StudyHeading id={`${cs.id}-tradeoffs`} n="06">Trade-offs considered</StudyHeading>
            <div className="hidden lg:block">
              <div className="grid grid-cols-[auto_14px_1fr] gap-2 items-baseline">
                {cs.tradeoffs.flatMap((tr, i) => [
                  <span key={`tc${i}`} className="mono-md text-text-secondary font-semibold whitespace-nowrap">{tr.chosen}</span>,
                  <span key={`ta${i}`} className="mono-sm text-text-dim text-center">→</span>,
                  <span key={`tr${i}`} className="text-[13px] text-muted-foreground leading-[1.5]">{tr.rationale}</span>,
                ])}
              </div>
            </div>
            <div className="lg:hidden space-y-3">
              {cs.tradeoffs.map((tr, i) => (
                <div key={i}>
                  <div className="mono-md text-text-secondary font-semibold">{tr.chosen}</div>
                  <div className="text-[13px] text-muted-foreground mt-0.5">→ {tr.rationale}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.04)]" aria-labelledby={`${cs.id}-stack`}>
          <h4 id={`${cs.id}-stack`} className="mono-label tracking-[0.14em] mb-2.5">Tech stack</h4>
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {cs.stack.map((t) => (
              <li key={t}>
                <Chip label={t} variant="blue" />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${cs.id}-results`}>
          <StudyHeading id={`${cs.id}-results`} n="07" accent="green">Measurable results</StudyHeading>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none p-0 m-0">
            {cs.results.map((r) => (
              <li key={r.label} className={styles.resultCard}>
                <div className="font-sans text-[28px] font-extrabold text-success tracking-[-0.04em] leading-none mb-1.5">{r.metric}</div>
                <div className="mono-md text-[rgba(34,197,94,0.5)]">{r.label}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </details>
  );
}

export function CaseStudiesSection() {
  const { ref, fade } = useFadeIn();
  return (
    <section id="projects" className="bg-background py-[88px]">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="02" label="Case Studies" />
        <h2 className="section-heading">Case studies</h2>
        <p className="section-comment mb-9">
          Expand any study for full technical breakdown
        </p>
        <div className="space-y-4">
          {CASE_STUDIES.map((cs) => <CaseStudyPanel key={cs.id} cs={cs} />)}
        </div>
      </div>
    </section>
  );
}
