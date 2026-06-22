"use client";

import React, { useRef, JSX } from "react";
import { motion, useInView, Variants } from "motion/react";

/* ──────────────────────────────────────────────────────────────────────────
   TextAnimation — word/letter/line reveal driven by viewport entry.
   Minimal implementation of the ui-layout scroll-text primitive, built on
   `motion` (a project dependency). Used by components/stylish/TextScroll.tsx.
   ────────────────────────────────────────────────────────────────────────── */

interface TextAnimationProps {
  text: string;
  classname?: string;
  variants?: Variants;
  as?: keyof JSX.IntrinsicElements;
  /** animate per-letter instead of per-word */
  letterAnime?: boolean;
  /** animate the whole line as one unit */
  lineAnime?: boolean;
  direction?: "up" | "down" | "left" | "right";
}

const defaultVariants: Variants = {
  hidden: { filter: "blur(8px)", opacity: 0, y: 18 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { ease: "linear" },
  },
};

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  classname = "",
  variants,
  as = "h2",
  letterAnime = false,
  lineAnime = false,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const v = variants ?? defaultVariants;

  const dirOffset =
    direction === "left"
      ? { x: -24 }
      : direction === "right"
      ? { x: 24 }
      : direction === "down"
      ? { y: -24 }
      : { y: 24 };

  const Tag = motion[as as "h2"] ?? motion.h2;

  if (lineAnime) {
    return (
      <div ref={ref} className="overflow-hidden">
        <Tag
          className={classname}
          initial={{ opacity: 0, ...dirOffset, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {text}
        </Tag>
      </div>
    );
  }

  const tokens = letterAnime ? text.split("") : text.split(/(\s+)/);

  return (
    <div ref={ref}>
      <Tag className={classname}>
        {tokens.map((token, i) => {
          if (/^\s+$/.test(token)) return token;
          return (
            <motion.span
              key={i}
              className="inline-block"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={v}
              transition={{ delay: i * (letterAnime ? 0.02 : 0.05) }}
            >
              {token}
            </motion.span>
          );
        })}
      </Tag>
    </div>
  );
};

export default TextAnimation;
