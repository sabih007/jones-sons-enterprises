import type { Metadata } from "next";
import { Community } from "@/components/sections";
import { PageHero } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

const description =
  "Youth sports camps, charity drives, and partnerships led by the Jones & Sons brands, putting the group's resources into Southern California families.";

export const metadata: Metadata = {
  title: "Community",
  description,
  alternates: { canonical: "/community" },
  openGraph: { title: "Community impact", description, url: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <PageHero
        kicker="Community impact"
        title="Good business should be felt on the block."
        intro="Through youth sports camps, charity drives, and partnerships led by our brands, the group puts its resources into Southern California families. Recent initiatives through CAL Dental USA include:"
      />
      <Community standalone />
      <ScrollFX />
    </>
  );
}
