import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact | Arc Tech",
  description:
    "Tell us what you want to build. Arc Tech is a software engineering studio in Kathmandu, Nepal—web, mobile, cloud, and AI.",
};

export default function ContactPage() {
  return <ContactView />;
}
