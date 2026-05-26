"use client";

import { T } from "./tokens";
import { SKILL_LAYERS } from "./data";
import { useFadeIn } from "./hooks";
import { SectionLabel } from "./primitives";

export function SkillsSection() {
  const { ref, fade } = useFadeIn();
  return (
    <section id="skills" style={{ background: T.surf, padding: "80px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="03" label="System Modules" />
        <h2 style={{ fontFamily: T.sans, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "8px" }}>
          Technical systems
        </h2>
        <p style={{ fontFamily: T.mono, fontSize: "11px", color: T.m, marginBottom: "36px" }}>
          {"// 6 engineering domains — primary tools highlighted · production-verified"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {SKILL_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="rounded-xl overflow-hidden"
              style={{ background: T.card, border: `1px solid ${T.bd}`, transition: "border-color 200ms, box-shadow 200ms" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.bdH; el.style.boxShadow = "0 0 28px rgba(56,189,248,0.05)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.bd; el.style.boxShadow = "none"; }}
            >
              <div className="px-4 pt-3 pb-2.5" style={{ borderBottom: `1px solid ${T.bd}`, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontFamily: T.mono, fontSize: "10px", fontWeight: 600, color: T.blue, letterSpacing: "0.04em" }}>{layer.layer}</div>
                <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, marginTop: "2px" }}>{layer.desc}</div>
                <div className="flex items-center justify-between mt-3">
                  <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.f }}>{"// "}{layer.projectRefs}</span>
                  <span style={{ fontFamily: T.mono, fontSize: "8px", color: T.d, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>{layer.scope}</span>
                </div>
              </div>
              <div className="p-3 grid grid-cols-2 gap-1.5">
                {layer.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={`${layer.id}-${skill.name}`}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-md"
                      style={{ border: `1px solid ${skill.primary ? "rgba(56,189,248,0.15)" : T.bd}`, background: skill.primary ? "rgba(56,189,248,0.06)" : "rgba(255,255,255,0.02)", transition: "transform 150ms, border-color 150ms", cursor: "default" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.02)"; el.style.borderColor = skill.primary ? "rgba(56,189,248,0.32)" : "rgba(255,255,255,0.12)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.borderColor = skill.primary ? "rgba(56,189,248,0.15)" : T.bd; }}
                    >
                      <SkillIcon size={12} style={{ color: skill.primary ? T.blue : T.m, flexShrink: 0 }} />
                      <span style={{ fontFamily: T.mono, fontSize: "10px", color: skill.primary ? T.s : T.m, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
