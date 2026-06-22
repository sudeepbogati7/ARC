"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, MoveRight } from "lucide-react";
import styles from "./Navbar.module.css";
import ThemeToggle from "./ThemeToggle";
import SearchCommand from "./SearchCommand";
import logo from "@/public/logo-transparent.png";

const SERVICES = [
  { href: "/services/web-platforms", label: "Web platforms", desc: "Fast, scalable web apps" },
  { href: "/services/mobile-apps", label: "Mobile apps", desc: "iOS, Android & cross-platform" },
  { href: "/services/cloud-devops", label: "Cloud & DevOps", desc: "Infra that holds its load" },
  { href: "/services/ai-automation", label: "AI & automation", desc: "Models and smart workflows" },
  { href: "/services/product-design", label: "Product & UI/UX", desc: "Design people understand" },
  { href: "/services/consulting", label: "Tech consulting", desc: "Strategy and architecture" },
];

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Work" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Left: logo */}
        <Link href="/" className={`${styles.logo} cursor-target`} onClick={() => setMobileOpen(false)}>
          <Image
            src={logo}
            alt="Arc Tech"
            className={styles.logoImg}
            priority
            sizes="120px"
          />
        </Link>

        {/* Center: nav links */}
        <div className={styles.centerNav}>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={`${styles.navLink} cursor-target`} aria-expanded={servicesOpen}>
              Services <ChevronDown size={15} className={servicesOpen ? styles.chevUp : ""} />
            </button>
            <div className={`${styles.megaMenu} ${servicesOpen ? styles.megaOpen : ""}`}>
              <div className={styles.megaGrid}>
                {SERVICES.map((s) => (
                  <Link key={s.href} href={s.href} className={styles.megaItem}>
                    <span className={styles.megaItemLabel}>{s.label}</span>
                    <span className={styles.megaItemDesc}>{s.desc}</span>
                  </Link>
                ))}
              </div>
              <Link href="/services" className={styles.megaFooter}>
                View all services <MoveRight size={15} />
              </Link>
            </div>
          </div>

          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`${styles.navLink} cursor-target`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: search + theme + CTA */}
        <div className={styles.rightCluster}>
          <SearchCommand />
          <ThemeToggle />
          <Link href="/contact" className={`btn-primary ${styles.cta} cursor-target`}>
            Book a call
          </Link>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <span className={styles.mobileGroupLabel}>Services</span>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
              {s.label}
            </Link>
          ))}
          <span className={styles.mobileGroupLabel}>Company</span>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ marginTop: "1.5rem" }}>
            Book a call
          </Link>
        </div>
      )}
    </nav>
  );
}
