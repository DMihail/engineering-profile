import { TESTIMONIALS, TESTIMONIALS_SECTION } from "@/lib/data/testimonials";
import { SectionLabelRow } from "@/components/ui/primitives";
import styles from "@/styles/sections/testimonials-section.module.css";

export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="section-dark section-cv-auto border-t border-border-primary-soft"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionLabelRow n={TESTIMONIALS_SECTION.n} label={TESTIMONIALS_SECTION.label} />
        <h2 id="testimonials-heading" className="section-heading mb-8">
          {TESTIMONIALS_SECTION.heading}
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
      </div>
    </section>
  );
}
