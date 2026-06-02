"use client";

import type { ReactNode } from "react";
import { ToastContainer } from "react-toastify/unstyled";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
}
