"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ValuesSticky.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ValuesSticky — a sticky-scroll panel (the StickyScroll pattern) used for
 * short, punchy statements. A pinned left label stays put while compact value
 * cards scroll past on the right, each highlighting as it reaches center.
 */
const VALUES = [
  { k: "01", t: "We ship, not stall.", d: "Working software every week. You watch it rise, pitch by pitch—no black boxes, no surprises at the summit." },
  { k: "02", t: "Clarity over cleverness.", d: "The simplest system that solves the problem wins. We move complexity to our side of the screen so your team doesn't carry it." },
  { k: "03", t: "Built to bear load.", d: "Like an arc, our work holds weight. Architecture that scales, recovers, and stays up when it actually matters." },
  { k: "04", t: "We stay on the line.", d: "Launch is the start of the next ascent. We watch the numbers and keep climbing with you long after go-live." },
];

export default function ValuesSticky() {
  const section = useRef<HTMLElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      cards.current.forEach((c) => c && gsap.set(c, { opacity: 1 }));
      return;
    }
    const ctx = gsap.context(() => {
      cards.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 75%", end: "top 45%", scrub: true },
          }
        );
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <div className={styles.sticky}>
            <span className="eyebrow">How we work</span>
            <h2 className={styles.title}>
              Four ways we keep your build <span className="text-gradient">on the route</span>.
            </h2>
            <p className={styles.lead}>
              The principles behind every project we take on.
            </p>
          </div>
        </div>

        <div className={styles.right}>
          {VALUES.map((v, i) => (
            <div
              key={v.k}
              className={styles.card}
              ref={(el) => {
                cards.current[i] = el;
              }}
            >
              <span className={styles.num}>{v.k}</span>
              <div>
                <h3 className={styles.cardTitle}>{v.t}</h3>
                <p className={styles.cardDesc}>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
