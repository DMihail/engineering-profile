"use client";

import { MapPin } from "lucide-react";
import { T } from "@/lib/tokens";
import { XP_ENTRIES } from "@/lib/data";
import { useFadeIn } from "@/lib/hooks";
import { SectionLabel } from "@/components/ui/primitives";

export function ExperienceSection() {
  const { ref, fade } = useFadeIn();
  return (
    <section id="experience" style={{ background: T.bg, padding: "80px 0" }}>
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6" style={fade}>
        <SectionLabel n="04" label="Experience" />
        <h2 style={{ fontFamily: T.sans, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.025em", color: T.p, marginBottom: "40px" }}>
          Engineering history
        </h2>

        <div className="relative">
          <div className="absolute top-2 bottom-8 w-px hidden md:block" style={{ left: 0, background: "linear-gradient(to bottom, rgba(56,189,248,0.4), rgba(56,189,248,0.03))" }} />
          <div className="space-y-5">
            {XP_ENTRIES.map((xp) => (
              <div key={xp.company} className="relative md:pl-10">
                <div className="absolute hidden md:block" style={{ left: "-5px", top: "22px", width: "10px", height: "10px", borderRadius: "50%", background: xp.current ? T.blue : T.card, border: `2px solid ${xp.current ? T.blue : "rgba(56,189,248,0.3)"}`, boxShadow: xp.current ? "0 0 10px rgba(56,189,248,0.5)" : "none" }} />
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ background: T.card, border: `1px solid ${T.bd}`, transition: "border-color 200ms" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.16)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = T.bd; }}
                >
                  <div className="p-5 sm:p-6 pb-3 sm:pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 600, color: T.p, letterSpacing: "-0.01em" }}>{xp.role}</h3>
                        <div style={{ fontSize: "13px", color: T.blue, marginTop: "2px" }}>{xp.company}</div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontFamily: T.mono, fontSize: "11px", color: T.m }}>{xp.period}</div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <MapPin size={10} style={{ color: T.d }} />
                          <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.d }}>{xp.location}</span>
                        </div>
                        {xp.current && (
                          <div className="flex items-center gap-1.5 justify-end mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.green }} />
                            <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.green, letterSpacing: "0.06em" }}>CURRENT</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, flexShrink: 0, marginTop: "1px" }}>systems</span>
                      <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>→</span>
                      <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.f, lineHeight: 1.6 }}>{xp.systems}</span>
                    </div>
                  </div>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
                    <ul className="space-y-2">
                      {xp.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.d, marginTop: "4px", flexShrink: 0 }}>→</span>
                          <span style={{ fontSize: "13px", color: T.s, lineHeight: "1.65" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
