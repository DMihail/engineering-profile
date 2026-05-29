import Link from "next/link";
import { PRIVACY_CONSENT_FIELD, PRIVACY_CONSENT_VALUE } from "@/lib/privacy-consent";
import { clearContactFieldValidity } from "@/lib/contact-form-html-validation";
import styles from "@/styles/forms/privacy-consent.module.css";

interface PrivacyConsentFieldProps {
  id: string;
  disabled?: boolean;
}

export function PrivacyConsentField({ id, disabled }: PrivacyConsentFieldProps) {
  return (
    <div className={styles.field}>
      <input
        id={id}
        name={PRIVACY_CONSENT_FIELD}
        type="checkbox"
        value={PRIVACY_CONSENT_VALUE}
        required
        disabled={disabled}
        onInput={clearContactFieldValidity}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}>
        I agree to the{" "}
        <Link href="/privacy" className={styles.link}>
          privacy policy
        </Link>
      </label>
    </div>
  );
}
