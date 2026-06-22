import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeScript from "@/components/ThemeScript";

// Display / headings — characterful grotesque
const bricolage = Bricolage_Grotesque({
  variable: "--ff-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body — clean, modern, very legible
const geist = Geist({
  variable: "--ff-body",
  subsets: ["latin"],
  display: "swap",
});

// Accent — expressive high-contrast serif for statement moments only
const instrumentSerif = Instrument_Serif({
  variable: "--ff-accent",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

// Data / labels / code
const jetbrainsMono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arc Tech | We Build, You Grow",
  description:
    "Arc Tech is a software engineering studio from Nepal. We connect people, systems, and solutions—web platforms, apps, cloud, and AI.",
  keywords: [
    "software development",
    "Nepal",
    "engineering solutions",
    "web development",
    "Arc Tech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
