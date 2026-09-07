"use client";

import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/ui/react-toastify.css";

export function ToastHost({
  theme,
  ariaLabel,
}: {
  theme: "light" | "dark";
  ariaLabel: string;
}) {
  return (
    <ToastContainer
      theme={theme}
      position="bottom-right"
      autoClose={5000}
      newestOnTop
      closeOnClick
      pauseOnHover
      limit={3}
      aria-label={ariaLabel}
    />
  );
}
