import Gallery from "@/components/Gallery";
import { Metadata } from "next";

export const metadata: Metadata = { 
  title: "Works | Arch Tech",
  description: "View our portfolio of beautifully engineered digital experiences."
};

export default function GalleryPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '-4rem', position: 'relative', zIndex: 20 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)' }}>
          Selected <span className="text-gradient">Projects</span>
        </h1>
      </div>
      <Gallery />
    </div>
  );
}
