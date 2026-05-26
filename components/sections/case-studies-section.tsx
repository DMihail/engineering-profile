"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CaseStudy } from "@/lib/types";
import { CASE_STUDIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel, Chip } from "@/components/ui/primitives";

function StudyLabel({ n, children, accent = "blue" }: { n: string; children: string; accent?: "blue" | "green" }) {
  return (
    <div className={`study-label ${accent === "blue" ? "study-label-blue" : "study-label-green"}`}>
      <span className={accent === "blue" ? "text-[rgba(56,189,248,0.35)]" : "text-[rgba(34,197,94,0.35)]"} style={{ fontWeight: 500 }}>{n}</span>
      <span>{"// "}{children}</span>
    </div>
  );
}

function CaseStudyPanel({ cs }: { cs: CaseStudy }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-card rounded-[14px] overflow-hidden border transition-[border-color,box-shadow] duration-300 ${open ? "border-[rgba(56,189,248,0.24)] shadow-[0_0_60px_rgba(56,189,248,0.07)]" : "border-border"}`}>
      <div
        className={`cursor-pointer select-none p-[22px_24px] transition-colors ${!open ? "hover:bg-[rgba(255,255,255,0.013)]" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-5">
          <span className={`hidden sm:block shrink-0 font-mono text-[38px] font-bold tracking-[-0.05em] leading-none mt-0.5 transition-colors duration-300 ${open ? "text-[rgba(56,189,248,0.3)]" : "text-[rgba(255,255,255,0.05)]"}`}>
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
            <p className="text-[13px] text-text-secondary leading-[1.62] max-w-[580px] mb-2.5">{cs.summary}</p>

            <div className="hidden sm:flex items-baseline gap-1.5 flex-wrap">
              <span className="mono-xs text-text-dim shrink-0">arch:</span>
              <span className="mono-xs text-text-faint leading-[1.6]">{cs.archSig}</span>
            </div>

            <div className="sm:hidden mt-3 space-y-3">
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

          <div className="hidden sm:flex flex-col items-end gap-3 shrink-0">
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[240px]">
              {cs.stack.slice(0, 4).map((t) => <Chip key={t} label={t} />)}
            </div>
            <div className="flex gap-5">
              {cs.results.map((r) => (
                <div key={r.label} className="text-right">
                  <div className="font-sans text-[15px] font-bold text-success tracking-[-0.025em]">{r.metric}</div>
                  <div className="mono-xs text-text-dim mt-px">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`shrink-0 self-start mt-1.5 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${open ? "rotate-180" : "rotate-0"}`}>
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      <div style={{ maxHeight: open ? "3200px" : "0", overflow: "hidden", opacity: open ? 1 : 0, transition: open ? "max-height 900ms cubic-bezier(0,0,0.2,1), opacity 440ms ease 80ms" : "max-height 280ms cubic-bezier(0.4,0,1,1), opacity 160ms ease" }}>
        <div className="border-t border-[rgba(56,189,248,0.1)] bg-[rgba(9,13,22,0.8)] p-[32px_24px]">

          <div className="mb-7">
            <StudyLabel n="01">Context</StudyLabel>
            <p className="text-[13px] text-muted-foreground leading-[1.78] italic">{cs.context}</p>
          </div>

          <div className="problem-box mb-8">
            <StudyLabel n="02">Problem Statement</StudyLabel>
            <p className="text-sm text-text-secondary leading-[1.8]">{cs.problem}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <StudyLabel n="03">Technical Constraints</StudyLabel>
              <ul className="space-y-3">
                {cs.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mono-sm text-text-dim mt-[3px] shrink-0">{"//"}  </span>
                    <span className="text-xs text-muted-foreground leading-[1.7]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <StudyLabel n="04">Technical Approach</StudyLabel>
              <p className="text-[13px] text-text-secondary leading-[1.8]">{cs.approach}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <StudyLabel n="05">Architecture Decisions</StudyLabel>
              <div className="hidden sm:block">
                <div className="grid grid-cols-[auto_14px_1fr] gap-2 items-baseline">
                  {cs.architecture.flatMap((a, i) => [
                    <span key={`ad${i}`} className="mono-md text-primary font-semibold whitespace-nowrap">{a.decision}</span>,
                    <span key={`aa${i}`} className="mono-sm text-text-dim text-center">→</span>,
                    <span key={`ar${i}`} className="text-xs text-muted-foreground leading-[1.5]">{a.rationale}</span>,
                  ])}
                </div>
              </div>
              <div className="sm:hidden space-y-3">
                {cs.architecture.map((a, i) => (
                  <div key={i}>
                    <div className="mono-md text-primary font-semibold">{a.decision}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">→ {a.rationale}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <StudyLabel n="06">Trade-offs Considered</StudyLabel>
              <div className="hidden sm:block">
                <div className="grid grid-cols-[auto_14px_1fr] gap-2 items-baseline">
                  {cs.tradeoffs.flatMap((tr, i) => [
                    <span key={`tc${i}`} className="mono-md text-text-secondary font-semibold whitespace-nowrap">{tr.chosen}</span>,
                    <span key={`ta${i}`} className="mono-sm text-text-dim text-center">→</span>,
                    <span key={`tr${i}`} className="text-xs text-muted-foreground leading-[1.5]">{tr.rationale}</span>,
                  ])}
                </div>
              </div>
              <div className="sm:hidden space-y-3">
                {cs.tradeoffs.map((tr, i) => (
                  <div key={i}>
                    <div className="mono-md text-text-secondary font-semibold">{tr.chosen}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">→ {tr.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-[rgba(255,255,255,0.04)]">
            <div className="mono-label tracking-[0.14em] mb-2.5">{"// Tech Stack"}</div>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((t) => <Chip key={t} label={t} variant="blue" />)}
            </div>
          </div>

          <div>
            <StudyLabel n="07" accent="green">Measurable Results</StudyLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cs.results.map((r) => (
                <div key={r.label} className="result-card">
                  <div className="font-sans text-[28px] font-extrabold text-success tracking-[-0.04em] leading-none mb-1.5">{r.metric}</div>
                  <div className="mono-md text-[rgba(34,197,94,0.5)]">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function CaseStudiesSection() {
  const { ref, fade } = useFadeIn();
  return (
    <section id="projects" className="bg-background py-[88px]">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="02" label="Case Studies" />
        <h2 className="section-heading">Engineering case studies</h2>
        <p className="section-comment mb-9">
          {"// expand any study → 7-section breakdown: context · problem · constraints · approach · architecture · trade-offs · results"}
        </p>
        <div className="space-y-4">
          {CASE_STUDIES.map((cs) => <CaseStudyPanel key={cs.id} cs={cs} />)}
        </div>
      </div>
    </section>
  );
}
