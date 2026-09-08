import Link from "next/link";
import { PRIVACY_CONSENT_FIELD, PRIVACY_CONSENT_VALUE } from "@/lib/privacy-consent";
import { clearContactFieldValidity } from "@/lib/contact-form-rules";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/forms/privacy-consent.module.css";

interface PrivacyConsentFieldProps {
  id: string;
  disabled?: boolean;
  errorId?: string;
  errorMessage?: string;
  onClearError?: () => void;
}

export function PrivacyConsentField({
  id,
  disabled,
  errorId,
  errorMessage,
  onClearError,
}: PrivacyConsentFieldProps) {
  return (
    <div className={styles.field}>
      <input
        id={id}
        name={PRIVACY_CONSENT_FIELD}
        type="checkbox"
        value={PRIVACY_CONSENT_VALUE}
        required
        disabled={disabled}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage && errorId ? errorId : undefined}
        onInput={(event) => {
          clearContactFieldValidity(event);
          onClearError?.();
        }}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        {UI_LABELS.privacyConsent.beforeLink}{" "}
        <Link href="/privacy" className={styles.link}>
          {UI_LABELS.privacyConsent.privacyPolicy}
        </Link>{" "}
        {UI_LABELS.privacyConsent.afterLink}
      </label>
    </div>
  );
}
