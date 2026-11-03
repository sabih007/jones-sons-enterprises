import Link from "next/link";
import { brands } from "@/content/brands";
import { nav, site, social } from "@/content/site";
import { BackToTop } from "./BackToTop";
import { ExternalLink, Wordmark } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-2 text-ivory">
      <div className="shell py-20 lg:py-24">
        <div data-fx="group" className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark tone="ivory" />
            <p className="mt-6 max-w-[34ch] leading-relaxed text-ivory/60">
              A family-owned holding company in {site.location}, est. {site.founded}.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="text-sm text-accent">Company</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline text-ivory/80 hover:text-ivory">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Brands" className="lg:col-span-3">
            <p className="text-sm text-accent">Portfolio</p>
            <ul className="mt-5 space-y-3">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="link-underline text-ivory/80 hover:text-ivory">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-sm text-accent">{social.length ? "Follow" : "Brand websites"}</p>
            <ul className="mt-5 space-y-3">
              {(social.length
                ? social.map((s) => ({ label: s.label, href: s.href }))
                : [
                    { label: "CAL Dental USA", href: "https://caldentalusa.com/" },
                    { label: "All In Capital", href: "https://allincapitaldental.com/" },
                  ]
              ).map((l) => (
                <li key={l.href}>
                  <ExternalLink href={l.href} className="text-ivory/80 hover:text-ivory">
                    {l.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-8 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ivory/45">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
