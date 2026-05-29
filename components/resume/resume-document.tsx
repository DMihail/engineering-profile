import {
  getResumeContact,
  getResumeEducation,
  getResumeExperience,
  getResumeHeading,
  getResumeSkillGroups,
  getResumeVariantContent,
  type ResumeVariant,
} from "@/lib/resume-content";
import styles from "@/styles/resume.module.css";

interface ResumeDocumentProps {
  variant: ResumeVariant;
}

export function ResumeDocument({ variant }: ResumeDocumentProps) {
  const heading = getResumeHeading();
  const contact = getResumeContact();
  const content = getResumeVariantContent(variant);
  const skillGroups = getResumeSkillGroups();
  const experience = getResumeExperience();
  const education = getResumeEducation();

  return (
    <article className={styles.document} aria-label={`Resume — ${heading.name}`}>
      <header className={styles.header}>
        <h1 className={styles.name}>{heading.name}</h1>
        <p className={styles.role}>{heading.role}</p>
        <p className={styles.metaLine}>{content.locationLine}</p>
        <p className={styles.metaLine}>{content.authorizationLine}</p>

        <div className={styles.contactRow}>
          <a className={styles.contactItem} href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <span className={styles.contactSep} aria-hidden>
            ·
          </span>
          <a className={styles.contactItem} href={`tel:${contact.phoneTel}`}>
            {contact.phone}
          </a>
          <span className={styles.contactSep} aria-hidden>
            ·
          </span>
          <a className={styles.contactItem} href={contact.linkedin}>
            {contact.linkedinLabel}
          </a>
          <span className={styles.contactSep} aria-hidden>
            ·
          </span>
          <a className={styles.contactItem} href={contact.github}>
            {contact.githubLabel}
          </a>
          <span className={styles.contactSep} aria-hidden>
            ·
          </span>
          <a className={styles.contactItem} href={contact.website}>
            dzhezhelo.dev
          </a>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="resume-summary">
        <h2 id="resume-summary" className={styles.sectionTitle}>
          Professional Summary
        </h2>
        <p className={styles.summary}>{content.summary}</p>
      </section>

      <section className={styles.section} aria-labelledby="resume-skills">
        <h2 id="resume-skills" className={styles.sectionTitle}>
          Technical Skills
        </h2>
        {skillGroups.map((group) => (
          <p key={group.label} className={styles.skillRow}>
            <span className={styles.skillLabel}>{group.label}: </span>
            {group.skills}
          </p>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-experience">
        <h2 id="resume-experience" className={styles.sectionTitle}>
          Professional Experience
        </h2>
        {experience.map((xp) => (
          <article key={`${xp.company}-${xp.period}`} className={styles.entry}>
            <div className={styles.entryHeader}>
              <div>
                <h3 className={styles.entryRole}>{xp.role}</h3>
                <p className={styles.entryCompany}>{xp.company}</p>
              </div>
              <div>
                <p className={styles.entryMeta}>
                  <time dateTime={xp.period.replace(/\s/g, "")}>{xp.period}</time>
                </p>
                <p className={styles.entryMeta}>{xp.location}</p>
              </div>
            </div>
            <p className={styles.entryHighlight}>{xp.highlight}</p>
            <ul className={styles.bulletList}>
              {xp.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-education">
        <h2 id="resume-education" className={styles.sectionTitle}>
          Education
        </h2>
        {education.map((item) => (
          <article key={`${item.institution}-${item.field}`} className={styles.educationEntry}>
            <p className={styles.educationDegree}>{item.field}</p>
            <p className={styles.educationSchool}>{item.institution}</p>
            {item.period ? <p className={styles.educationPeriod}>{item.period}</p> : null}
          </article>
        ))}
      </section>
    </article>
  );
}
