import { CAPABILITIES } from "@/lib/data/capabilities";
import { SectionHeader, Chip, sectionHeadingId } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";
import styles from "@/styles/sections/impact-section.module.css";

export function ImpactSection() {
  const headingId = sectionHeadingId("impact");

  return (
    <section id="impact" className="section-surface section-cv-auto border-t border-border-primary-soft" aria-labelledby={headingId}>
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader sectionId="impact" />

        <div className="hidden lg:block rounded-xl overflow-hidden border border-border impact-table-wrap">
          <table className={styles.capTable} aria-describedby="impact-table-caption">
            <caption id="impact-table-caption" className="sr-only">
              Capabilities by domain with summary and benchmark
            </caption>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="mono-label">Domain</th>
                <th scope="col" className="mono-label">Summary</th>
                <th scope="col" className="mono-label">Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((cap) => {
                const CapIcon = cap.icon;
                return (
                  <tr key={cap.id}>
                    <th scope="row">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={styles.iconBox}>
                          <CapIcon size={13} className="text-primary" aria-hidden />
                        </div>
                        <span className={styles.capRowTitle}>{cap.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {cap.tags.slice(0, 3).map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </div>
                      <div className="mono-xs text-text-faint">{cap.appliedIn}</div>
                    </th>
                    <td>
                      <p className="text-sm text-text-secondary leading-body text-pretty">{cap.desc}</p>
                    </td>
                    <td className={styles.capTarget}>
                      <div className={`${styles.capKpi} cap-kpi-cell`}>{cap.kpi}</div>
                      <div className="mono-xs text-success-dim mt-1 leading-snug">{cap.kpiSub}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden grid gap-4">
          {CAPABILITIES.map((cap) => {
            const CapIcon = cap.icon;
            return (
              <article key={cap.id} className="panel">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="icon-well icon-well-md">
                        <CapIcon size={14} className="text-primary" aria-hidden />
                      </div>
                      <h3 className="font-sans text-sm font-semibold text-foreground leading-snug">{cap.title}</h3>
                    </div>
                    <div className="text-end shrink-0 max-w-[42%]">
                      <div className={styles.capKpiMobile}>{cap.kpi}</div>
                      <div className="mono-2xs text-success-dim leading-snug">{cap.kpiSub}</div>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-body mb-2 text-pretty">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">{cap.tags.map((t) => <Chip key={t} label={t} />)}</div>
                  <div className="mono-xs text-text-faint">{cap.appliedIn}</div>
                </div>
              </article>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
