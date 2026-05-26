import { MapPin } from "lucide-react";
import { XP_ENTRIES } from "@/lib/data";
import { SectionLabel } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-dark">
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel n="04" label="Experience" />
        <h2 className="section-heading mb-10">Experience</h2>

        <div className="relative">
          <div className="absolute top-2 bottom-8 w-px hidden md:block left-0 bg-gradient-to-b from-[rgba(56,189,248,0.4)] to-[rgba(56,189,248,0.03)]" />
          <div className="space-y-5">
            {XP_ENTRIES.map((xp) => (
              <div key={xp.company} className="relative md:pl-10">
                <div className={`absolute hidden md:block w-2.5 h-2.5 rounded-full -left-[5px] top-[22px] border-2 ${xp.current ? "bg-primary border-primary shadow-[0_0_10px_rgba(56,189,248,0.5)]" : "bg-card border-[rgba(56,189,248,0.3)]"}`} />
                <div className="panel panel-hover">
                  <div className="p-5 sm:p-6 pb-3 sm:pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-foreground tracking-[-0.01em]">{xp.role}</h3>
                        <div className="text-sm text-primary mt-0.5">{xp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="mono-md text-muted-foreground">{xp.period}</div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <MapPin size={10} className="text-text-dim" />
                          <span className="mono-sm text-text-dim">{xp.location}</span>
                        </div>
                        {xp.current && (
                          <div className="flex items-center gap-1.5 justify-end mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-success" />
                            <span className="mono-xs text-success tracking-[0.06em]">CURRENT</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                      <span className="mono-xs text-text-faint leading-[1.6]">{xp.systems}</span>
                    </div>
                  </div>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                    <ul className="space-y-2">
                      {xp.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mono-sm text-text-dim mt-1 shrink-0">→</span>
                          <span className="text-sm text-text-secondary leading-[1.65]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
