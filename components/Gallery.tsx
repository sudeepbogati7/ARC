"use client";

import styles from "./Gallery.module.css";
import Reveal from "./Reveal";
import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";

const works = [
  { id: 1, title: "Fintech dashboard", category: "Web app · UI/UX", color: "linear-gradient(135deg, #6CA8C7, #2B4C63)" },
  { id: 2, title: "E-commerce platform", category: "Full-stack build", color: "linear-gradient(135deg, #FF7849, #B8442A)" },
  { id: 3, title: "Healthcare portal", category: "Secure architecture", color: "linear-gradient(135deg, #8FCBE3, #3E6E84)" },
  { id: 4, title: "Logistics tracker", category: "Mobile app", color: "linear-gradient(135deg, #FF9D6E, #6CA8C7)" },
];

export default function Gallery() {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <Reveal className={styles.header}>
          <div className={styles.headerText}>
            <span className="eyebrow reveal">Selected work</span>
            <h2 className={`${styles.title} reveal`}>
              Systems we&apos;ve <span className="text-gradient">built to last</span>.
            </h2>
          </div>
          <Link href="/gallery" className={`${styles.allLink} reveal`}>
            View all work <MoveRight size={16} />
          </Link>
        </Reveal>

        <Reveal className={styles.grid} stagger={0.1}>
          {works.map((work) => (
            <Link
              href="/gallery"
              key={work.id}
              className={`${styles.card} reveal`}
            >
              <div
                className={styles.imagePlaceholder}
                style={{ background: work.color }}
              >
                <span className={styles.overlayText}>{work.title}</span>
              </div>
              <div className={styles.cardInfo}>
                <div>
                  <h3 className={styles.cardTitle}>{work.title}</h3>
                  <span className={styles.cardCategory}>{work.category}</span>
                </div>
                <span className={styles.viewBtn}>
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
