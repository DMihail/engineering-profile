import Link from "next/link";
import { PRIVACY_CONSENT_FIELD, PRIVACY_CONSENT_VALUE } from "@/lib/privacy-consent";
import styles from "@/styles/forms/privacy-consent.module.css";

interface PrivacyConsentFieldProps {
  id: string;
  disabled?: boolean;
  invalid?: boolean;
}

export function PrivacyConsentField({ id, disabled, invalid }: PrivacyConsentFieldProps) {
  return (
    <div className={styles.field}>
      <input
        id={id}
        name={PRIVACY_CONSENT_FIELD}
        type="checkbox"
        value={PRIVACY_CONSENT_VALUE}
        required
        disabled={disabled}
        aria-invalid={invalid || undefined}
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
