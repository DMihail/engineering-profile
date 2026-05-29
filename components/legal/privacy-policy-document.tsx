import Link from "next/link";
import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_SECTIONS,
  type PrivacyListItem,
} from "@/lib/privacy-policy-content";
import styles from "@/styles/legal-page.module.css";

function renderListItem(item: PrivacyListItem, index: number) {
  if (typeof item === "string") {
    return (
      <li key={index} className={styles.listItem}>
        {item}
      </li>
    );
  }

  return (
    <li key={index} className={styles.listItem}>
      <span className={styles.term}>{item.term}</span>
      <span className={styles.detail}>{item.detail}</span>
    </li>
  );
}

export function PrivacyPolicyDocument() {
  return (
    <article>
      <header className={styles.header}>
        <h1 className={styles.title}>{PRIVACY_POLICY_INTRO.title}</h1>
        <p className={styles.summary}>{PRIVACY_POLICY_INTRO.summary}</p>
        <p className={styles.meta}>Last updated: {PRIVACY_POLICY_INTRO.lastUpdated}</p>
      </header>

      {PRIVACY_POLICY_SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`} className={styles.sectionTitle}>
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className={styles.list}>
              {section.list.map((item, index) => renderListItem(item, index))}
            </ul>
          ) : null}
        </section>
      ))}

      <p className={styles.paragraph}>
        Return to the{" "}
        <Link href="/" className={styles.link}>
          homepage
        </Link>
        {" "}or{" "}
        <Link href="/#contact" className={styles.link}>
          contact section
        </Link>
        .
      </p>
    </article>
  );
}
