"use client";

import Image from "next/image";
import { Compass, Heart, Globe } from "lucide-react";
import styles from "./AboutExtras.module.css";
import Reveal from "./Reveal";
import teamArt from "@/public/team.jpg";
import officeArt from "@/public/home.jpg";

const VALUES = [
  { icon: Compass, title: "Direction first", desc: "We start with where you're going, then choose the tools—never the other way round." },
  { icon: Heart, title: "Craft we're proud of", desc: "Software people enjoy using, built by a team that sweats the details." },
  { icon: Globe, title: "Nepal to the world", desc: "Rooted in Kathmandu, shipping for clients across borders and time zones." },
];

export default function AboutExtras() {
  return (
    <>
      {/* Vision */}
      <section className={styles.vision}>
        <div className={`container ${styles.visionGrid}`}>
          <Reveal className={styles.visionText}>
            <span className="eyebrow reveal">Our vision</span>
            <h2 className={`${styles.visionTitle} reveal`}>
              Make great software the <span className="text-gradient">default</span>, not the exception.
            </h2>
            <p className={`${styles.visionBody} reveal`}>
              Too many teams settle for tools that fight them. We started Arc Tech
              to change that for businesses in Nepal and beyond—building systems
              that are fast, dependable, and genuinely pleasant to use. We connect
              people, systems, and solutions into one load-bearing arc, and we
              stay on the line long after launch.
            </p>
            <div className={`${styles.stats} reveal`}>
              <div className={styles.stat}>
                <span className={styles.statValue}>8+</span>
                <span className={styles.statLabel}>Years building</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>40+</span>
                <span className={styles.statLabel}>Systems shipped</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>Uptime delivered</span>
              </div>
            </div>
          </Reveal>
          <Reveal className={styles.visionArtWrap}>
            <Image src={officeArt} alt="The Arc Tech studio" className={`${styles.visionArt} reveal`} sizes="520px" />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className="container">
          <Reveal className={styles.valuesGrid} stagger={0.1}>
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`${styles.valueCard} reveal`}>
                  <span className={styles.valueIcon}>
                    <Icon size={22} />
                  </span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className={styles.team}>
        <div className={`container ${styles.teamGrid}`}>
          <Reveal className={styles.teamArtWrap}>
            <Image src={teamArt} alt="The Arc Tech team" className={`${styles.teamArt} reveal`} sizes="520px" />
          </Reveal>
          <Reveal className={styles.teamText}>
            <span className="eyebrow reveal">Our team</span>
            <h2 className={`${styles.teamTitle} reveal`}>
              A small team that <span className="text-gradient">ships like a big one.</span>
            </h2>
            <p className={`${styles.teamBody} reveal`}>
              Engineers, designers, and product thinkers who&apos;ve built across
              fintech, health, logistics, and AI. You work directly with the
              people writing the code—no layers, no handoffs, no telephone.
            </p>
            <p className={`${styles.teamBody} reveal`}>
              We&apos;re always glad to meet people who care about craft. If
              that&apos;s you, our door is open.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
