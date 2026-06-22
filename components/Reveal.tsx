"use client";

/**
 * Reveal — lightweight scroll-into-view animator.
 *
 * Wraps children and plays a staggered entrance on its direct `.reveal`
 * descendants the first time the block scrolls into view. Uses Intersection
 * Observer (no GSAP dependency for the base case) so it's cheap and SSR-safe.
 * Honors prefers-reduced-motion by revealing instantly.
 */

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** seconds between each child's entrance */
  stagger?: number;
  /** viewport fraction that must be visible to trigger (0..1) */
  threshold?: number;
  className?: string;
  as?: "div" | "section";
}

export default function Reveal({
  children,
  stagger = 0.12,
  threshold = 0.18,
  className,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (items.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      items.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    // assign incremental delays so children cascade in
    items.forEach((el, i) => {
      el.style.transitionDelay = `${i * stagger}s`;
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            (entry.target as HTMLElement).style.transitionDelay = `${
              Math.max(0, idx) * stagger
            }s`;
            entry.target.classList.add("is-inview");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [stagger, threshold]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement & HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
