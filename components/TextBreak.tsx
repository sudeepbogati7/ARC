"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextBreak.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * A kinetic text breather between sections. Each line slides + un-blurs as it
 * scrolls in. `lines` lets us break a thought across multiple animated rows —
 * the "show it broken up" treatment.
 */
export default function TextBreak({
  lines,
  align = "center",
}: {
  lines: string[];
  align?: "left" | "center" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = el.querySelectorAll<HTMLElement>(`.${styles.line} span`);

    if (reduced) {
      gsap.set(rows, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { yPercent: 110, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: { trigger: el, start: "top 78%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrap} style={{ textAlign: align }}>
      <div className="container">
        <div className={styles.stack} ref={ref}>
          {lines.map((line, i) => (
            <div className={styles.line} key={i}>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
