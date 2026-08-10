"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { MQ_LG_UP } from "@/lib/breakpoints";

/**
 * Mobile drawer open state, body scroll lock, focus trap, Escape, and desktop mq reset.
 */
export function useMobileMenu() {
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = (returnFocus = true) => {
    setMenuOpen((open) => {
      if (open && returnFocus) {
        requestAnimationFrame(() => menuToggleRef.current?.focus());
      }
      return false;
    });
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const onMenuKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    const nav = mobileNavRef.current;
    if (!nav) return;

    const focusable = Array.from(
      nav.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  });

  const onDesktopMqChange = useEffectEvent((matches: boolean) => {
    if (matches) closeMenu(false);
  });

  useEffect(() => {
    if (!menuOpen) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const nav = mobileNavRef.current;
    const first = nav?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    requestAnimationFrame(() => first?.focus());

    document.addEventListener("keydown", onMenuKeyDown);

    return () => {
      document.removeEventListener("keydown", onMenuKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia(MQ_LG_UP);
    const onChange = () => onDesktopMqChange(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return {
    menuOpen,
    menuToggleRef,
    mobileNavRef,
    closeMenu,
    toggleMenu,
  } as const;
}
