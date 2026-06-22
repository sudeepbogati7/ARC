"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import styles from "./SearchCommand.module.css";

interface Entry {
  label: string;
  href: string;
  group: string;
  keywords?: string;
}

const ENTRIES: Entry[] = [
  { label: "Home", href: "/", group: "Pages" },
  { label: "About A.R.C.", href: "/about", group: "Pages", keywords: "annapurna ridge cho oyu story team vision" },
  { label: "Our work", href: "/gallery", group: "Pages", keywords: "portfolio projects gallery" },
  { label: "Blog", href: "/blog", group: "Pages", keywords: "articles insights writing" },
  { label: "Contact", href: "/contact", group: "Pages", keywords: "email call get in touch" },
  { label: "All services", href: "/services", group: "Services" },
  { label: "Web platforms", href: "/services/web-platforms", group: "Services", keywords: "website nextjs react" },
  { label: "Mobile apps", href: "/services/mobile-apps", group: "Services", keywords: "ios android react native" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops", group: "Services", keywords: "aws docker infra hosting" },
  { label: "AI & automation", href: "/services/ai-automation", group: "Services", keywords: "llm claude ml workflow" },
  { label: "Product & UI/UX", href: "/services/product-design", group: "Services", keywords: "design figma ux" },
  { label: "Tech consulting", href: "/services/consulting", group: "Services", keywords: "strategy architecture advice" },
];

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;
    return ENTRIES.filter(
      (e) =>
        e.label.toLowerCase().includes(q) ||
        e.group.toLowerCase().includes(q) ||
        (e.keywords ?? "").includes(q)
    );
  }, [query]);

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].href);
    }
  };

  return (
    <>
      <button
        className={`${styles.trigger} cursor-target`}
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search size={16} />
        <span className={styles.triggerLabel}>Search</span>
        <kbd className={styles.kbd}>⌘K</kbd>
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Search the site"
          >
            <div className={styles.inputRow}>
              <Search size={18} className={styles.inputIcon} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search pages and services…"
                className={styles.input}
              />
              <kbd className={styles.escKbd}>esc</kbd>
            </div>

            <div className={styles.results}>
              {results.length === 0 && (
                <p className={styles.empty}>No matches. Try “cloud”, “design”, or “contact”.</p>
              )}
              {results.map((r, i) => (
                <button
                  key={r.href}
                  className={`${styles.result} ${i === active ? styles.resultActive : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.href)}
                >
                  <span className={styles.resultGroup}>{r.group}</span>
                  <span className={styles.resultLabel}>{r.label}</span>
                  {i === active && <CornerDownLeft size={14} className={styles.enterIcon} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
