"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Manifesto.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINE =
  "Most software adds complexity. We remove it—turning the messy, manual parts of your business into systems that quietly do the work.";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = el.querySelectorAll<HTMLElement>(`.${styles.word}`);

    if (reduced) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.manifesto} ref={ref}>
      <div className="container">
        <span className={`eyebrow ${styles.eyebrow}`}>Why we exist</span>
        <p className={styles.statement}>
          {LINE.split(/(\s+)/).map((w, i) =>
            /^\s+$/.test(w) ? (
              w
            ) : (
              <span key={i} className={styles.word}>
                {w}
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
