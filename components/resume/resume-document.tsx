import {
  getResumeContact,
  getResumeEducation,
  getResumeExperience,
  getResumeHeading,
  getResumeLanguages,
  getResumeProjects,
  getResumeSkillGroups,
  getResumeVariantContent,
  type ResumeVariant,
} from "@/lib/resume-content";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/resume.module.css";

interface ResumeDocumentProps {
  variant: ResumeVariant;
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <ul className={styles.bulletList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ResumeDocument({ variant }: ResumeDocumentProps) {
  const heading = getResumeHeading();
  const contact = getResumeContact(variant);
  const content = getResumeVariantContent(variant);
  const skillGroups = getResumeSkillGroups();
  const experience = getResumeExperience();
  const projects = getResumeProjects();
  const education = getResumeEducation();
  const languages = getResumeLanguages();

  return (
    <article className={styles.document} aria-label={`Resume — ${heading.name}`}>
      <header className={styles.header}>
        <h1 className={styles.name}>{heading.name}</h1>
        <p className={styles.role}>{heading.role}</p>
        <p className={styles.metaLine}>{content.locationLine}</p>

        <address className={styles.contactRow}>
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
          <a className={styles.contactItem} href={contact.website}>
            dzhezhelo.dev
          </a>
        </address>
      </header>

      <section className={styles.section} aria-labelledby="resume-summary">
        <h2 id="resume-summary" className={styles.sectionTitle}>
          {UI_LABELS.resume.summary}
        </h2>
        <p className={styles.summary}>{content.summary}</p>
      </section>

      <section className={styles.section} aria-labelledby="resume-experience">
        <h2 id="resume-experience" className={styles.sectionTitle}>
          {UI_LABELS.resume.experience}
        </h2>
        {experience.map((xp) => (
          <article key={`${xp.company}-${xp.period}`} className={styles.entry}>
            <div className={styles.entryHeader}>
              <div>
                <h3 className={styles.entryRole}>
                  {xp.role}, {xp.company}
                </h3>
              </div>
              <div>
                <p className={styles.entryMeta}>
                  <time dateTime={xp.period.replace(/\s/g, "")}>{xp.period}</time>
                  {" | "}
                  {xp.location}
                </p>
              </div>
            </div>

            <BulletList items={xp.bullets ?? []} />

            {xp.projects?.map((project) => (
              <div key={project.title} className={styles.projectBlock}>
                <h4 className={styles.projectTitle}>{project.title}</h4>
                <BulletList items={project.bullets} />
              </div>
            ))}

            {xp.applications?.length ? (
              <div className={styles.selectedApps}>
                <p className={styles.selectedAppsLabel}>{xp.applicationsLabel ?? UI_LABELS.resume.applications}</p>
                <BulletList items={xp.applications} />
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-skills">
        <h2 id="resume-skills" className={styles.sectionTitle}>
          {UI_LABELS.resume.skills}
        </h2>
        {skillGroups.map((group) => (
          <p key={group.label} className={styles.skillRow}>
            <span className={styles.skillLabel}>{group.label}: </span>
            {group.skills}
          </p>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-projects">
        <h2 id="resume-projects" className={styles.sectionTitle}>
          {UI_LABELS.resume.projects}
        </h2>
        {projects.map((project) => (
          <article key={`${project.title}-${project.period}`} className={styles.entry}>
            <div className={styles.entryHeader}>
              <h3 className={styles.entryRole}>{project.title}</h3>
              <p className={styles.entryMeta}>
                <time dateTime={project.period.replace(/\s/g, "")}>{project.period}</time>
              </p>
            </div>
            <BulletList items={project.bullets} />
            {project.technologies ? (
              <p className={styles.technologies}>
                <span className={styles.skillLabel}>{UI_LABELS.resume.technologies} </span>
                {project.technologies}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-education">
        <h2 id="resume-education" className={styles.sectionTitle}>
          {UI_LABELS.resume.education}
        </h2>
        {education.map((item) => (
          <article key={`${item.degree}-${item.period}`} className={styles.educationEntry}>
            <p className={styles.educationDegree}>
              {item.degree}, {item.institution}
            </p>
            <p className={styles.educationPeriod}>
              {item.period} | {item.location}
            </p>
          </article>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="resume-languages">
        <h2 id="resume-languages" className={styles.sectionTitle}>
          {UI_LABELS.resume.languages}
        </h2>
        <ul className={styles.languageList}>
          {languages.map((entry) => (
            <li key={entry.language} className={styles.languageItem}>
              <span className={styles.languageName}>{entry.language}</span>
              <span className={styles.languageLevel}> — {entry.level}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
