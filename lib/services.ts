import {
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  PenTool,
  Compass,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  label: string;
  tagline: string;
  summary: string;
  /** what's included */
  capabilities: { title: string; desc: string }[];
  /** the tools we reach for */
  stack: string[];
  /** how it maps to the ARC promise */
  outcome: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "web-platforms",
    icon: Globe,
    label: "Web platforms",
    tagline: "Fast, scalable web apps people actually enjoy using.",
    summary:
      "From marketing sites to complex dashboards, we build web platforms that load instantly, scale cleanly, and stay maintainable long after launch.",
    capabilities: [
      { title: "Product web apps", desc: "Dashboards, portals, and SaaS front-ends built on a modern React/Next.js core." },
      { title: "Marketing & CMS", desc: "Fast, editable sites your team can update without calling an engineer." },
      { title: "Performance & SEO", desc: "Core Web Vitals, server rendering, and search visibility built in from day one." },
      { title: "Design systems", desc: "Reusable component libraries so your product stays consistent as it grows." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP"],
    outcome: "The dependable front door to your business—built to carry traffic and grow with you.",
  },
  {
    slug: "mobile-apps",
    icon: Smartphone,
    label: "Mobile apps",
    tagline: "iOS, Android, and cross-platform apps that feel native.",
    summary:
      "We design and ship mobile experiences that are fast, offline-aware, and a pleasure to use—on one shared codebase where it makes sense.",
    capabilities: [
      { title: "Cross-platform", desc: "One codebase for iOS and Android with React Native, without sacrificing feel." },
      { title: "Native modules", desc: "Drop to native when performance or device features demand it." },
      { title: "Offline-first", desc: "Apps that keep working when the signal doesn't, syncing when it returns." },
      { title: "App store delivery", desc: "We handle builds, review, and release pipelines end to end." },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Swift", "Kotlin"],
    outcome: "Your business in everyone's pocket—reliable whether they're online or on a ridge.",
  },
  {
    slug: "cloud-devops",
    icon: Cloud,
    label: "Cloud & DevOps",
    tagline: "Infrastructure that holds its load when it matters.",
    summary:
      "We design and run cloud infrastructure that scales with demand, recovers from failure, and ships changes safely—so you sleep through the launch.",
    capabilities: [
      { title: "Cloud architecture", desc: "Right-sized, cost-aware infrastructure on AWS, GCP, or Azure." },
      { title: "CI/CD pipelines", desc: "Automated testing and deploys, so shipping is boring and safe." },
      { title: "Observability", desc: "Logs, metrics, and alerts that catch issues before your users do." },
      { title: "Reliability", desc: "Backups, failover, and 99.9% uptime designed in, not bolted on." },
    ],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    outcome: "A load-bearing foundation—the strong arc your whole business stands on.",
  },
  {
    slug: "ai-automation",
    icon: Cpu,
    label: "AI & automation",
    tagline: "Models and workflows that do the busywork for you.",
    summary:
      "We embed AI and automation where they earn their place—turning repetitive, manual work into systems that run quietly in the background.",
    capabilities: [
      { title: "LLM integration", desc: "Assistants, search, and generation wired into your product with the latest models." },
      { title: "Workflow automation", desc: "Connect the tools you already use and let the handoffs happen on their own." },
      { title: "Document & data AI", desc: "Extract, classify, and summarize the information buried in your operations." },
      { title: "Custom models", desc: "When off-the-shelf won't do, we build and tune models on your data." },
    ],
    stack: ["Claude", "Python", "LangChain", "Vector DBs", "Node.js"],
    outcome: "Complexity moved to our side of the screen—so your team does the work only people can.",
  },
  {
    slug: "product-design",
    icon: PenTool,
    label: "Product & UI/UX",
    tagline: "Interfaces people understand on sight.",
    summary:
      "We design products around how people actually think and work—clarity first, polish always—so adoption comes naturally.",
    capabilities: [
      { title: "Product strategy", desc: "Turning goals and constraints into a clear, buildable product plan." },
      { title: "UX & flows", desc: "Research-backed flows that remove friction instead of adding screens." },
      { title: "UI & design systems", desc: "Distinctive, accessible interfaces backed by a reusable system." },
      { title: "Prototyping", desc: "Interactive prototypes that test the hard parts before we build them." },
    ],
    stack: ["Figma", "Framer", "GSAP", "React", "Storybook"],
    outcome: "Software people choose to use—the human end of every arc we build.",
  },
  {
    slug: "consulting",
    icon: Compass,
    label: "Tech consulting",
    tagline: "Strategy and architecture from people who ship.",
    summary:
      "Sometimes you need direction more than code. We help you choose the right architecture, stack, and roadmap—grounded in what we've actually built.",
    capabilities: [
      { title: "Architecture review", desc: "An honest read on your system's strengths, risks, and next moves." },
      { title: "Technology selection", desc: "The right tools for your problem and team—no résumé-driven choices." },
      { title: "Team augmentation", desc: "Senior engineers who plug into your team and raise the bar." },
      { title: "Roadmapping", desc: "A sequenced plan that ties technical work to business outcomes." },
    ],
    stack: ["Architecture", "Code audits", "Roadmaps", "Mentoring"],
    outcome: "A clear route up—so you climb in the right direction from the first step.",
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
