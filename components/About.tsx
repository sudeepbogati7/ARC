"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import MountainBackdrop from "./MountainBackdrop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LETTERS = [
  {
    letter: "A",
    name: "Annapurna",
    meaning: "Goddess of abundance",
    variant: "annapurna" as const,
    accent: "var(--accent-ice-bright)",
    shine: "var(--accent-ice-bright)",
    body:
      "From Sanskrit anna (nourishment) and pūrṇa (complete)—she who fills the world. Annapurna is our promise of growth and scale: software that feeds your business and grows with it.",
    tag: "Growth & scale",
  },
  {
    letter: "R",
    name: "Ridge",
    meaning: "The connecting crest",
    variant: "ridge" as const,
    accent: "var(--accent-soft)",
    shine: "var(--accent)",
    body:
      "The Himalayan ridgeline is the unbroken line that links Nepal's great peaks. It's how we work—connecting your people, systems, and solutions into one continuous, load-bearing path.",
    tag: "Connection",
  },
  {
    letter: "C",
    name: "Cho Oyu",
    meaning: "The Turquoise Goddess",
    variant: "chooyu" as const,
    accent: "var(--accent-ice)",
    shine: "var(--accent-ice)",
    body:
      "Named for the turquoise light its snow catches at sunset—a sacred symbol of purity and serenity. It's the standard we hold our work to: clear, calm, and dependable under load.",
    tag: "Reliability & clarity",
  },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(cardsRefs.current, {
        scrollTrigger: { trigger: `.${styles.grid}`, start: "top 78%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "back.out(1.4)",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <div className="container">
        <div className={`about-header ${styles.header}`}>
          <span className="eyebrow">The name</span>
          <h2 className={styles.title}>
            What <span className="text-gradient">A.R.C.</span> stands for
          </h2>
          <p className={styles.subtitle}>
            An arc is the strongest structural form—it bears load by connecting
            two points. Ours is built from three Himalayan peaks, each carrying
            part of how we work.
          </p>
        </div>

        <div className={styles.grid}>
          {LETTERS.map((item, i) => (
            <div
              key={item.letter}
              className={styles.card}
              ref={(el) => {
                cardsRefs.current[i] = el;
              }}
              style={{ ["--shine-color" as string]: item.shine } as React.CSSProperties}
            >
              <div className={styles.cardInner}>
                <MountainBackdrop variant={item.variant} className={styles.mountains} />
                <div className={styles.cardContent}>
                  <span className={styles.bigLetter} style={{ color: item.accent }}>
                    {item.letter}
                  </span>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  <span className={styles.meaning}>{item.meaning}</span>
                  <p className={styles.cardDesc}>{item.body}</p>
                  <span className={styles.tag}>{item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
