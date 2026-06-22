"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const KEY = "archtech-theme";

function current(): Theme {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
}

/**
 * Reads/sets the active theme. Source of truth is the <html data-theme> attr,
 * set pre-paint by ThemeScript. A manual choice is persisted and overrides the
 * system preference; with no choice saved, we follow the OS and react to changes.
 */
export function useTheme() {
  // Initialise from the <html data-theme> attr the inline script already set,
  // so we don't need a post-mount setState to read it.
  const [theme, setThemeState] = useState<Theme>(current);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // re-sync in case the attribute changed between render and effect
    setThemeState((prev) => {
      const now = current();
      return now === prev ? prev : now;
    });

    // keep in sync with OS changes while no manual override is set
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (!localStorage.getItem(KEY)) {
        const next: Theme = mq.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        setThemeState(next);
      }
    };
    mq.addEventListener("change", onSystem);

    // sync across tabs / other instances
    const onCustom = () => setThemeState(current());
    window.addEventListener("theme-change", onCustom);

    return () => {
      mq.removeEventListener("change", onSystem);
      window.removeEventListener("theme-change", onCustom);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.dispatchEvent(new Event("theme-change"));
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(current() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle, mounted };
}
