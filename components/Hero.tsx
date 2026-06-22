"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import styles from "./Hero.module.css";
import DashboardMockup from "./DashboardMockup";
import ShinyText from "./stylish/ShinyText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TRUST = ["Startups", "Scale-ups", "Enterprises", "Govt & NGOs"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-rise",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        `.${styles.stage}`,
        { y: 60, opacity: 0, rotateX: 22 },
        { y: 0, opacity: 1, rotateX: 16, duration: 1.2, ease: "power3.out", delay: 0.45 }
      );

      if (reduced) return;

      // lift + flatten the dashboard as you scroll past the hero
      gsap.to(`.${styles.stageInner}`, {
        rotateX: 0,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);

    const onMove = (e: MouseEvent) => {
      if (reduced || !stageRef.current) return;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      gsap.to(stageRef.current, {
        rotateY: cx * 4,
        duration: 0.7,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className={styles.hero} ref={root}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.bleed} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <span className={`hero-rise ${styles.kicker}`}>
          <span className={styles.kickerDot} />
          We build, you grow
        </span>

        <h1 className={`hero-rise ${styles.title}`}>
          We make business{" "}
          <span className={styles.accentLine}>simple</span>{" "}
          <span className={styles.shiny}>
            <ShinyText
              text="to run."
              color="var(--text-muted)"
              shineColor="var(--accent-soft)"
              speed={4}
              spread={90}
            />
          </span>
        </h1>

        <p className={`hero-rise ${styles.description}`}>
          Arc Tech designs and builds the software that runs your company—web
          platforms, apps, automation, and AI. We connect your people, systems,
          and solutions into one dependable arc.
        </p>

        <div className={`hero-rise ${styles.actions}`}>
          <Link href="/contact" className="btn-primary">
            Start a project <MoveRight size={18} style={{ marginLeft: 8 }} />
          </Link>
          <Link href="/services" className="btn-outline">
            Explore services
          </Link>
        </div>

        <div className={`hero-rise ${styles.trust}`}>
          <span className={styles.trustLabel}>Trusted by</span>
          <div className={styles.trustList}>
            {TRUST.map((t) => (
              <span key={t} className={styles.trustItem}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* tilted dashboard, stacked below the copy, lifts on scroll */}
      <div className={styles.stage} ref={stageRef}>
        <div className={styles.stageInner}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
