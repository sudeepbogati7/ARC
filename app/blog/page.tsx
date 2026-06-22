import type { Metadata } from "next";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog | Arc Tech",
  description: "Engineering deep-dives, design notes, and field reports from the Arc Tech team.",
};

const posts = [
  { id: 1, title: "Scaling Next.js for global markets", date: "June 15, 2026", read: "5 min", cat: "Engineering", featured: true,
    excerpt: "How we architect Next.js apps that stay fast from Kathmandu to California—edge rendering, caching, and the trade-offs that matter." },
  { id: 2, title: "The case for boring infrastructure", date: "June 02, 2026", read: "7 min", cat: "Infrastructure",
    excerpt: "Why we reach for the dull, dependable option—and how it lets our clients sleep through launch night." },
  { id: 3, title: "Designing motion that means something", date: "May 20, 2026", read: "4 min", cat: "Design",
    excerpt: "Animation as signposting, not decoration. A short field guide to motion that helps people instead of showing off." },
  { id: 4, title: "Shipping AI features users trust", date: "May 06, 2026", read: "6 min", cat: "AI",
    excerpt: "Putting models behind approvals and guardrails so AI does the work without changing how your team operates." },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span className="eyebrow">Field notes</span>
          <h1 className={styles.title}>
            Arc Tech <span className="text-gradient">insights</span>
          </h1>
          <p className={styles.subtitle}>
            Engineering deep-dives, design notes, and lessons from the build.
          </p>
        </header>

        {/* Featured */}
        <Link href="/blog" className={styles.featured}>
          <div className={styles.featuredArt} aria-hidden="true">
            <span className={styles.featuredCat}>{featured.cat}</span>
          </div>
          <div className={styles.featuredBody}>
            <span className={styles.meta}>{featured.date} · {featured.read} read</span>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
            <span className={styles.readLink}>Read article <MoveRight size={16} /></span>
          </div>
        </Link>

        {/* Grid */}
        <div className={styles.grid}>
          {rest.map((p) => (
            <Link href="/blog" key={p.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cat}>{p.cat}</span>
                <span className={styles.meta}>{p.read}</span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardExcerpt}>{p.excerpt}</p>
              <div className={styles.cardFoot}>
                <span className={styles.meta}>{p.date}</span>
                <MoveRight size={16} className={styles.cardArrow} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
