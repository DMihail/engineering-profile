import { SKILL_LAYERS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/fade-in";

export function SkillsSection() {
  return (
    <section id="skills" className="section-surface">
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionLabel n="03" label="Skills" />
        <h2 className="section-heading mb-2">Technical stack</h2>
        <p className="section-comment mb-9">
          6 domains — primary tools highlighted
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {SKILL_LAYERS.map((layer) => (
            <div key={layer.id} className="panel panel-hover">
              <div className="px-4 pt-3 pb-2.5 border-b border-border bg-[rgba(255,255,255,0.02)]">
                <div className="mono-sm font-semibold text-primary tracking-[0.04em]">{layer.layer}</div>
                <div className="mono-xs text-text-dim mt-0.5">{layer.desc}</div>
                <div className="mt-2">
                  <span className="mono-xs text-text-faint">{layer.projectRefs}</span>
                </div>
              </div>
              <div className="p-3 grid grid-cols-2 gap-1.5">
                {layer.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={`${layer.id}-${skill.name}`}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md border cursor-default transition-[transform,border-color] duration-150 hover:scale-[1.02] ${skill.primary ? "border-[rgba(56,189,248,0.15)] bg-[rgba(56,189,248,0.06)] hover:border-[rgba(56,189,248,0.32)]" : "border-border bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"}`}
                    >
                      <SkillIcon size={12} className={`shrink-0 ${skill.primary ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`mono-sm truncate ${skill.primary ? "text-text-secondary" : "text-muted-foreground"}`}>
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
