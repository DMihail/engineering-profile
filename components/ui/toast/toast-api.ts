"use client";

import { toast, type Id } from "react-toastify";
import { SiteToastContent, type SiteToastData } from "./toast-content";

export type ToastVariant = "success" | "error" | "warning";

type ToastInput = {
  title?: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

export type ToastApi = {
  show: (input: ToastInput) => Id;
  success: (message: string, title?: string) => Id;
  error: (message: string, title?: string) => Id;
  warning: (message: string, title?: string) => Id;
  dismiss: (id?: Id) => void;
};

const DEFAULT_DURATION_MS = 5200;

function showSiteToast({
  title,
  message,
  variant = "error",
  durationMs = DEFAULT_DURATION_MS,
}: ToastInput): Id {
  toast.dismiss();

  const data: SiteToastData = { title, message, variant };

  return toast(SiteToastContent, {
    data,
    autoClose: durationMs,
    closeButton: false,
    icon: false,
    draggable: false,
    role: variant === "error" ? "alert" : "status",
  });
}

export const toastApi: ToastApi = {
  show: showSiteToast,
  success: (message, title) => showSiteToast({ message, title, variant: "success" }),
  error: (message, title) => showSiteToast({ message, title, variant: "error" }),
  warning: (message, title) => showSiteToast({ message, title, variant: "warning" }),
  dismiss: (id) => {
    toast.dismiss(id);
  },
};
