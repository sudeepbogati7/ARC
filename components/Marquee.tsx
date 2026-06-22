"use client";

import styles from "./Marquee.module.css";

/**
 * An infinite scrolling marquee strip — a distinctive divider between sections.
 * Pure CSS animation (duplicated track for a seamless loop), pauses on hover,
 * and stops under reduced-motion via the global media query in globals.css.
 */
const ITEMS = [
  "We build, you grow",
  "Web platforms",
  "Mobile apps",
  "Cloud & DevOps",
  "AI & automation",
  "Product & UI/UX",
  "Forged in the Himalayas",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {track.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.text}>{item}</span>
            <span className={styles.star}>✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
