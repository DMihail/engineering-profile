import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { SITE_AUTHOR, SITE_HERO_AVAILABILITY, SITE_HERO_INTRO, SITE_LOCATION, SITE_ROLE } from "@/lib/config";
import { HERO_CTA, HERO_STATS } from "@/lib/data";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/hero-section.module.css";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-hero flex items-center overflow-hidden bg-background pt-(--nav-h)"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-vignette" aria-hidden />
      <div className={`absolute top-0 inset-x-0 h-px pointer-events-none ${styles.heroLine}`} aria-hidden />

      <div className={`relative w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:max-w-4xl ${styles.heroEntrance}`}>
        <div className="text-center lg:text-left">
          <div className={`${styles.badgeAvailable} mb-6 mx-auto lg:mx-0`}>
            <span className="status-dot-sm animate-pulse" aria-hidden />
            <span className="text-sm text-text-secondary">
              {SITE_HERO_AVAILABILITY} · {SITE_LOCATION}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="font-sans font-extrabold mb-3 tracking-[-0.045em] leading-[0.98] text-foreground text-hero-name text-balance"
          >
            <span className="sr-only">{SITE_AUTHOR} — {SITE_ROLE}. </span>
            {SITE_AUTHOR.split(" ")[0]}
            <br />
            <span className="text-primary">{SITE_AUTHOR.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="font-semibold leading-snug text-text-secondary text-hero-lead mb-4">{SITE_ROLE}</p>

          <p className="text-hero-support sm:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0 text-pretty">
            {SITE_HERO_INTRO}
          </p>

          <div
            role="group"
            aria-label={UI_LABELS.hero.primaryActions}
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-12"
          >
            <a href={HERO_CTA.cv} download className="btn-primary no-underline min-h-11">
              <Download size={15} aria-hidden />
              {UI_LABELS.hero.downloadCv}
            </a>
            <a
              href={HERO_CTA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline min-h-11"
            >
              <GithubIcon size={15} aria-hidden />
              {UI_LABELS.hero.github}
            </a>
            <a
              href={HERO_CTA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline no-underline min-h-11"
            >
              <LinkedinIcon size={15} aria-hidden />
              {UI_LABELS.hero.linkedin}
            </a>
            <a href={HERO_CTA.contact} className="btn-outline no-underline min-h-11">
              <Mail size={15} aria-hidden />
              {UI_LABELS.hero.contact}
            </a>
          </div>

          <ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0 list-none p-0 m-0"
            aria-label={UI_LABELS.hero.careerHighlights}
          >
            {HERO_STATS.map((m) => (
              <li
                key={m.label}
                className="text-center py-4 px-2 rounded-xl bg-card border border-border"
              >
                <p className="font-sans text-hero-stat font-bold text-foreground tracking-[-0.03em] m-0">
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug m-0">{m.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
