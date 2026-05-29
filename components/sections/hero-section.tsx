import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { HERO_CTA, HERO_STATS } from "@/lib/data";
import styles from "@/styles/sections/hero-section.module.css";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center overflow-hidden bg-background pt-13" aria-label="Introduction">

      <div className="absolute inset-0 pointer-events-none bg-grid" />
      <div className="absolute inset-0 pointer-events-none bg-vignette" />
      <div className={`absolute top-0 inset-x-0 h-px pointer-events-none ${styles.heroLine}`} />

      <div className={`relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:max-w-4xl ${styles.heroEntrance}`}>
        <div className="text-center lg:text-left">

          <div className={`${styles.badgeAvailable} mb-8 mx-auto lg:mx-0`}>
            <span className="status-dot-sm animate-pulse" aria-hidden />
            <span className="text-sm text-text-secondary">Available for remote and onsite opportunities.</span>
          </div>

          <h1 className="font-sans font-extrabold mb-6 tracking-[-0.045em] leading-[0.98] text-foreground text-hero-name">
            Mykhailo
            <br />
            <span className="text-primary">Dzhezhelo</span>
          </h1>

          <p className="font-sans font-medium mb-4 leading-[1.55] text-text-secondary text-hero-lead max-w-2xl mx-auto lg:mx-0">
            React Native Engineer building high-performance mobile applications, realtime systems, and native integrations.
          </p>

          <p className="text-hero-support sm:text-base text-muted-foreground max-w-xl mb-10 leading-[1.65] mx-auto lg:mx-0">
            Focused on performance, realtime processing, and production-grade mobile architecture.
          </p>

          <nav className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-12" aria-label="Primary actions">
            <a href={HERO_CTA.cv} download className="btn-primary no-underline min-h-11">
              <Download size={15} aria-hidden />
              Download CV
            </a>
            <a href={HERO_CTA.github} target="_blank" rel="noreferrer" className="btn-outline no-underline min-h-11">
              <GithubIcon size={15} />
              GitHub
            </a>
            <a href={HERO_CTA.linkedin} target="_blank" rel="noreferrer" className="btn-outline no-underline min-h-11">
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
            <a href={HERO_CTA.contact} className="btn-outline no-underline min-h-11">
              <Mail size={15} aria-hidden />
              Contact
            </a>
          </nav>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0" aria-label="Experience highlights">
            {HERO_STATS.map((m) => (
              <div key={m.label} className="text-center py-4 px-2 rounded-xl bg-card border border-border">
                <div className="font-sans text-hero-stat font-bold text-foreground tracking-[-0.03em]">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
