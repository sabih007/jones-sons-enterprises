export type Sector =
  | "real-estate"
  | "healthcare"
  | "investments"
  | "sports-entertainment"
  | "memorabilia"
  | "business-management";

export type Brand = {
  slug: string;
  name: string;
  monogram: string;
  sectors: Sector[];
  summary: string;
  body: string[];
  facts?: { label: string; value: string }[];
  logo?: { src: string; width: number; height: number };
  website?: { href: string; label: string };
};

export const brands: Brand[] = [
  {
    slug: "jones-and-sons-enterprises",
    name: "Jones & Sons Enterprises Inc",
    monogram: "J&S",
    sectors: ["investments", "business-management", "real-estate"],
    summary: "The family holding company that owns, guides, and invests in every brand in the group.",
    body: [
      "Jones & Sons Enterprises Inc was founded in 2018 by Terrill James Jones and Deanna Garcia in Rancho Palos Verdes, California.",
      "The parent company holds the group's investments and provides the management, capital, and long-term direction its operating brands rely on.",
    ],
    facts: [
      { label: "Founded", value: "2018" },
      { label: "Headquarters", value: "Rancho Palos Verdes, CA" },
    ],
  },
  {
    slug: "cal-dental-usa",
    name: "CAL Dental USA",
    monogram: "CAL",
    sectors: ["healthcare", "sports-entertainment"],
    summary: "A network of more than 26 dental offices across Los Angeles and Orange County.",
    body: [
      "CAL Dental USA connects patients with family, cosmetic, implant, and emergency dentistry across Southern California, with payment plans for patients without insurance.",
      "The network partners with athletes, entertainers, and community organizations on initiatives that bring dental care and giving to local families.",
    ],
    facts: [
      { label: "Offices", value: "26+ across LA and Orange County" },
      { label: "Care", value: "Family, cosmetic, implants, Invisalign, emergency" },
    ],
    logo: { src: "/brands/cal-dental-usa.png", width: 1200, height: 268 },
    website: { href: "https://caldentalusa.com/", label: "Visit caldentalusa.com" },
  },
  {
    slug: "jones-and-sons-sports-memorabilia",
    name: "Jones & Sons Sports Memorabilia",
    monogram: "J&S",
    sectors: ["memorabilia", "sports-entertainment"],
    summary: "The family's sports memorabilia business, rooted in a lifelong connection to the game.",
    body: ["Jones & Sons Sports Memorabilia carries the group's love of sport into collectibles and keepsakes."],
  },
  {
    slug: "mac-dental",
    name: "MAC Dental",
    monogram: "MAC",
    sectors: ["healthcare"],
    summary: "Family and general dentistry offices within the CAL Dental USA network.",
    body: [
      "MAC Dental offices, including Mac Dental Lakewood and Mac Vermont, provide family and general dentistry as part of the CAL Dental USA network in Southern California.",
    ],
    facts: [{ label: "Network", value: "CAL Dental USA" }],
    website: { href: "https://caldentalusa.com/our-offices/", label: "Find a MAC Dental office" },
  },
  {
    slug: "oxy-dental",
    name: "Oxy Dental",
    monogram: "OXY",
    sectors: ["healthcare"],
    summary: "Family and cosmetic dentistry offices within the CAL Dental USA network.",
    body: [
      "Oxy Dental offices, including Oxy Cypress, provide family and cosmetic dentistry as part of the CAL Dental USA network.",
      "Oxy Dental's collaboration with Lamar Odom was covered by TMZ in January 2024.",
    ],
    facts: [{ label: "Network", value: "CAL Dental USA" }],
    website: { href: "https://caldentalusa.com/our-offices/", label: "Find an Oxy Dental office" },
  },
  {
    slug: "ceo-and-spirits",
    name: "CEO & Spirits",
    monogram: "C&S",
    sectors: [],
    summary: "A member of the Jones & Sons family of brands.",
    body: ["CEO & Spirits is part of the Jones & Sons Enterprises portfolio."],
  },
  {
    slug: "all-in-capital",
    name: "All In Capital",
    monogram: "AIC",
    sectors: ["real-estate", "healthcare", "investments"],
    summary: "Brokerage for the sale and acquisition of dental practices across Southern California.",
    body: [
      "All In Capital connects qualified buyers with dental practices in Los Angeles, Orange County, and the South Bay, and offers confidential valuations to owners considering a transition.",
      "Every opportunity is shared with discretion and requires an approved NDA.",
    ],
    facts: [
      { label: "Focus", value: "Dental practice sales and real estate" },
      { label: "Brokerage", value: "DRE #02298795" },
    ],
    logo: { src: "/brands/all-in-capital.png", width: 466, height: 223 },
    website: { href: "https://allincapitaldental.com/", label: "Visit allincapitaldental.com" },
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);

export const sectors: { id: Sector; name: string; text: string }[] = [
  { id: "real-estate", name: "Real estate", text: "Commercial property and the sale and acquisition of healthcare practices." },
  { id: "healthcare", name: "Healthcare", text: "Dental care that stays affordable and close to home across Southern California." },
  { id: "investments", name: "Investments", text: "Long-term holdings chosen for the next generation, not the next quarter." },
  { id: "sports-entertainment", name: "Sports & entertainment", text: "Partnerships with athletes and entertainers that give back to local families." },
  { id: "memorabilia", name: "Memorabilia", text: "Collectibles that keep the history of the game in good hands." },
  { id: "business-management", name: "Business management", text: "Operating support, capital, and direction for every company in the group." },
];

export const sectorName = (id: Sector) => sectors.find((s) => s.id === id)?.name ?? id;
export const brandsInSector = (id: Sector) => brands.filter((b) => b.sectors.includes(id));
