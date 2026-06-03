"use client";

import { CheckCircle, Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import { UI_LABELS } from "@/lib/content/ui-labels";

interface ContactSubmitButtonProps {
  success: boolean;
}

export function ContactSubmitButton({ success }: ContactSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || success}
      aria-busy={pending || undefined}
      className={`flex items-center gap-2 font-semibold ${
        success ? "form-success-banner" : "btn-primary disabled:opacity-60"
      }`}
    >
      {success ? (
        <>
          <CheckCircle size={15} aria-hidden /> {UI_LABELS.submit.sent}
        </>
      ) : pending ? (
        <>
          <Loader2 size={15} className="animate-spin" aria-hidden /> {UI_LABELS.submit.sending}
        </>
      ) : (
        <>
          <Send size={15} aria-hidden /> {UI_LABELS.submit.send}
        </>
      )}
    </button>
  );
}
