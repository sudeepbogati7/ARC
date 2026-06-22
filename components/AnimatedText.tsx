"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";

/**
 * Small reusable text animator for eyebrows, labels, and short messages.
 * Splits into words (or characters) and reveals them with a soft blur+rise as
 * the element enters the viewport. Honors reduced-motion via the viewport hook.
 */
export default function AnimatedText({
  text,
  className,
  by = "word",
  delay = 0,
  stagger = 0.05,
  as: Tag = "span",
  once = true,
}: {
  text: string;
  className?: string;
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  as?: "span" | "p" | "h2" | "h3";
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });

  const tokens =
    by === "char" ? Array.from(text) : text.split(/(\s+)/);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: "0.5em", filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={i} aria-hidden> {tok} </span>
        ) : (
          <motion.span
            key={i}
            variants={child}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            aria-hidden
          >
            {tok}
          </motion.span>
        )
      )}
    </MotionTag>
  );
}
