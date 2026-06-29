import styles from "@/styles/sections/contact-section.module.css";

interface FieldHintProps {
  id: string;
  message?: string;
}

/** Reserved hint slot below a control — prevents layout shift in the form grid. */
export function FieldHint({ id, message }: FieldHintProps) {
  return (
    <p
      id={id}
      role={message ? "alert" : undefined}
      aria-live={message ? "polite" : undefined}
      aria-hidden={message ? undefined : true}
      className={`${styles.fieldHint} ${message ? styles.fieldHintError : ""}`}
    >
      {message}
    </p>
  );
}
