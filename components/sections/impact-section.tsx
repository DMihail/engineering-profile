"use client";

import { T } from "@/lib/tokens";
import { CAPABILITIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel, Chip } from "@/components/ui/primitives";

export function ImpactSection() {
  const { ref, fade } = useFadeIn();

  return (
    <section id="impact" style={{ background: T.surf, borderTop: "1px solid rgba(56,189,248,0.1)", padding: "96px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="01" label="Engineering Capabilities" />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <h2 style={{ fontFamily: T.sans, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "6px" }}>
              Engineering capability matrix
            </h2>
            <p style={{ fontFamily: T.mono, fontSize: "11px", color: T.m }}>
              {"// production-verified · performance-validated · applied across real systems"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.green, boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
            <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.green, letterSpacing: "0.1em" }}>5 / 5 SYSTEMS OPERATIONAL</span>
          </div>
        </div>

        <div className="hidden sm:block rounded-xl overflow-hidden" style={{ border: `1px solid ${T.bd}` }}>
          <div
            className="grid items-center"
            style={{ gridTemplateColumns: "220px 1fr 120px", padding: "9px 24px", background: "rgba(255,255,255,0.025)", borderBottom: `1px solid ${T.bd}` }}
          >
            <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Module</span>
            <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Capability</span>
            <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const, textAlign: "right" as const }}>SLA / KPI</span>
          </div>

          {CAPABILITIES.map((cap, i) => {
            const CapIcon = cap.icon;
            const isLast = i === CAPABILITIES.length - 1;
            return (
              <div
                key={cap.id}
                className="grid items-start gap-6"
                style={{
                  gridTemplateColumns: "220px 1fr 120px",
                  padding: "20px 24px",
                  background: i % 2 === 0 ? T.card : "rgba(17,24,39,0.6)",
                  borderBottom: isLast ? "none" : `1px solid ${T.bd}`,
                  transition: "background 200ms",
                  cursor: "default",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(56,189,248,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? T.card : "rgba(17,24,39,0.6)"; }}
              >
                <div>
                  <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.08em", marginBottom: "5px" }}>{cap.mod}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0" style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.12)" }}>
                      <CapIcon size={13} style={{ color: T.blue }} />
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: "13px", fontWeight: 600, color: T.p, letterSpacing: "-0.01em" }}>{cap.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cap.tags.slice(0, 3).map((tag) => <Chip key={tag} label={tag} />)}
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.f }}>{"// "}{cap.appliedIn}</div>
                </div>

                <p style={{ fontSize: "13px", color: T.s, lineHeight: "1.68" }}>{cap.desc}</p>

                <div className="text-right">
                  <div style={{ fontFamily: T.mono, fontSize: "20px", fontWeight: 700, color: T.green, letterSpacing: "-0.03em", lineHeight: 1 }}>{cap.kpi}</div>
                  <div style={{ fontFamily: T.mono, fontSize: "9px", color: "rgba(34,197,94,0.5)", marginTop: "3px" }}>{cap.kpiSub}</div>
                  <div className="flex items-center gap-1.5 justify-end mt-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.green, boxShadow: "0 0 4px rgba(34,197,94,0.7)" }} />
                    <span style={{ fontFamily: T.mono, fontSize: "8px", color: T.green, letterSpacing: "0.08em" }}>OPERATIONAL</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden grid gap-4">
          {CAPABILITIES.map((cap) => {
            const CapIcon = cap.icon;
            return (
              <div key={cap.id} className="rounded-xl overflow-hidden" style={{ background: T.card, border: `1px solid ${T.bd}` }}>
                <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${T.bd}`, background: "rgba(255,255,255,0.02)" }}>
                  <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>{cap.mod}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.green }} />
                    <span style={{ fontFamily: T.mono, fontSize: "8px", color: T.green }}>OPERATIONAL</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "rgba(56,189,248,0.1)" }}>
                        <CapIcon size={14} style={{ color: T.blue }} />
                      </div>
                      <span style={{ fontFamily: T.sans, fontSize: "13px", fontWeight: 600, color: T.p }}>{cap.title}</span>
                    </div>
                    <div className="text-right ml-3 shrink-0">
                      <div style={{ fontFamily: T.mono, fontSize: "16px", fontWeight: 700, color: T.green }}>{cap.kpi}</div>
                      <div style={{ fontFamily: T.mono, fontSize: "8px", color: "rgba(34,197,94,0.5)" }}>{cap.kpiSub}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: T.s, lineHeight: "1.68", marginBottom: "8px" }}>{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">{cap.tags.map((t) => <Chip key={t} label={t} />)}</div>
                  <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.f }}>{"// "}{cap.appliedIn}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
