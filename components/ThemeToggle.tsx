"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label="Toggle light or dark theme"
      title={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
    >
      <span className={styles.track} aria-hidden="true">
        <span
          className={styles.thumb}
          data-theme-state={mounted ? theme : "dark"}
        >
          <Sun size={13} className={styles.sun} />
          <Moon size={13} className={styles.moon} />
        </span>
      </span>
    </button>
  );
}
