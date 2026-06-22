"use client";

import React, { forwardRef, useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────────────
   AnimatedBeam — an animated gradient SVG path drawn between two DOM nodes.
   Adapted from the Magic UI pattern; uses `motion` (already a project dep).
   ────────────────────────────────────────────────────────────────────────── */

export interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  dotted?: boolean;
  dotSpacing?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#8FCBE3",
  gradientStopColor = "#FF7849",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dotted = false,
  dotSpacing = 6,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();

    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2"
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={dotted ? `${dotSpacing} ${dotSpacing}` : "none"}
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
        strokeDasharray={dotted ? `${dotSpacing} ${dotSpacing}` : "none"}
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

/* A circular node that anchors a beam endpoint. */
export const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border border-[rgba(234,238,242,0.12)] bg-elevated p-3 shadow-[0_0_20px_-12px_rgba(143,203,227,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

/* ── Brand-relevant tech-stack icons (inline SVG, no external deps) ── */
const wrap = (children: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
    {children}
  </svg>
);

export const Icons = {
  logo: () => (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <path
        d="M6 38 A 18 18 0 0 1 42 38"
        fill="none"
        stroke="#FF7849"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="38" r="3.5" fill="#6CA8C7" />
      <circle cx="24" cy="20" r="3.5" fill="#8FCBE3" />
      <circle cx="42" cy="38" r="3.5" fill="#FF7849" />
    </svg>
  ),
  typescript: () =>
    wrap(
      <>
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path
          fill="#fff"
          d="M13.3 18.3v-2c.3.2.7.3 1.1.4.4.1.8.2 1.2.2.3 0 .5 0 .7-.1l.4-.2.2-.2.1-.3c0-.1 0-.3-.1-.4l-.4-.3-.6-.3-.7-.3c-.6-.3-1.1-.6-1.4-1-.3-.4-.5-.9-.5-1.4 0-.5.1-.9.3-1.2.2-.3.4-.6.8-.8.3-.2.7-.4 1.1-.5.4-.1.9-.1 1.3-.1.5 0 .9 0 1.2.1.3 0 .6.1.9.2v1.9c-.1-.1-.3-.2-.5-.3l-.6-.2-.6-.1H17c-.3 0-.5 0-.7.1l-.4.2-.2.2-.1.3c0 .1 0 .2.1.3l.3.3.5.3.7.3c.4.2.7.3 1 .5l.7.5c.2.2.3.4.4.6.1.2.1.5.1.8 0 .5-.1.9-.3 1.3-.2.3-.5.6-.8.8l-1.2.4c-.4.1-.9.1-1.4.1-.5 0-1 0-1.4-.1-.4 0-.8-.2-1.1-.3ZM10 9.9v8.4H7.9V9.9H5.5V8.2h6.9v1.7Z"
        />
      </>
    ),
  reactjs: () =>
    wrap(
      <g fill="none" stroke="#61DAFB" strokeWidth="1">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4.3" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.3"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.3"
          transform="rotate(120 12 12)"
        />
      </g>
    ),
  nextjs: () =>
    wrap(
      <>
        <circle cx="12" cy="12" r="11" fill="#000" />
        <path
          d="M9 8v8M9 8l7.5 9.5M16 8v6"
          stroke="#fff"
          strokeWidth="1.3"
          fill="none"
        />
      </>
    ),
  tailwindcss: () =>
    wrap(
      <path
        fill="#38BDF8"
        d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.7 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.7-1.9-1.4C19.4 7.1 18.3 6 16 6h-4Zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.7.2 1.3.7 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.7-.2-1.3-.7-1.9-1.4-.9-1-2-2.1-4.3-2.1Z"
      />
    ),
  gsap: () =>
    wrap(
      <>
        <circle cx="12" cy="12" r="11" fill="#0AE448" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fill="#0D0D0D"
          fontFamily="system-ui, sans-serif"
        >
          gsap
        </text>
      </>
    ),
  node: () =>
    wrap(
      <>
        <path fill="#539E43" d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="700"
          fill="#fff"
          fontFamily="system-ui, sans-serif"
        >
          JS
        </text>
      </>
    ),
  python: () =>
    wrap(
      <>
        <path
          fill="#3776AB"
          d="M12 2c-2.5 0-4 1-4 3v2h4v1H6c-2 0-3 1.5-3 4s1 4 3 4h1v-3c0-2 1.5-3 3-3h3c2 0 3-1 3-3V5c0-2-1.5-3-4-3h-3Zm-1.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
        />
        <path
          fill="#FFD43B"
          d="M12 22c2.5 0 4-1 4-3v-2h-4v-1h6c2 0 3-1.5 3-4s-1-4-3-4h-1v3c0 2-1.5 3-3 3h-3c-2 0-3 1-3 3v3c0 2 1.5 3 4 3h3Zm1.5-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
        />
      </>
    ),
  aws: () =>
    wrap(
      <>
        <text
          x="12"
          y="11"
          textAnchor="middle"
          fontSize="7"
          fontWeight="800"
          fill="#FF9900"
          fontFamily="system-ui, sans-serif"
        >
          aws
        </text>
        <path
          d="M5 15c4 2.5 10 2.5 14 0"
          stroke="#FF9900"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </>
    ),
  postgres: () =>
    wrap(
      <>
        <ellipse cx="12" cy="12" rx="9" ry="10" fill="#336791" />
        <path
          d="M8 9c0 4 1 7 4 7s4-3 4-7"
          stroke="#fff"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="9.5" cy="9" r="1" fill="#fff" />
      </>
    ),
  docker: () =>
    wrap(
      <>
        <rect x="4" y="11" width="3" height="3" fill="#2496ED" />
        <rect x="7.5" y="11" width="3" height="3" fill="#2496ED" />
        <rect x="11" y="11" width="3" height="3" fill="#2496ED" />
        <rect x="7.5" y="7.5" width="3" height="3" fill="#2496ED" />
        <rect x="11" y="7.5" width="3" height="3" fill="#2496ED" />
        <rect x="14.5" y="11" width="3" height="3" fill="#2496ED" />
        <path
          d="M3 14.5c5 2 12 1.5 15-2 .5 2-1 5-5 5H7c-2 0-3.5-1.2-4-3Z"
          fill="#2496ED"
        />
      </>
    ),
  framer: () =>
    wrap(
      <path fill="#FF7849" d="M5 2h14v7H12l7 7v6l-7-7v7H5V9l7 7H5V2Z" />
    ),
};
