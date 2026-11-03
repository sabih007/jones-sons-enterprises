import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { brands, getBrand, sectorName } from "@/content/brands";
import { press } from "@/content/press";
import { formatDate } from "@/lib/format";
import { BrandMark } from "@/components/Brands";
import { ButtonLink, ExternalLink } from "@/components/ui";
import { ScrollFX } from "@/components/ScrollFX";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const brand = getBrand((await params).slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: brand.summary,
    alternates: { canonical: `/brands/${brand.slug}` },
    openGraph: { title: brand.name, description: brand.summary, url: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: Params) {
  const brand = getBrand((await params).slug);
  if (!brand) notFound();

  const idx = brands.findIndex((b) => b.slug === brand.slug);
  const next = brands[(idx + 1) % brands.length];
  const coverage = press.filter((p) => p.brand === brand.name);

  return (
    <article>
      <header className="grain bg-ink pb-20 pt-36 text-ivory lg:pb-28 lg:pt-44">
        <div data-fx="group" className="shell">
          <Link href="/#brands" data-fx-item className="link-underline inline-flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
            <ArrowLeft aria-hidden className="size-4" /> All brands
          </Link>
          <h1 data-fx-item className="display mt-10 max-w-[16ch] text-balance text-[clamp(3rem,8vw,7rem)]">{brand.name}</h1>
          <p data-fx-item className="mt-8 max-w-[48ch] text-xl leading-relaxed text-ivory/70">{brand.summary}</p>
          {brand.sectors.length ? (
            <p data-fx-item className="mt-6 text-sm text-accent">{brand.sectors.map(sectorName).join(", ")}</p>
          ) : null}
        </div>
      </header>

      <section aria-label={`About ${brand.name}`} className="bg-ivory py-24 lg:py-32">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div data-fx="mask" className="flex aspect-[4/3] items-center justify-center bg-paper ring-1 ring-ink/8">
              <BrandMark brand={brand} />
            </div>
            {brand.website ? (
              <div className="mt-8">
                <ButtonLink href={brand.website.href} external variant="ghost-dark">
                  {brand.website.label}
                </ButtonLink>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div data-fx="group" className="space-y-6 text-lg leading-[1.75] text-ink/80">
              {brand.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {brand.facts?.length ? (
              <dl data-fx="group" className="mt-12 grid gap-8 border-t border-ink/12 pt-8 sm:grid-cols-2">
                {brand.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-slate">{f.label}</dt>
                    <dd className="display mt-2 text-2xl leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {coverage.length ? (
              <div className="mt-14">
                <h2 className="text-sm text-accent-deep">In the news</h2>
                <ul data-fx="group" className="mt-4 divide-y divide-ink/12 border-y border-ink/12">
                  {coverage.map((c) => (
                    <li key={c.href} data-fx-item className="py-5">
                      <ExternalLink href={c.href} className="display text-xl leading-snug">
                        {c.title}
                      </ExternalLink>
                      <p className="mt-1 text-sm text-slate">
                        {c.outlet}
                        {c.date ? `, ${formatDate(c.date)}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <nav aria-label="Next brand" className="bg-ink text-ivory">
        <Link href={`/brands/${next.slug}`} className="shell group flex flex-col gap-3 py-16 lg:py-24">
          <span className="text-sm text-accent">Next brand</span>
          <span className="display text-[clamp(2.4rem,6vw,5rem)] transition-transform duration-700 ease-[var(--ease-house)] group-hover:translate-x-3">
            {next.name}
          </span>
        </Link>
      </nav>
      <ScrollFX />
    </article>
  );
}
