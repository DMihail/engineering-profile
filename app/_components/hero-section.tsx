"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { T } from "./tokens";
import { TRACK_RECORD } from "./data";

export function HeroSection() {
  const [cursor, setCursor] = useState(true);
  const [rdy, setRdy] = useState(false);
  useEffect(() => {
    const c = setInterval(() => setCursor((v) => !v), 540);
    const r = setTimeout(() => setRdy(true), 80);
    return () => { clearInterval(c); clearTimeout(r); };
  }, []);
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: T.bg, paddingTop: "52px" }}>

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: ["linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px)", "linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)"].join(", "), backgroundSize: "48px 48px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 10%, #0B0F17 100%)" }} />
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.55) 50%, transparent 90%)" }} />

      <div
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
        style={{ opacity: rdy ? 1 : 0, transform: rdy ? "none" : "translateY(24px)", transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.2,0.8,0.2,1)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

          <div className="text-center lg:text-left">

            <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full" style={{ border: "1px solid rgba(34,197,94,0.22)", background: "rgba(34,197,94,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.green, boxShadow: "0 0 6px rgba(34,197,94,0.9)" }} />
              <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.s, letterSpacing: "0.04em" }}>open to contracts · EU / US / Remote</span>
            </div>

            <p style={{ fontFamily: T.mono, fontSize: "10px", color: T.f, letterSpacing: "0.12em", marginBottom: "16px", textTransform: "uppercase" as const }}>
              React Native · Mobile Systems Engineering · Architecture
            </p>

            <h1 style={{ fontFamily: T.sans, fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.96, color: T.p, marginBottom: "28px" }}>
              Mykhailo
              <br />
              <span style={{ color: T.blue }}>Dzhezhelo</span>
            </h1>

            <p style={{ fontFamily: T.sans, fontSize: "clamp(15px, 2vw, 19px)", lineHeight: "1.55", color: T.s, maxWidth: "520px", marginBottom: "12px", fontWeight: 500 }} className="mx-auto lg:mx-0">
              React Native Engineer specializing in real-time systems, native integrations, and performance-critical mobile applications.
            </p>
            <p style={{ fontFamily: T.mono, fontSize: "12px", color: T.m, maxWidth: "480px", marginBottom: "28px", lineHeight: "1.65" }} className="mx-auto lg:mx-0">
              6 years production across iOS, Android, and web — native Swift/Kotlin integrations, real-time system design, and performance engineering.
            </p>

            <div className="rounded-xl mb-8 overflow-hidden text-left" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-4 py-2.5" style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
                  production track record
                </span>
              </div>
              {TRACK_RECORD.map((tr, i) => (
                <div
                  key={tr.label}
                  className="px-4 py-3"
                  style={{ borderBottom: i < TRACK_RECORD.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.blue, flexShrink: 0, marginTop: "1px" }}>→</span>
                      <div className="min-w-0">
                        <div style={{ fontFamily: T.mono, fontSize: "10px", color: T.s, lineHeight: 1.4, marginBottom: "2px" }}>{tr.label}</div>
                        <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>{tr.sub}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.green, flexShrink: 0, paddingLeft: "20px" }} className="sm:pl-0 sm:text-right">
                      {tr.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <button
                onClick={() => goto("projects")}
                className="flex items-center justify-center gap-2"
                style={{ padding: "13px 26px", borderRadius: "10px", background: T.blue, color: T.bg, fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 200ms, transform 150ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#7DD3FC"; el.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = T.blue; el.style.transform = "none"; }}
              >
                View Case Studies <ArrowRight size={14} />
              </button>
              <button
                onClick={() => goto("contact")}
                className="flex items-center justify-center gap-2"
                style={{ padding: "13px 26px", borderRadius: "10px", color: T.p, fontSize: "14px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", transition: "border-color 200ms, background 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(56,189,248,0.35)"; el.style.background = "rgba(56,189,248,0.05)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.background = "transparent"; }}
              >
                Get in touch <Mail size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center lg:justify-start">
              {[
                { t: "github.com/mykhailo-dzhezhelo",     h: "https://github.com"         },
                { t: "linkedin.com/in/mykhailo-dzhezhelo", h: "https://linkedin.com"       },
                { t: "hello@dzhezhelo.dev",               h: "mailto:hello@dzhezhelo.dev" },
              ].map((l) => (
                <a key={l.t} href={l.h} target="_blank" rel="noreferrer" style={{ fontFamily: T.mono, fontSize: "10px", color: T.f, textDecoration: "none", transition: "color 150ms" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = T.blue; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = T.f; }}>
                  {l.t}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div style={{ background: T.card, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden", boxShadow: "0 0 80px rgba(56,189,248,0.06), 0 40px 80px rgba(0,0,0,0.5)" }}>

              <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: `1px solid ${T.bd}`, background: "rgba(255,255,255,0.02)" }}>
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-auto flex items-center gap-1.5">
                  <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.m }}>developer.sys</span>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse ml-2" style={{ background: T.green, boxShadow: "0 0 5px rgba(34,197,94,0.8)" }} />
                  <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.green }}>LIVE</span>
                </span>
              </div>

              <div className="px-5 pt-5 pb-2 space-y-2.5">
                {[
                  { k: "name",           v: "Mykhailo Dzhezhelo",                  c: T.p     },
                  { k: "role",           v: "React Native · Mobile Systems",        c: T.blue  },
                  { k: "specialization", v: "native_modules · realtime · offline",  c: T.s     },
                  { k: "platforms",      v: "iOS · Android · Web",                  c: T.s     },
                  { k: "experience",     v: "6+ years production",                  c: T.p     },
                  { k: "perf_target",    v: "< 16ms frame · < 100ms ws",            c: T.green },
                  { k: "status",         v: "open to contracts",                    c: T.green },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline gap-2">
                    <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.f, width: "92px", flexShrink: 0 }}>{r.k}</span>
                    <span style={{ fontFamily: T.mono, fontSize: "9px", color: "rgba(55,65,81,0.5)" }}>→</span>
                    <span style={{ fontFamily: T.mono, fontSize: "11px", color: r.c }}>{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="mx-5 my-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "6px" }}>build pipeline</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {[{ l: "types", v: "clean" }, { l: "lint", v: "zero" }, { l: "bundle", v: "opt." }, { l: "deploy", v: "prod" }].map((b) => (
                    <div key={b.l} className="flex items-center gap-1.5">
                      <span style={{ color: T.green, fontSize: "9px" }}>✓</span>
                      <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>{b.l}:</span>
                      <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.green }}>{b.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-5 mb-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.d, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "6px" }}>active context</div>
                {[
                  { n: "FocusGuard",  t: "native-bridge · iOS"    },
                  { n: "Waddingtons", t: "event-driven · realtime" },
                  { n: "Vitadrop",    t: "offline-first · mobile"  },
                ].map((c) => (
                  <div key={c.n} className="flex items-center gap-1.5 mb-1.5">
                    <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.d }}>↳</span>
                    <span style={{ fontFamily: T.mono, fontSize: "10px", color: T.blue }}>{c.n}</span>
                    <span style={{ fontFamily: T.mono, fontSize: "9px", color: T.f }}>{c.t}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-4">
                <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.blue }}>$ </span>
                <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.m }}>ready --hire</span>
                <span style={{ display: "inline-block", width: "7px", height: "13px", background: T.blue, marginLeft: "3px", verticalAlign: "middle", opacity: cursor ? 1 : 0, transition: "opacity 80ms" }} />
              </div>

              <div className="grid grid-cols-3" style={{ borderTop: `1px solid ${T.bd}` }}>
                {[{ v: "6+", l: "yrs exp" }, { v: "20+", l: "shipped" }, { v: "4.8★", l: "rating" }].map((m, i) => (
                  <div key={m.l} className="py-3.5 text-center" style={i < 2 ? { borderRight: `1px solid ${T.bd}` } : {}}>
                    <div style={{ fontFamily: T.sans, fontSize: "18px", fontWeight: 700, color: T.p, letterSpacing: "-0.03em" }}>{m.v}</div>
                    <div style={{ fontFamily: T.mono, fontSize: "8px", color: T.m, marginTop: "2px" }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-3 gap-3 mt-10">
          {[{ v: "6+", l: "years" }, { v: "20+", l: "shipped" }, { v: "4.8★", l: "rating" }].map((m) => (
            <div key={m.l} className="text-center py-4 rounded-xl" style={{ background: T.card, border: `1px solid ${T.bd}` }}>
              <div style={{ fontFamily: T.sans, fontSize: "20px", fontWeight: 700, color: T.p }}>{m.v}</div>
              <div style={{ fontFamily: T.mono, fontSize: "9px", color: T.m, marginTop: "2px" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
