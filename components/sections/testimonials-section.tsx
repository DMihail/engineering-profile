import { TESTIMONIALS } from "@/lib/data/testimonials";
import { FadeIn } from "@/components/ui/fade-in";
import styles from "@/styles/sections/testimonials-section.module.css";

export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-dark section-cv-auto border-t border-border-primary-soft"
      aria-labelledby="testimonials-heading"
    >
      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="flex items-center gap-3 mb-5" aria-label="Section: Endorsements">
          <span className="mono-sm tracking-[0.15em] uppercase text-primary" aria-hidden>
            · / Endorsements
          </span>
          <span className="flex-1 h-px bg-border" aria-hidden />
        </p>
        <h2 id="testimonials-heading" className="section-heading mb-8">
          What collaborators say
        </h2>
        <ul className={styles.list}>
          {TESTIMONIALS.map((item) => (
            <li key={`${item.author}-${item.role}`}>
              <figure className={`panel ${styles.card}`}>
                <blockquote className={styles.quote}>&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption className={styles.caption}>
                  <span className="font-medium text-foreground">{item.author}</span>
                  <span className="text-text-dim">
                    {item.role}
                    {item.company ? ` · ${item.company}` : ""}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
