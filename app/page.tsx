import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import TextBreak from "@/components/TextBreak";
import ServicesStory from "@/components/ServicesStory";
import { TechStackSection } from "@/components/TechStack";
import ValuesSticky from "@/components/ValuesSticky";
import WorkShowcase from "@/components/WorkShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <TextBreak
        lines={["Most software adds complexity.", "<em>We remove it.</em>"]}
      />
      <ServicesStory />
      <TechStackSection />
      <ValuesSticky />
      <TextBreak
        lines={["Many tools.", "One <b>system</b>.", "<em>One dependable arc.</em>"]}
        align="left"
      />
      <WorkShowcase />
    </>
  );
}
