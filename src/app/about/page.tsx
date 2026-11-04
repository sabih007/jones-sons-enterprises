import type { Metadata } from "next";
import { About } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

const description =
  "Jones & Sons Enterprises is a family-owned holding company founded in 2018 by Terrill James Jones and Deanna Garcia in Rancho Palos Verdes, California.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Jones & Sons Enterprises", description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Jones & Sons"
        title="A family business that thinks in decades."
        intro="What the family owns, how it is run, and the standard every brand in the group is held to."
      />
      <About standalone />
      {/* Mounted per page so its effect runs once this subtree has hydrated. */}
      <ScrollFX />
    </>
  );
}
