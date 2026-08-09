import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { FieldHint } from "@/components/contact/field-hint";
import styles from "@/styles/sections/contact-form.module.css";

interface FieldShellProps {
  id: string;
  label: ReactNode;
  errorId: string;
  errorMessage?: string;
  className?: string;
  children: ReactNode;
}

function ContactFieldShell({
  id,
  label,
  errorId,
  errorMessage,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={className ? `${styles.formField} ${className}` : styles.formField}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      {children}
      <FieldHint id={errorId} message={errorMessage} />
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: ReactNode;
  name: string;
  errorId: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  onInput?: InputHTMLAttributes<HTMLInputElement>["onInput"];
};

type TextAreaFieldProps = {
  id: string;
  label: ReactNode;
  name: string;
  errorId: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  onInput?: TextareaHTMLAttributes<HTMLTextAreaElement>["onInput"];
};

export function ContactTextField({
  id,
  label,
  name,
  errorId,
  errorMessage,
  disabled,
  className,
  onInput,
  ...inputProps
}: TextFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "disabled" | "onInput">) {
  return (
    <ContactFieldShell
      id={id}
      label={label}
      errorId={errorId}
      errorMessage={errorMessage}
      className={className}
    >
      <input
        {...inputProps}
        id={id}
        name={name}
        disabled={disabled}
        onInput={onInput}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        className={styles.inputField}
      />
    </ContactFieldShell>
  );
}

export function ContactTextAreaField({
  id,
  label,
  name,
  errorId,
  errorMessage,
  disabled,
  className,
  onInput,
  ...textareaProps
}: TextAreaFieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name" | "disabled" | "onInput">) {
  return (
    <ContactFieldShell
      id={id}
      label={label}
      errorId={errorId}
      errorMessage={errorMessage}
      className={className}
    >
      <textarea
        {...textareaProps}
        id={id}
        name={name}
        disabled={disabled}
        onInput={onInput}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? errorId : undefined}
        className={`${styles.inputField} ${styles.messageField}`}
      />
    </ContactFieldShell>
  );
}
