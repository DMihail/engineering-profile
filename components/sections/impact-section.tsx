import { CAPABILITIES } from "@/lib/data";
import { SectionLabel, Chip } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";
import styles from "@/styles/sections/impact-section.module.css";

export function ImpactSection() {
  return (
    <section id="impact" className="bg-secondary border-t border-[rgba(56,189,248,0.1)] py-24">
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel n="01" label="Capabilities" />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <div>
            <h2 className="section-heading">Core capabilities</h2>
            <p className="section-comment">
              Production-verified across real systems and client projects
            </p>
          </div>
        </div>

        <div className="hidden sm:block rounded-xl overflow-hidden border border-border">
          <div className={`${styles.capGrid} ${styles.capHeader}`}>
            <span className="mono-label">Area</span>
            <span className="mono-label">Description</span>
            <span className={`mono-label ${styles.capHeaderTarget}`}>Target</span>
          </div>

          {CAPABILITIES.map((cap, i) => {
            const CapIcon = cap.icon;
            const isLast = i === CAPABILITIES.length - 1;
            return (
              <div
                key={cap.id}
                className={`${styles.capGrid} ${styles.capRow} cursor-default transition-colors duration-200 hover:bg-[rgba(56,189,248,0.04)] ${i % 2 === 0 ? "bg-card" : "bg-[rgba(17,24,39,0.6)]"} ${!isLast ? "border-b border-border" : ""}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={styles.iconBox}>
                      <CapIcon size={13} className="text-primary" />
                    </div>
                    <span className="font-sans text-sm font-semibold text-foreground tracking-[-0.01em]">{cap.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {cap.tags.slice(0, 3).map((tag) => <Chip key={tag} label={tag} />)}
                  </div>
                  <div className="mono-xs text-text-faint">{cap.appliedIn}</div>
                </div>

                <p className="text-sm text-text-secondary leading-[1.68]">{cap.desc}</p>

                <div className={styles.capTarget}>
                  <div className="font-mono text-[20px] font-bold text-success tracking-[-0.03em] leading-none">{cap.kpi}</div>
                  <div className="mono-xs text-[rgba(34,197,94,0.5)] mt-[3px]">{cap.kpiSub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden grid gap-4">
          {CAPABILITIES.map((cap) => {
            const CapIcon = cap.icon;
            return (
              <div key={cap.id} className="rounded-xl overflow-hidden bg-card border border-border">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(56,189,248,0.1)]">
                        <CapIcon size={14} className="text-primary" />
                      </div>
                      <span className="font-sans text-sm font-semibold text-foreground">{cap.title}</span>
                    </div>
                    <div className="text-right ml-3 shrink-0">
                      <div className="font-mono text-[16px] font-bold text-success">{cap.kpi}</div>
                      <div className="mono-2xs text-[rgba(34,197,94,0.5)]">{cap.kpiSub}</div>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-[1.68] mb-2">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">{cap.tags.map((t) => <Chip key={t} label={t} />)}</div>
                  <div className="mono-xs text-text-faint">{cap.appliedIn}</div>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
