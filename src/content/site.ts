export const site = {
  name: "Jones & Sons Enterprises",
  legalName: "Jones & Sons Enterprises Inc",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jonesandsonsenterprises.com",
  founded: 2018,
  location: "Rancho Palos Verdes, California",
  description:
    "Jones & Sons Enterprises is a family-owned holding company in Rancho Palos Verdes, California, with interests in healthcare, commercial real estate, investments, business management, and sports and entertainment.",
  mission: "Our mission is to leave an emotional impact on everyone we encounter.",
  founders: [
    { name: "Terrill James Jones", role: "Co-founder", initials: "TJ" },
    { name: "Deanna Garcia", role: "Co-founder", initials: "DG" },
  ],
} as const;

/**
 * Primary header navigation. About, Industries, News and Contact are their own
 * routes; Brands and Mission remain sections of the homepage, so they stay anchors.
 * The desktop bar is tight at 1024px with this many items, so the nav list
 * narrows its gap below xl.
 */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our brands", href: "/#brands" },
  { label: "Industries", href: "/industries" },
  { label: "Our mission", href: "/#mission" },
  { label: "News & press", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

/** The header nav plus Community, which has a page but no room in the top bar. */
export const footerNav: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our brands", href: "/#brands" },
  { label: "Industries", href: "/industries" },
  { label: "Our mission", href: "/#mission" },
  { label: "Community", href: "/community" },
  { label: "News & press", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const values = [
  { name: "Family", text: "We build what we would be proud to hand to the next generation." },
  { name: "Integrity", text: "We say what we will do, then do it, in every deal and every office." },
  { name: "Trust", text: "Partners and patients return because they were treated fairly the first time." },
  { name: "Community", text: "Our businesses live in Southern California neighborhoods, so we invest in them." },
  { name: "Service", text: "Every brand in the group exists to make someone's day easier." },
] as const;

/**
 * Verified social profiles only. The archived site's social links could not be
 * recovered (see AUDIT.md). Add entries here and they render in the footer and contact section.
 */
export const social: { label: "Instagram" | "Facebook" | "LinkedIn" | "YouTube" | "X"; href: string }[] = [];
