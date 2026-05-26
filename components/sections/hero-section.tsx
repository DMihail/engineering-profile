import { ArrowRight, Mail } from "lucide-react";
import { TRACK_RECORD } from "@/lib/data";
import { SITE_EMAIL } from "@/lib/config";
import styles from "@/styles/sections/hero-section.module.css";

export function HeroSection() {

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background pt-[52px]">

      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <div className="absolute inset-0 pointer-events-none bg-vignette" />
      <div className={`absolute top-0 inset-x-0 h-px pointer-events-none ${styles.heroLine}`} />

      <div className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 ${styles.heroEntrance}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">

          <div className="text-center lg:text-left">

            <div className={`${styles.badgeAvailable} mb-8`}>
              <span className="status-dot-sm animate-pulse" />
              <span className="mono-md tracking-[0.04em] text-text-secondary">open to contracts · EU / US / Remote</span>
            </div>

            <p className="mono-sm tracking-[0.12em] uppercase text-text-faint mb-4">
              React Native · Mobile Systems Engineering · Architecture
            </p>

            <h1 className="font-sans font-extrabold mb-7 tracking-[-0.045em] leading-[0.96] text-foreground text-[clamp(52px,8vw,88px)]">
              Mykhailo
              <br />
              <span className="text-primary">Dzhezhelo</span>
            </h1>

            <p className="font-sans font-medium mb-3 leading-[1.55] text-text-secondary max-w-[520px] text-[clamp(15px,2vw,19px)] mx-auto lg:mx-0">
              React Native Engineer specializing in real-time systems, native integrations, and performance-critical mobile applications.
            </p>
            <p className="mono-base text-muted-foreground max-w-[480px] mb-7 leading-[1.65] mx-auto lg:mx-0">
              6 years production across iOS, Android, and web — native Swift/Kotlin integrations, real-time system design, and performance engineering.
            </p>

            <div className="rounded-xl mb-8 overflow-hidden text-left border border-[rgba(255,255,255,0.07)]">
              <div className="px-4 py-2.5 bg-[rgba(255,255,255,0.025)] border-b border-[rgba(255,255,255,0.05)]">
                <span className="mono-label">production track record</span>
              </div>
              {TRACK_RECORD.map((tr, i) => (
                <div
                  key={tr.label}
                  className={`px-4 py-3 ${i < TRACK_RECORD.length - 1 ? "border-b border-[rgba(255,255,255,0.04)]" : ""} ${i % 2 === 0 ? "bg-[rgba(255,255,255,0.01)]" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="mono-sm text-primary shrink-0 mt-px">→</span>
                      <div className="min-w-0">
                        <div className="mono-sm text-text-secondary leading-[1.4] mb-0.5">{tr.label}</div>
                        <div className="mono-xs text-text-dim">{tr.sub}</div>
                      </div>
                    </div>
                    <div className="mono-xs text-success shrink-0 pl-5 sm:pl-0 sm:text-right">{tr.metric}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <a href="#projects" className="btn-primary no-underline">
                View Case Studies <ArrowRight size={14} />
              </a>
              <a href="#contact" className="btn-outline no-underline">
                Get in touch <Mail size={14} />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center lg:justify-start">
              {[
                { t: "github.com/mykhailo-dzhezhelo", h: "https://github.com" },
                { t: "linkedin.com/in/mykhailo-dzhezhelo", h: "https://linkedin.com" },
                { t: SITE_EMAIL, h: `mailto:${SITE_EMAIL}` },
              ].map((l) => (
                <a key={l.t} href={l.h} target="_blank" rel="noreferrer" className="mono-sm text-text-faint no-underline transition-colors hover:text-primary">
                  {l.t}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className={styles.terminalCard}>

              <div className={styles.terminalHeader}>
                <span className={`${styles.terminalDot} bg-[#FF5F57]`} />
                <span className={`${styles.terminalDot} bg-[#FEBC2E]`} />
                <span className={`${styles.terminalDot} bg-[#28C840]`} />
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="mono-sm text-muted-foreground">developer.sys</span>
                  <span className="status-dot-sm animate-pulse ml-2" />
                  <span className="mono-xs text-success">LIVE</span>
                </span>
              </div>

              <div className="px-5 pt-5 pb-2 space-y-2.5">
                {[
                  { k: "name",           v: "Mykhailo Dzhezhelo",                 c: "text-foreground" },
                  { k: "role",           v: "React Native · Mobile Systems",       c: "text-primary" },
                  { k: "specialization", v: "native_modules · realtime · offline", c: "text-text-secondary" },
                  { k: "platforms",      v: "iOS · Android · Web",                 c: "text-text-secondary" },
                  { k: "experience",     v: "6+ years production",                 c: "text-foreground" },
                  { k: "perf_target",    v: "< 16ms frame · < 100ms ws",           c: "text-success" },
                  { k: "status",         v: "open to contracts",                   c: "text-success" },
                ].map((r) => (
                  <div key={r.k} className="flex items-baseline gap-2">
                    <span className="mono-sm text-text-faint w-[92px] shrink-0">{r.k}</span>
                    <span className="mono-xs text-[rgba(55,65,81,0.5)]">→</span>
                    <span className={`mono-md ${r.c}`}>{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="mx-5 my-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <div className="mono-label mb-1.5">build pipeline</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {[{ l: "types", v: "clean" }, { l: "lint", v: "zero" }, { l: "bundle", v: "opt." }, { l: "deploy", v: "prod" }].map((b) => (
                    <div key={b.l} className="flex items-center gap-1.5">
                      <span className="mono-xs text-success">✓</span>
                      <span className="mono-xs text-text-dim">{b.l}:</span>
                      <span className="mono-xs text-success">{b.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-5 mb-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <div className="mono-label mb-1.5">active context</div>
                {[
                  { n: "FocusGuard",  t: "native-bridge · iOS" },
                  { n: "Waddingtons", t: "event-driven · realtime" },
                  { n: "Vitadrop",    t: "offline-first · mobile" },
                ].map((c) => (
                  <div key={c.n} className="flex items-center gap-1.5 mb-1.5">
                    <span className="mono-xs text-text-dim">↳</span>
                    <span className="mono-sm text-primary">{c.n}</span>
                    <span className="mono-xs text-text-faint">{c.t}</span>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-4">
                <span className="mono-md text-primary">$ </span>
                <span className="mono-md text-muted-foreground">ready --hire</span>
                <span className={`inline-block w-[7px] h-[13px] bg-primary ml-[3px] align-middle ${styles.cursorBlink}`} />
              </div>

              <div className="grid grid-cols-3 border-t border-border">
                {[{ v: "6+", l: "yrs exp" }, { v: "20+", l: "shipped" }, { v: "4.8★", l: "rating" }].map((m, i) => (
                  <div key={m.l} className={`py-3.5 text-center ${i < 2 ? "border-r border-border" : ""}`}>
                    <div className="font-sans text-[18px] font-bold text-foreground tracking-[-0.03em]">{m.v}</div>
                    <div className="mono-2xs text-muted-foreground mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden grid grid-cols-3 gap-3 mt-10">
          {[{ v: "6+", l: "years" }, { v: "20+", l: "shipped" }, { v: "4.8★", l: "rating" }].map((m) => (
            <div key={m.l} className="text-center py-4 rounded-xl bg-card border border-border">
              <div className="font-sans text-[20px] font-bold text-foreground">{m.v}</div>
              <div className="mono-xs text-muted-foreground mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
