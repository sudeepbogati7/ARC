"use client";

import styles from "./Process.module.css";
import Reveal from "./Reveal";
import { Compass, PencilRuler, Hammer, Rocket } from "lucide-react";

/**
 * Process — how we work, framed as an ascent.
 * A genuine sequence (1 → 4), so numbered markers earn their place here.
 */
const STEPS = [
  {
    n: "01",
    title: "Basecamp",
    icon: Compass,
    desc: "We map the terrain with you—goals, constraints, users—so the route is clear before anyone starts climbing.",
  },
  {
    n: "02",
    title: "Survey the route",
    icon: PencilRuler,
    desc: "Architecture and design in lockstep. We prototype the hard parts early, where changing course is still cheap.",
  },
  {
    n: "03",
    title: "Build the structure",
    icon: Hammer,
    desc: "Engineering in tight loops, shipping working software every week. You see the system rise, pitch by pitch.",
  },
  {
    n: "04",
    title: "Summit & maintain",
    icon: Rocket,
    desc: "We launch, watch the numbers, and stay on the line—because the summit is the start of the next ascent.",
  },
];

export default function Process() {
  return (
    <section id="process" className={styles.process}>
      <div className="container">
        <Reveal className={styles.header}>
          <span className="eyebrow reveal">How we work</span>
          <h2 className={`${styles.title} reveal`}>
            Every project is an <span className="text-gradient">ascent</span>.
          </h2>
          <p className={`${styles.subtitle} reveal`}>
            A clear route from first conversation to live system—and the
            footing to keep climbing after.
          </p>
        </Reveal>

        <Reveal className={styles.track} stagger={0.14}>
          <div className={styles.line} aria-hidden="true" />
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className={`${styles.step} reveal`}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNum}>{step.n}</span>
                  <span className={styles.stepIcon}>
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
