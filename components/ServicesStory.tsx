"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/services";
import { MoveRight } from "lucide-react";
import styles from "./ServicesStory.module.css";
import illustration from "@/public/hm.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Sticky-scroll services: the left column scrolls through each service while
 * the right visual pins and swaps to match. Demonstrates the storytelling
 * pattern asked for, using real service content.
 */
export default function ServicesStory() {
  const section = useRef<HTMLElement>(null);
  const visualsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // initial state: first visual visible
      visualsRef.current.forEach((v, i) =>
        gsap.set(v, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95 })
      );

      if (reduced) {
        visualsRef.current.forEach((v) => gsap.set(v, { autoAlpha: 1 }));
        return;
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              visualsRef.current.forEach((v, vi) => {
                gsap.to(v, {
                  autoAlpha: vi === i ? 1 : 0,
                  scale: vi === i ? 1 : 0.95,
                  duration: 0.5,
                  ease: "power2.out",
                });
              });
              gsap.to(step, { opacity: 1, duration: 0.4 });
            } else {
              gsap.to(step, { opacity: 0.35, duration: 0.4 });
            }
          },
        });
      });
    }, sec);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className={styles.section} ref={section}>
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">What we do</span>
          <h2 className={styles.title}>
            Capabilities that <span className="text-gradient">carry weight</span>.
          </h2>
        </div>

        <div className={styles.layout}>
          {/* scrolling steps */}
          <div className={styles.steps}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.slug}
                  className={styles.step}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                >
                  <span className={styles.stepIcon}>
                    <Icon size={22} />
                  </span>
                  <span className={styles.stepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stepTitle}>{s.label}</h3>
                  <p className={styles.stepDesc}>{s.summary}</p>
                  <Link href={`/services/${s.slug}`} className={`${styles.stepLink} cursor-target`}>
                    Learn more <MoveRight size={15} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* pinned visual */}
          <div className={styles.visualCol}>
            <div className={styles.sticky}>
              {/* illustration backdrop fills the card */}
              <Image
                src={illustration}
                alt=""
                aria-hidden="true"
                className={styles.visualImg}
                sizes="(max-width: 900px) 0px, 460px"
              />
              <div className={styles.visualScrim} aria-hidden="true" />

              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.slug}
                    className={styles.visual}
                    ref={(el) => {
                      visualsRef.current[i] = el;
                    }}
                  >
                    <div className={styles.visualInner}>
                      <span className={styles.visualIconWrap}>
                        <Icon size={32} className={styles.visualIcon} />
                      </span>
                      <span className={styles.visualLabel}>{s.label}</span>
                      <div className={styles.visualStack}>
                        {s.stack.map((t) => (
                          <span key={t} className={styles.chip}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
