"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MoveRight, MoveLeft } from "lucide-react";
import { SERVICES, getService } from "@/lib/services";
import styles from "./ServiceDetail.module.css";
import Reveal from "./Reveal";
import TargetCursor from "./stylish/TargetCursor";

export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return notFound();
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div className={styles.page}>
      {/* Spinning target cursor — scoped to service detail pages only */}
      <TargetCursor targetSelector=".cursor-target" hideDefaultCursor={false} />
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className="container">
          <Link href="/services" className={styles.back}>
            <MoveLeft size={16} /> All services
          </Link>
          <Reveal className={styles.heroInner}>
            <span className={`${styles.iconBadge} reveal`}>
              <Icon size={30} />
            </span>
            <h1 className={`${styles.title} reveal`}>{service.label}</h1>
            <p className={`${styles.tagline} reveal`}>{service.tagline}</p>
            <p className={`${styles.summary} reveal`}>{service.summary}</p>
            <div className={`${styles.actions} reveal`}>
              <Link href="/contact" className="btn-primary">
                Start a project <MoveRight size={18} style={{ marginLeft: 8 }} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <div className="container">
          <Reveal className={styles.sectionHead}>
            <span className="eyebrow reveal">What&apos;s included</span>
            <h2 className={`${styles.sectionTitle} reveal`}>
              How we make it <span className="text-gradient">real</span>
            </h2>
          </Reveal>
          <Reveal className={styles.capGrid} stagger={0.08}>
            {service.capabilities.map((c) => (
              <div key={c.title} className={`glass-panel ${styles.capCard} reveal`}>
                <span className={styles.capCheck}>
                  <Check size={16} />
                </span>
                <h3 className={styles.capTitle}>{c.title}</h3>
                <p className={styles.capDesc}>{c.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Stack + outcome */}
      <section className={styles.section}>
        <div className="container">
          <Reveal className={styles.split}>
            <div className={`${styles.outcome} reveal`}>
              <span className="eyebrow">The payoff</span>
              <p className={styles.outcomeText}>{service.outcome}</p>
              <p className={styles.slogan}>We build, you grow.</p>
            </div>
            <div className={`${styles.stackBox} reveal`}>
              <span className={styles.stackLabel}>Tools we reach for</span>
              <div className={styles.stackList}>
                {service.stack.map((s) => (
                  <span key={s} className={styles.stackChip}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other services */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.exploreTitle}>Explore other services</h2>
          <div className={styles.otherGrid}>
            {others.map((s) => {
              const OIcon = s.icon;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className={`glass-panel ${styles.otherCard}`}>
                  <span className={styles.otherIcon}>
                    <OIcon size={20} />
                  </span>
                  <span className={styles.otherLabel}>{s.label}</span>
                  <MoveRight size={16} className={styles.otherArrow} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
