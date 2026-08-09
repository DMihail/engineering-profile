"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Check, Copy } from "lucide-react";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/sections/contact-aside.module.css";

interface ContactCopyEmailButtonProps {
  email: string;
}

export function ContactCopyEmailButton({ email }: ContactCopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const resetCopied = useEffectEvent(() => {
    setCopied(false);
  });

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => resetCopied(), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? UI_LABELS.contact.emailCopied : UI_LABELS.contact.copyEmail(email)}
      className={styles.copyButton}
    >
      {copied ? (
        <Check size={16} className="text-success" aria-hidden />
      ) : (
        <Copy size={16} className="text-text-dim" aria-hidden />
      )}
    </button>
  );
}
