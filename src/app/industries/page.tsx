import type { Metadata } from "next";
import { Industries } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

const description =
  "The six industries Jones & Sons Enterprises operates in: real estate, healthcare, investments, sports and entertainment, memorabilia, and business management.";

export const metadata: Metadata = {
  title: "Industries",
  description,
  alternates: { canonical: "/industries" },
  openGraph: { title: "Industries & expertise", description, url: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries & expertise"
        title="Six industries, one family standard."
        intro="Each industry below is run through one or more of our operating brands. Select a brand to see what it does."
      />
      <Industries standalone />
      <ScrollFX />
    </>
  );
}
