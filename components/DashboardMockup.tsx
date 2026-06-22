"use client";

import styles from "./DashboardMockup.module.css";
import CountUp from "./CountUp";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Search,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Check,
  Bell,
} from "lucide-react";

/**
 * A realistic Arc Tech product dashboard, built in CSS/SVG so it's crisp,
 * themeable, and weightless. A main window plus two floating cards layered in
 * front for depth — the layered "product surface" look. Tilt/parallax is
 * applied by the parent (Hero).
 */
export default function DashboardMockup() {
  return (
    <div className={styles.scene}>
      <MainWindow />

      {/* floating card — top right: a KPI tile */}
      <div className={`${styles.floatCard} ${styles.floatKpi}`}>
        <div className={styles.kpiHead}>
          <span className={styles.kpiLabel}>New customers</span>
          <span className={styles.kpiBadge}>
            <ArrowUpRight size={11} /> 20%
          </span>
        </div>
        <span className={styles.kpiValue}>
          <CountUp value={1234} />
        </span>
        <Sparkline />
      </div>

      {/* floating card — bottom left: a deploy notification */}
      <div className={`${styles.floatCard} ${styles.floatToast}`}>
        <span className={styles.toastIcon}>
          <Check size={14} />
        </span>
        <div>
          <span className={styles.toastTitle}>Deploy succeeded</span>
          <span className={styles.toastMeta}>production · 12s ago</span>
        </div>
        <Bell size={13} className={styles.toastBell} />
      </div>
    </div>
  );
}

function MainWindow() {
  return (
    <div className={styles.window}>
      {/* title bar */}
      <div className={styles.titleBar}>
        <span className={styles.dots}>
          <i /><i /><i />
        </span>
        <span className={styles.urlPill}>
          <Search size={11} /> app.archtech.dev
        </span>
        <span className={styles.titleSpacer} />
      </div>

      <div className={styles.body}>
        {/* sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.brandRow}>
            <span className={styles.brandMark} />
            <span className={styles.brandName}>Arch&nbsp;Tech</span>
          </div>
          <nav className={styles.nav}>
            <span className={`${styles.navItem} ${styles.navActive}`}>
              <LayoutDashboard size={14} /> Overview
            </span>
            <span className={styles.navItem}><BarChart3 size={14} /> Analytics</span>
            <span className={styles.navItem}><Activity size={14} /> Activity</span>
            <span className={styles.navItem}><Users size={14} /> Team</span>
            <span className={styles.navItem}><Settings size={14} /> Settings</span>
          </nav>
        </aside>

        {/* main */}
        <div className={styles.main}>
          <div className={styles.statRow}>
            <Stat label="Revenue" value={1.25} prefix="$" suffix="M" decimals={2} delta="+18%" up />
            <Stat label="Active users" value={45678} delta="+12%" up />
            <Stat label="Uptime" value={99.9} suffix="%" decimals={1} delta="SLA" />
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHead}>
              <span className={styles.chartTitle}>
                <TrendingUp size={14} /> Total visitors
              </span>
              <span className={styles.chartRange}>Last 3 months</span>
            </div>
            <Chart />
          </div>

          <div className={styles.miniGrid}>
            <div className={styles.miniCard}>
              <span className={styles.miniLabel}>Deployments</span>
              <Bars />
            </div>
            <div className={styles.miniCard}>
              <span className={styles.miniLabel}>Conversion</span>
              <Donut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  prefix,
  suffix,
  decimals,
  delta,
  up,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </span>
      <span className={`${styles.statDelta} ${up ? styles.up : ""}`}>{delta}</span>
    </div>
  );
}

function Chart() {
  // smooth area chart
  return (
    <svg className={styles.chartSvg} viewBox="0 0 320 90" preserveAspectRatio="none">
      <defs>
        <linearGradient id="dashFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 70 C 30 55, 50 60, 80 45 S 130 20, 160 35 S 220 60, 250 30 S 300 10, 320 22 L320 90 L0 90 Z"
        fill="url(#dashFill)"
      />
      <path
        d="M0 70 C 30 55, 50 60, 80 45 S 130 20, 160 35 S 220 60, 250 30 S 300 10, 320 22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Bars() {
  const heights = [40, 65, 50, 80, 60, 90, 70];
  return (
    <div className={styles.bars}>
      {heights.map((h, i) => (
        <span key={i} className={styles.bar} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function Donut() {
  return (
    <svg className={styles.donut} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="14" fill="none" stroke="var(--line-strong)" strokeWidth="4" />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="var(--accent-ice)"
        strokeWidth="4"
        strokeDasharray="62 88"
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text x="18" y="20.5" textAnchor="middle" className={styles.donutText}>
        71%
      </text>
    </svg>
  );
}

function Sparkline() {
  return (
    <svg className={styles.sparkline} viewBox="0 0 120 32" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-ice)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent-ice)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 26 L20 18 L40 22 L60 10 L80 16 L100 6 L120 12 L120 32 L0 32 Z" fill="url(#sparkFill)" />
      <path
        d="M0 26 L20 18 L40 22 L60 10 L80 16 L100 6 L120 12"
        fill="none"
        stroke="var(--accent-ice)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
