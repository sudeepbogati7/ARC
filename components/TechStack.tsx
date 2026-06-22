"use client";

import { useRef } from "react";
import {
  AnimatedBeam,
  Circle,
  Icons,
} from "@/components/ui/animated-beam";
import styles from "./TechStack.module.css";
import Reveal from "./Reveal";

/**
 * TechStack — the brand thesis made literal.
 * Modern tools on the edges, all flowing along animated beams into a single
 * central ARC node: "we connect many systems into one solution." Reusable as
 * a hero centerpiece or a standalone section.
 */
export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);

  const tsRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const twRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const pyRef = useRef<HTMLDivElement>(null);
  const awsRef = useRef<HTMLDivElement>(null);
  const pgRef = useRef<HTMLDivElement>(null);
  const dockerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrap} ref={containerRef}>
      {/* left column */}
      <div className={styles.col}>
        <Circle ref={tsRef}><Icons.typescript /></Circle>
        <Circle ref={reactRef}><Icons.reactjs /></Circle>
        <Circle ref={nextRef}><Icons.nextjs /></Circle>
        <Circle ref={twRef}><Icons.tailwindcss /></Circle>
        <Circle ref={gsapRef}><Icons.gsap /></Circle>
      </div>

      {/* center ARC node */}
      <div className={styles.center}>
        <Circle ref={center} className={styles.hub}>
          <Icons.logo />
        </Circle>
      </div>

      {/* right column */}
      <div className={styles.col}>
        <Circle ref={nodeRef}><Icons.node /></Circle>
        <Circle ref={pyRef}><Icons.python /></Circle>
        <Circle ref={awsRef}><Icons.aws /></Circle>
        <Circle ref={pgRef}><Icons.postgres /></Circle>
        <Circle ref={dockerRef}><Icons.docker /></Circle>
      </div>

      {/* beams: left → center — staggered durations/delays so they don't pulse in lockstep */}
      <AnimatedBeam containerRef={containerRef} fromRef={tsRef} toRef={center} curvature={60} endYOffset={-40} duration={5} delay={0} />
      <AnimatedBeam containerRef={containerRef} fromRef={reactRef} toRef={center} curvature={30} endYOffset={-20} duration={6} delay={0.4} />
      <AnimatedBeam containerRef={containerRef} fromRef={nextRef} toRef={center} duration={4.5} delay={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={twRef} toRef={center} curvature={-30} endYOffset={20} duration={5.5} delay={1.2} />
      <AnimatedBeam containerRef={containerRef} fromRef={gsapRef} toRef={center} curvature={-60} endYOffset={40} duration={6.5} delay={0.2} />

      {/* beams: right → center (reverse direction) */}
      <AnimatedBeam containerRef={containerRef} fromRef={nodeRef} toRef={center} curvature={60} endYOffset={-40} duration={5} delay={0.6} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={pyRef} toRef={center} curvature={30} endYOffset={-20} duration={6} delay={1} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={awsRef} toRef={center} duration={4.5} delay={0.3} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={pgRef} toRef={center} curvature={-30} endYOffset={20} duration={5.5} delay={1.4} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={dockerRef} toRef={center} curvature={-60} endYOffset={40} duration={6.5} delay={0.9} reverse />
    </div>
  );
}

/** Section wrapper with heading — use on the landing page below the hero. */
export function TechStackSection() {
  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <Reveal className={styles.header}>
          <span className="eyebrow reveal">The toolkit</span>
          <h2 className={`${styles.title} reveal`}>
            Many tools.{" "}
            <span className="text-gradient">One system.</span>
          </h2>
          <p className={`${styles.subtitle} reveal`}>
            We work across the modern stack and converge it into a single,
            coherent solution—so the complexity stays on our side of the screen.
          </p>
        </Reveal>
        <div className={styles.stageReveal}>
          <TechStack />
        </div>
      </div>
    </section>
  );
}
