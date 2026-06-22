"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./WorkShowcase.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKS = [
  { id: 1, title: "Fintech dashboard", cat: "Web app · UI/UX", grad: "linear-gradient(135deg,#0A63CF,#063B7D)" },
  { id: 2, title: "E-commerce platform", cat: "Full-stack build", grad: "linear-gradient(135deg,#F5232C,#8E0E14)" },
  { id: 3, title: "Healthcare portal", cat: "Secure architecture", grad: "linear-gradient(135deg,#2E7DD6,#0A2F5C)" },
  { id: 4, title: "Logistics tracker", cat: "Mobile app", grad: "linear-gradient(135deg,#FF5A61,#2E7DD6)" },
  { id: 5, title: "AI ops assistant", cat: "AI & automation", grad: "linear-gradient(135deg,#5AA0EF,#F5232C)" },
];

export default function WorkShowcase() {
  const section = useRef<HTMLElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    const pin = pinWrap.current;
    if (!sec || !tr || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // native horizontal scroll fallback

    const ctx = gsap.context(() => {
      // Horizontal distance the track must travel.
      const getDist = () => Math.max(0, tr.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
      // Stretch the vertical scroll consumed so the travel is deliberate.
      const SCROLL_MULTIPLIER = 1.5;
      gsap.to(tr, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDist() * SCROLL_MULTIPLIER + window.innerHeight * 0.4}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className={styles.section} ref={section}>
      {/* normal, centered intro — reads as a regular section header first */}
      <div className={`container ${styles.intro}`}>
        <span className="eyebrow">Selected work</span>
        <h2 className={styles.introTitle}>
          Systems we&apos;ve <span className="text-gradient">built to last.</span>
        </h2>
        <p className={styles.introText}>
          A few of the products we&apos;ve shipped. Keep scrolling—they slide
          past, then{" "}
          <Link href="/gallery" className={styles.introLink}>
            see the full portfolio
          </Link>
          .
        </p>
        <span className={styles.hint}>Scroll to explore →</span>
      </div>

      {/* pinned horizontal gallery — begins once you scroll into it */}
      <div className={styles.pinWrap} ref={pinWrap}>
        <div className={styles.viewport}>
          <div className={styles.track} ref={track}>
            {WORKS.map((w, i) => (
              <Link href="/gallery" key={w.id} className={styles.card}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.preview} style={{ background: w.grad }}>
                  <span className={styles.previewName}>{w.title}</span>
                </div>
                <div className={styles.meta}>
                  <div>
                    <h3 className={styles.cardTitle}>{w.title}</h3>
                    <span className={styles.cat}>{w.cat}</span>
                  </div>
                  <span className={styles.viewBtn}>
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
