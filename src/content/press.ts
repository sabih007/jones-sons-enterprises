export type PressItem = {
  title: string;
  outlet: string;
  href: string;
  /** ISO date, only when verified from the article or its URL. */
  date?: string;
  brand: string;
};

/**
 * Coverage of the group's brands, sourced from links published on caldentalusa.com/partnerships.
 * The archived Jones & Sons press releases could not be recovered (see AUDIT.md);
 * add them here and they appear in the News & Press section, newest first.
 */
export const press: PressItem[] = [
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

export type Initiative = { name: string; partner?: string; text: string; href?: string };

/** Verified from caldentalusa.com/partnerships and the coverage it links to. */
export const initiatives: Initiative[] = [
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
