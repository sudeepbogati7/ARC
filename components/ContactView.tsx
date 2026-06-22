"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";
import styles from "./ContactView.module.css";
import Reveal from "./Reveal";
import teamArt from "@/public/team.jpg";

const DETAILS = [
  { icon: MapPin, label: "Headquarters", value: "Kathmandu, Nepal", accent: "var(--accent-ice)" },
  { icon: Mail, label: "Email", value: "hello@archtech.dev", accent: "var(--accent)" },
  { icon: Phone, label: "Phone", value: "+977 123 456 789", accent: "var(--accent-ice)" },
];

const BUDGETS = ["< $5k", "$5k–$20k", "$20k–$50k", "$50k+"];

export default function ContactView() {
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className="container">
        <Reveal className={styles.header}>
          <span className="eyebrow reveal">Get in touch</span>
          <h1 className={`${styles.title} reveal`}>
            Let&apos;s build the thing that{" "}
            <span className="text-gradient">runs your business.</span>
          </h1>
          <p className={`${styles.subtitle} reveal`}>
            Tell us where you&apos;re stuck or what you want to launch. We reply
            within one business day with a clear next step—no obligation.
          </p>
        </Reveal>

        <div className={styles.layout}>
          {/* Left: details + illustration */}
          <div className={styles.aside}>
            <div className={styles.details}>
              {DETAILS.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className={styles.detail}>
                    <span className={styles.detailIcon} style={{ color: d.accent }}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <span className={styles.detailLabel}>{d.label}</span>
                      <span className={styles.detailValue}>{d.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.artCard}>
              <Image src={teamArt} alt="The Arc Tech team" className={styles.art} sizes="420px" />
              <div className={styles.artCaption}>
                <span className={styles.artDot} />
                Usually replies within a day
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={styles.formCard}>
            {sent ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>
                  <Check size={28} />
                </span>
                <h2 className={styles.successTitle}>Message on its way.</h2>
                <p className={styles.successText}>
                  Thanks for reaching out. We&apos;ll get back to you at the email
                  you provided within one business day.
                </p>
                <button className="btn-outline" onClick={() => setSent(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className={styles.row}>
                  <Field label="Name" name="name" placeholder="Jane Sharma" />
                  <Field label="Email" name="email" type="email" placeholder="jane@company.com" />
                </div>
                <Field label="Company" name="company" placeholder="Acme Inc." optional />

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Project budget</label>
                  <div className={styles.budgets}>
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        className={`${styles.budget} ${budget === b ? styles.budgetActive : ""}`}
                        onClick={() => setBudget(b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="message">
                    What are you building?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={styles.textarea}
                    placeholder="A few sentences about your project, timeline, and goals."
                  />
                </div>

                <button className={`btn-primary ${styles.submit}`} type="submit">
                  Send message <Send size={17} style={{ marginLeft: 8 }} />
                </button>
                <p className={styles.disclaimer}>
                  By sending, you agree we can email you back about your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {optional && <span className={styles.optional}> · optional</span>}
      </label>
      <input id={name} name={name} type={type} className={styles.input} placeholder={placeholder} />
    </div>
  );
}
