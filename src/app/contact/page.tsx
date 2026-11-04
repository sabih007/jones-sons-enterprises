import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

const description =
  "Contact Jones & Sons Enterprises about partnerships, media requests, or any of the brands in the group.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Jones & Sons Enterprises", description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Start a conversation with the family." />
      <Contact standalone />
      <ScrollFX />
    </>
  );
}
