import About from "@/components/About";
import AboutExtras from "@/components/AboutExtras";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Arc Tech",
  description:
    "Learn about Arc Tech—what A.R.C stands for, our vision, our team, and our engineering roots in Nepal.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "4.5rem 2rem 0",
        }}
      >
        <span className="eyebrow">About us</span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.025em",
            marginTop: "1.25rem",
          }}
        >
          Our <span className="text-gradient">story</span>
        </h1>
      </div>
      <About />
      <AboutExtras />
    </div>
  );
}
