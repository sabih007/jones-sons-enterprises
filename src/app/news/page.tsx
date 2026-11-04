import type { Metadata } from "next";
import { Press } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

const description =
  "Press coverage of the Jones & Sons Enterprises portfolio, including CAL Dental USA, Oxy Dental, and All In Capital.";

export const metadata: Metadata = {
  title: "News & press",
  description,
  alternates: { canonical: "/news" },
  openGraph: { title: "News & press", description, url: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="News & press"
        title="In the news across the portfolio."
        intro="Coverage of the group's brands, newest first."
      />
      <Press standalone />
      <ScrollFX />
    </>
  );
}
