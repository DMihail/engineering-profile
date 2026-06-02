"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import type { ToastContentProps } from "react-toastify";
import styles from "@/styles/ui/toast.module.css";
import type { ToastVariant } from "./toast-api";

export type SiteToastData = {
  title?: string;
  message: string;
  variant: ToastVariant;
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  switch (variant) {
    case "success":
      return <CheckCircle2 size={16} aria-hidden />;
    case "warning":
      return <AlertTriangle size={16} aria-hidden />;
    case "error":
      return <AlertCircle size={16} aria-hidden />;
  }
}

export function SiteToastContent({
  data,
  closeToast,
}: ToastContentProps<SiteToastData>) {
  if (!data) return null;

  const { title, message, variant } = data;

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <span className={styles.iconWrap}>
        <ToastIcon variant={variant} />
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        <p className={styles.message}>{message}</p>
      </div>
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Dismiss notification"
        onClick={closeToast}
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  );
}
