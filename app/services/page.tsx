import { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { MoveRight } from "lucide-react";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services | Arch Tech",
  description:
    "Software engineering services from Arch Tech—web platforms, mobile apps, cloud & DevOps, AI & automation, product design, and consulting.",
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span className="eyebrow">What we do</span>
          <h1 className={styles.title}>
            How we help you <span className="text-gradient">grow</span>
          </h1>
          <p className={styles.subtitle}>
            Full-stack engineering, from the first sketch to the system your
            business runs on. Pick a discipline to see how we work.
          </p>
        </header>

        <div className={styles.grid}>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`glass-panel ${styles.card}`}
              >
                <span className={styles.icon}>
                  <Icon size={26} />
                </span>
                <h2 className={styles.cardTitle}>{s.label}</h2>
                <p className={styles.cardDesc}>{s.tagline}</p>
                <span className={styles.link}>
                  Learn more <MoveRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
