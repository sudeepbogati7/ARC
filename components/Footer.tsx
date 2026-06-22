import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";
import { MoveRight, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/public/logo-transparent.png";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaEyebrow}>We build, you grow</span>
              <h2 className={styles.ctaTitle}>Let&apos;s build the thing that runs your business.</h2>
              <p className={styles.ctaDesc}>
                Tell us where you&apos;re stuck or what you want to launch. We&apos;ll
                map the route and give you a clear next step—no obligation.
              </p>
            </div>
            <Link href="/contact" className={`btn-primary ${styles.ctaBtn} cursor-target`}>
              Start a project <MoveRight size={18} style={{ marginLeft: "8px" }} />
            </Link>
          </div>
        </div>

        <div className={styles.footerGrid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Image src={logo} alt="Arc Tech" className={styles.logoImg} sizes="140px" />
            </Link>
            <p className={styles.tagline}>We build, you grow.</p>
            <p className={styles.description}>
              Rooted in the peaks of Nepal, scaling globally. We architect strong, load-bearing digital systems.
            </p>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Services</h4>
            <Link href="/services/web-platforms" className={styles.link}>Web platforms</Link>
            <Link href="/services/mobile-apps" className={styles.link}>Mobile apps</Link>
            <Link href="/services/cloud-devops" className={styles.link}>Cloud & DevOps</Link>
            <Link href="/services/ai-automation" className={styles.link}>AI & automation</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Company</h4>
            <Link href="/about" className={styles.link}>About A.R.C.</Link>
            <Link href="/gallery" className={styles.link}>Our work</Link>
            <Link href="/blog" className={styles.link}>Blog</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Get in touch</h4>
            <p className={styles.contactItem}><MapPin size={16} /> Kathmandu, Nepal</p>
            <p className={styles.contactItem}><Mail size={16} /> hello@archtech.dev</p>
            <p className={styles.contactItem}><Phone size={16} /> +977 123 456 789</p>
          </div>
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Arch Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
