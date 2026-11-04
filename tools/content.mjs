/**
 * Single source of truth for every word on the site.
 *
 * Edit here, run `node tools/build.mjs`, and the HTML under static/ is rewritten.
 * Carried over verbatim from the previous src/content/*.ts files.
 */

export const site = {
  name: "Jones & Sons Enterprises",
  legalName: "Jones & Sons Enterprises Inc",
  url: "https://jonesandsonsenterprises.com",
  founded: 2018,
  location: "Rancho Palos Verdes, California",
  description:
    "Jones & Sons Enterprises is a family-owned holding company in Rancho Palos Verdes, California, with interests in healthcare, commercial real estate, investments, business management, and sports and entertainment.",
  mission: "Our mission is to leave an emotional impact on everyone we encounter.",
  founders: [
    { name: "Terrill James Jones", role: "Co-founder", initials: "TJ" },
    { name: "Deanna Garcia", role: "Co-founder", initials: "DG" },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Our brands", href: "#brands" },
  { label: "Industries", href: "#industries" },
  { label: "Our mission", href: "#mission" },
  { label: "News & press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  { name: "Family", text: "We build what we would be proud to hand to the next generation." },
  { name: "Integrity", text: "We say what we will do, then do it, in every deal and every office." },
  { name: "Trust", text: "Partners and patients return because they were treated fairly the first time." },
  { name: "Community", text: "Our businesses live in Southern California neighborhoods, so we invest in them." },
  { name: "Service", text: "Every brand in the group exists to make someone's day easier." },
];

/**
 * Verified social profiles only. The archived site's social links could not be
 * recovered (see AUDIT.md). Add entries here and they render in the footer and
 * contact section: { label: "Instagram", href: "https://..." }
 */
export const social = [];

export const brands = [
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
    logo: { src: "brands/cal-dental-usa.png", width: 1200, height: 268 },
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
    logo: { src: "brands/all-in-capital.png", width: 466, height: 223 },
    website: { href: "https://allincapitaldental.com/", label: "Visit allincapitaldental.com" },
  },
];

export const sectors = [
  { id: "real-estate", name: "Real estate", text: "Commercial property and the sale and acquisition of healthcare practices." },
  { id: "healthcare", name: "Healthcare", text: "Dental care that stays affordable and close to home across Southern California." },
  { id: "investments", name: "Investments", text: "Long-term holdings chosen for the next generation, not the next quarter." },
  { id: "sports-entertainment", name: "Sports & entertainment", text: "Partnerships with athletes and entertainers that give back to local families." },
  { id: "memorabilia", name: "Memorabilia", text: "Collectibles that keep the history of the game in good hands." },
  { id: "business-management", name: "Business management", text: "Operating support, capital, and direction for every company in the group." },
];

export const sectorName = (id) => (sectors.find((s) => s.id === id) || {}).name || id;
export const brandsInSector = (id) => brands.filter((b) => b.sectors.includes(id));
export const getBrand = (slug) => brands.find((b) => b.slug === slug);

/**
 * Coverage of the group's brands, sourced from links published on
 * caldentalusa.com/partnerships. The archived Jones & Sons press releases could
 * not be recovered (see AUDIT.md); add them here and they appear in the
 * News & Press section, newest first. `date` is set only when verified.
 */
export const press = [
  {
    title: "Swing, Swish & Score Golf Invitational brings NBA All-Star Weekend energy to Los Angeles",
    outlet: "MENAFN",
    href: "https://menafn.com/1110697737/Swing-Swish-Score-Golf-Invitational-Brings-NBA-All-Star-Weekend-Energy-To-Los-Angeles",
    date: "2026-02-04",
    brand: "CAL Dental USA",
  },
  {
    title: "CAL Dental USA welcomes NBA champion Kendrick Perkins as a partner in its Bell, CA office",
    outlet: "Business Wire",
    href: "https://www.businesswire.com/news/home/20240708064544/en/Cal-Dental-USA-Welcomes-NBA-Champion-Kendrick-Perkins-as-Partner-in-Bell-CA-Office",
    date: "2024-07-08",
    brand: "CAL Dental USA",
  },
  {
    title: "Lamar Odom promotes a new Oxy Dental office",
    outlet: "TMZ",
    href: "https://www.tmz.com/watch/2024-01-10-011024-lamar-odom-1755595-876",
    date: "2024-01-13",
    brand: "Oxy Dental",
  },
  {
    title: "The Game and CAL Dental USA donate $50K to support children's dental health",
    outlet: "AllHipHop",
    href: "https://allhiphop.com/music-news/rapper-the-game-teams-up-with-cal-dental-usa-in-50k-donation-to-support-childrens-dental-health/",
    date: "2023-08-15",
    brand: "CAL Dental USA",
  },
  {
    title: "CAL Dental USA and Dentis Implants partner to widen access to implant care",
    outlet: "EIN Presswire",
    href: "https://www.einpresswire.com/article/590067016/cal-dental-usa-and-dentis-implants-strike-a-deal-to-deliver-quality-implant-services-to-a-wider-market",
    date: "2022-09-09",
    brand: "CAL Dental USA",
  },
  {
    title: "Baron Davis joins CAL Dental USA and Black Santa for a multi-year holiday partnership",
    outlet: "California Entertainment Press",
    href: "https://www.californiaentertainmentpress.com/article/762457679-2x-nba-all-star-baron-davis-teams-up-with-cal-dental-usa-and-black-santa-for-a-multi-year-holiday-partnership",
    brand: "CAL Dental USA",
  },
  {
    title: "David Long Jr. and CAL Dental USA help bring smiles to families this holiday season",
    outlet: "Golden State Newswire",
    href: "https://www.goldenstatenewswire.com/article/556833437-david-long-jr-teams-up-with-cal-dental-usa-to-help-bring-smiles-to-families-this-holiday-season",
    brand: "CAL Dental USA",
  },
  {
    title: "CAL Dental USA and LA Riot partner for the 2026 BIG3 season",
    outlet: "AP News",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/press-release-d875cf7ca4ed6d9aac2137d6af716e9a",
    brand: "CAL Dental USA",
  },
];

/** Verified from caldentalusa.com/partnerships and the coverage it links to. */
export const initiatives = [
  {
    name: "Black Santa holiday partnership",
    partner: "With Baron Davis",
    text: "A multi-year holiday partnership bringing dental care and gifts to Southern California families.",
    href: "https://www.californiaentertainmentpress.com/article/762457679-2x-nba-all-star-baron-davis-teams-up-with-cal-dental-usa-and-black-santa-for-a-multi-year-holiday-partnership",
  },
  {
    name: "Dental costs covered for 200+ families",
    partner: "With Birdvision Entertainment",
    text: "A giveback initiative that paid for dental care for more than 200 families.",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/business-health-care-costs-ein-presswire-newsmatics-1db2039b2d1347cdded73e469fe09feb",
  },
  {
    name: "$50,000 for children's dental health",
    partner: "With The Game",
    text: "A donation dedicated to dental care for children.",
    href: "https://allhiphop.com/music-news/rapper-the-game-teams-up-with-cal-dental-usa-in-50k-donation-to-support-childrens-dental-health/",
  },
  {
    name: "Holiday dental-care assistance",
    partner: "With David Long Jr.",
    text: "Helping families afford dental care during the holiday season.",
    href: "https://www.goldenstatenewswire.com/article/556833437-david-long-jr-teams-up-with-cal-dental-usa-to-help-bring-smiles-to-families-this-holiday-season",
  },
  {
    name: "Ricky Davis Legacy Foundation",
    partner: "With Birdvision Entertainment and West Coast Lions",
    text: "Community programs led by NBA alumni.",
    href: "https://apnews.com/press-release/ein-presswire-newsmatics/ricky-davis-3064929c575a0e2ec837b313933755a9",
  },
  {
    name: "Swing, Swish & Score Golf Invitational",
    text: "An All-Star Weekend event in Los Angeles where sports, entertainment, and community meet.",
    href: "https://menafn.com/1110697737/Swing-Swish-Score-Golf-Invitational-Brings-NBA-All-Star-Weekend-Energy-To-Los-Angeles",
  },
];

export const contactTopics = ["General inquiry", "Partnership", "Media & press", "One of our brands"];

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
