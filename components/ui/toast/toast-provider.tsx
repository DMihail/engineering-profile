"use client";

import type { ReactNode } from "react";
import { ToastContextProvider } from "./toast-context";
import { ToastViewport } from "./toast-viewport";

export { useToast, type ToastVariant } from "./toast-context";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastContextProvider>
      {children}
      <ToastViewport />
    </ToastContextProvider>
  );
}
