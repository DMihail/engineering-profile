import { TESTIMONIALS } from "@/lib/content/portfolio/testimonials";
import { SectionHeader, sectionHeadingId } from "@/components/ui/primitives";
import styles from "@/styles/sections/testimonials-section.module.css";

export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  const headingId = sectionHeadingId("testimonials");

  return (
    <section
      id="testimonials"
      className="section-dark section-cv-auto border-t border-border-primary-soft"
      aria-labelledby={headingId}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 reveal-on-scroll">
        <SectionHeader sectionId="testimonials" />
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
