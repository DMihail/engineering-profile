import { SITE_EMAIL, mailtoUrl } from "@/lib/config";
import { UI_LABELS } from "@/lib/content/ui-labels";
import formStyles from "@/styles/sections/contact-form.module.css";
import sectionStyles from "@/styles/sections/contact-section.module.css";

/** Mailto fallback when the interactive contact form cannot run. */
export function ContactNoScriptFallback() {
  const mailto = mailtoUrl(UI_LABELS.contact.noScriptMailSubject);

  return (
    <noscript>
      <style>{`.${sectionStyles.contactJsOnly}{display:none!important}`}</style>
      <div className={formStyles.noScriptPanel} role="note">
        <p className={formStyles.noScriptText}>{UI_LABELS.contact.noScriptMessage}</p>
        <a href={mailto} className={formStyles.noScriptLink}>
          {SITE_EMAIL}
        </a>
      </div>
    </noscript>
  );
}
