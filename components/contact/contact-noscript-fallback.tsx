import { SITE_EMAIL, mailtoUrl } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-section.module.css";

/** Mailto fallback when the interactive contact form cannot run. */
export function ContactNoScriptFallback() {
  const mailto = mailtoUrl(UI_LABELS.contact.noScriptMailSubject);

  return (
    <noscript>
      <style>{`.${styles.contactJsOnly}{display:none!important}`}</style>
      <div className={styles.noScriptPanel} role="note">
        <p className={styles.noScriptText}>{UI_LABELS.contact.noScriptMessage}</p>
        <a href={mailto} className={styles.noScriptLink}>
          {SITE_EMAIL}
        </a>
      </div>
    </noscript>
  );
}
