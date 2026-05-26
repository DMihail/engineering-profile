"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { T } from "@/lib/tokens";
import type { CaseStudy } from "@/lib/types";
import { CASE_STUDIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel, Chip } from "@/components/ui/primitives";

function StudyLabel({ n, children, accent = T.blue }: { n: string; children: string; accent?: string }) {
  return (
    <div style={{
      fontFamily: T.mono, fontSize: "9px", letterSpacing: "0.14em",
      color: accent, textTransform: "uppercase" as const,
      marginBottom: "10px", paddingBottom: "6px",
      borderBottom: `1px solid ${accent === T.blue ? "rgba(56,189,248,0.09)" : "rgba(34,197,94,0.09)"}`,
      display: "flex", alignItems: "center", gap: "8px",
    }}>
      <span style={{ color: accent === T.blue ? "rgba(56,189,248,0.35)" : "rgba(34,197,94,0.35)", fontWeight: 500 }}>{n}</span>
      <span>{"// "}{children}</span>
    </div>
  );
}

function CaseStudyPanel({ cs }: { cs: CaseStudy }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: T.card, borderRadius: "14px", overflow: "hidden",
        border: `1px solid ${open ? "rgba(56,189,248,0.24)" : T.bd}`,
        transition: "border-color 300ms, box-shadow 300ms",
        boxShadow: open ? "0 0 60px rgba(56,189,248,0.07)" : "none",
      }}
    >
      <div
        className="cursor-pointer select-none"
        style={{ padding: "22px 24px" }}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) => { if (!open) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.013)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
      >
        <div className="flex items-start gap-5">
          <span className="hidden sm:block shrink-0" style={{ fontFamily: T.mono, fontSize: "38px", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, marginTop: "2px", color: open ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.05)", transition: "color 300ms" }}>
            {cs.num}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2.5">
              <span className="sm:hidden" style={{ fontFamily: T.mono, fontSize: "11px", color: "rgba(56,189,248,0.35)", fontWeight: 700 }}>#{cs.num}</span>
              <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>{cs.type}</span>
              <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.f }}>·</span>
              <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.blue, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.18)", padding: "1px 7px", borderRadius: "4px" }}>
                {cs.archType}
              </span>
              <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.f }}>·</span>
              <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.f }}>{cs.version}</span>
            </div>

            <h3 style={{ fontFamily: T.sans, fontSize: "20px", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "7px" }}>{cs.title}</h3>
            <p style={{ fontSize: "13px", color: T.s, lineHeight: "1.62", maxWidth: "580px", marginBottom: "10px" }}>{cs.summary}</p>

            <div className="hidden sm:flex items-baseline gap-1.5 flex-wrap">
              <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, flexShrink: 0 }}>arch:</span>
              <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.f, lineHeight: 1.6 }}>{cs.archSig}</span>
            </div>

            <div className="sm:hidden mt-3 space-y-3">
              <div className="flex flex-wrap gap-1.5">{cs.stack.slice(0, 4).map((t) => <Chip key={t} label={t} />)}</div>
              <div className="flex flex-wrap gap-4">
                {cs.results.map((r) => (
                  <div key={r.label}>
                    <div style={{ fontFamily: T.sans, fontSize: "14px", fontWeight: 700, color: T.green }}>{r.metric}</div>
                    <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-3 shrink-0">
            <div className="flex flex-wrap justify-end gap-1.5" style={{ maxWidth: "240px" }}>
              {cs.stack.slice(0, 4).map((t) => <Chip key={t} label={t} />)}
            </div>
            <div className="flex gap-5">
              {cs.results.map((r) => (
                <div key={r.label} className="text-right">
                  <div style={{ fontFamily: T.sans, fontSize: "15px", fontWeight: 700, color: T.green, letterSpacing: "-0.025em" }}>{r.metric}</div>
                  <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, marginTop: "1px" }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 self-start mt-1.5" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 300ms cubic-bezier(0.2,0.8,0.2,1)" }}>
            <ChevronDown size={16} style={{ color: T.m }} />
          </div>
        </div>
      </div>

      <div style={{ maxHeight: open ? "3200px" : "0", overflow: "hidden", opacity: open ? 1 : 0, transition: open ? "max-height 900ms cubic-bezier(0,0,0.2,1), opacity 440ms ease 80ms" : "max-height 280ms cubic-bezier(0.4,0,1,1), opacity 160ms ease" }}>
        <div style={{ borderTop: "1px solid rgba(56,189,248,0.1)", background: "rgba(9,13,22,0.8)", padding: "32px 24px" }}>

          <div style={{ marginBottom: "28px" }}>
            <StudyLabel n="01">Context</StudyLabel>
            <p style={{ fontSize: "13px", color: T.m, lineHeight: "1.78", fontStyle: "italic" }}>{cs.context}</p>
          </div>

          <div style={{ marginBottom: "32px", padding: "20px", borderRadius: "10px", background: "rgba(56,189,248,0.03)", border: "1px solid rgba(56,189,248,0.08)" }}>
            <StudyLabel n="02">Problem Statement</StudyLabel>
            <p style={{ fontSize: "14px", color: T.s, lineHeight: "1.8" }}>{cs.problem}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "32px" }}>
            <div>
              <StudyLabel n="03">Technical Constraints</StudyLabel>
              <ul className="space-y-3">
                {cs.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, marginTop: "3px", flexShrink: 0 }}>{"//"}  </span>
                    <span style={{ fontSize: "12px", color: T.m, lineHeight: "1.7" }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <StudyLabel n="04">Technical Approach</StudyLabel>
              <p style={{ fontSize: "13px", color: T.s, lineHeight: "1.8" }}>{cs.approach}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: "32px" }}>
            <div>
              <StudyLabel n="05">Architecture Decisions</StudyLabel>
              <div className="hidden sm:block">
                <div style={{ display: "grid", gridTemplateColumns: "auto 14px 1fr", gap: "8px 8px", alignItems: "baseline" }}>
                  {cs.architecture.flatMap((a, i) => [
                    <span key={`ad${i}`} style={{ fontFamily: T.mono, fontSize: "11px", color: T.blue, fontWeight: 600, whiteSpace: "nowrap" as const }}>{a.decision}</span>,
                    <span key={`aa${i}`} style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, textAlign: "center" as const }}>→</span>,
                    <span key={`ar${i}`} style={{ fontSize: "12px", color: T.m, lineHeight: "1.5" }}>{a.rationale}</span>,
                  ])}
                </div>
              </div>
              <div className="sm:hidden space-y-3">
                {cs.architecture.map((a, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.blue, fontWeight: 600 }}>{a.decision}</div>
                    <div style={{ fontSize: "12px", color: T.m, marginTop: "2px" }}>→ {a.rationale}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <StudyLabel n="06">Trade-offs Considered</StudyLabel>
              <div className="hidden sm:block">
                <div style={{ display: "grid", gridTemplateColumns: "auto 14px 1fr", gap: "8px 8px", alignItems: "baseline" }}>
                  {cs.tradeoffs.flatMap((tr, i) => [
                    <span key={`tc${i}`} style={{ fontFamily: T.mono, fontSize: "11px", color: T.s, fontWeight: 600, whiteSpace: "nowrap" as const }}>{tr.chosen}</span>,
                    <span key={`ta${i}`} style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, textAlign: "center" as const }}>→</span>,
                    <span key={`tr${i}`} style={{ fontSize: "12px", color: T.m, lineHeight: "1.5" }}>{tr.rationale}</span>,
                  ])}
                </div>
              </div>
              <div className="sm:hidden space-y-3">
                {cs.tradeoffs.map((tr, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.s, fontWeight: 600 }}>{tr.chosen}</div>
                    <div style={{ fontSize: "12px", color: T.m, marginTop: "2px" }}>→ {tr.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontFamily: T.mono, fontSize: "9px", letterSpacing: "0.14em", color: T.d, textTransform: "uppercase" as const, marginBottom: "10px" }}>{"// Tech Stack"}</div>
            <div className="flex flex-wrap gap-2">
              {cs.stack.map((t) => <Chip key={t} label={t} variant="blue" />)}
            </div>
          </div>

          <div>
            <StudyLabel n="07" accent={T.green}>Measurable Results</StudyLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cs.results.map((r) => (
                <div key={r.label} className="py-5 px-5 rounded-xl" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)" }}>
                  <div style={{ fontFamily: T.sans, fontSize: "28px", fontWeight: 800, color: T.green, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>{r.metric}</div>
                  <div style={{ fontFamily: T.mono, fontSize: "11px", color: "rgba(34,197,94,0.5)" }}>{r.label}</div>
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
    <section id="projects" style={{ background: T.bg, padding: "88px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="02" label="Case Studies" />
        <h2 style={{ fontFamily: T.sans, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "6px" }}>
          Engineering case studies
        </h2>
        <p style={{ fontFamily: T.mono, fontSize: "11px", color: T.m, marginBottom: "36px" }}>
          {"// expand any study → 7-section breakdown: context · problem · constraints · approach · architecture · trade-offs · results"}
        </p>
        <div className="space-y-4">
          {CASE_STUDIES.map((cs) => <CaseStudyPanel key={cs.id} cs={cs} />)}
        </div>
      </div>
    </section>
  );
}
