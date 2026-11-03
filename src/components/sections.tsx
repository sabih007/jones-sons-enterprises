import Link from "next/link";
import { site, values } from "@/content/site";
import { brandsInSector, sectors } from "@/content/brands";
import { initiatives, press } from "@/content/press";
import { formatDate } from "@/lib/format";
import { ExternalLink, SectionHeading } from "./ui";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-ivory py-28 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="about-title"
          kicker="About Jones & Sons"
          title="A family business that thinks in decades."
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div data-fx="mask" className="lg:col-span-5 lg:col-start-1">
            <figure className="relative overflow-hidden bg-ink p-8 text-ivory sm:p-12">
              <span
                aria-hidden
                data-fx="drift"
                data-fx-amount="20"
                className="display pointer-events-none absolute -bottom-16 -right-6 text-[16rem] italic leading-none text-accent/15"
              >
                &amp;
              </span>
              <p className="text-sm text-accent">Founded in {site.founded} by</p>
              <ul className="relative mt-8 space-y-8">
                {site.founders.map((f) => (
                  <li key={f.name} className="flex items-center gap-5">
                    <span
                      aria-hidden
                      className="display flex size-16 shrink-0 items-center justify-center rounded-full ring-1 ring-accent/50 text-xl text-accent"
                    >
                      {f.initials}
                    </span>
                    <span>
                      <span className="display block text-[1.9rem] leading-tight">{f.name}</span>
                      <span className="mt-1 block text-sm text-ivory/55">{f.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <figcaption className="relative mt-12 border-t border-ivory/15 pt-6 text-sm text-ivory/60">
                Headquartered in {site.location}
              </figcaption>
            </figure>
          </div>

          <div
            data-fx="group"
            className="space-y-7 text-lg leading-[1.75] text-ink/80 lg:col-span-6 lg:col-start-7"
          >
            <p className="display text-[1.85rem] leading-[1.3] text-ink">
              Jones &amp; Sons Enterprises is a family-owned American holding company, founded in {site.founded} by
              Terrill James Jones and Deanna Garcia.
            </p>
            <p>
              From Rancho Palos Verdes, the family owns and manages businesses across commercial real estate,
              healthcare and dental care, business management, investment holdings, sports and entertainment, and
              memorabilia.
            </p>
            <p>
              The idea behind the company is simple. Build businesses with integrity, invest in innovation that
              actually helps people, and choose partners for the long term. Every brand in the group carries the
              family name, so every brand is held to the family standard.
            </p>
            <p>
              That standard reaches past the balance sheet. The companies we run serve Southern California
              neighborhoods, and we measure our success by the difference they make there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="bg-paper py-28 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="industries-title"
          kicker="Industries & expertise"
          title="Six industries, one family standard."
          intro="Each industry below is run through one or more of our operating brands. Select a brand to see what it does."
        />

        <ul data-fx="group" className="mt-20 border-t border-ink/12">
          {sectors.map((s) => {
            const inSector = brandsInSector(s.id);
            return (
              <li
                key={s.id}
                data-fx-item
                className="group grid gap-4 border-b border-ink/12 py-8 transition-colors duration-500 hover:bg-ivory sm:py-10 lg:grid-cols-12 lg:gap-12 lg:px-4"
              >
                <h3 className="display text-[clamp(2rem,3.6vw,3rem)] leading-none transition-transform duration-700 ease-[var(--ease-house)] group-hover:translate-x-2 lg:col-span-4">
                  {s.name}
                </h3>
                <p className="max-w-[42ch] text-[1.05rem] leading-relaxed text-slate lg:col-span-4 lg:pt-2">
                  {s.text}
                </p>
                <div className="lg:col-span-4 lg:pt-2">
                  <p className="sr-only">Brands in {s.name}:</p>
                  <ul className="flex flex-wrap gap-2">
                    {inSector.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/brands/${b.slug}`}
                          className="inline-flex min-h-9 items-center rounded-full px-4 text-sm text-ink ring-1 ring-inset ring-ink/15 transition-colors duration-300 hover:bg-ink hover:text-ivory hover:ring-ink"
                        >
                          {b.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section id="mission" aria-labelledby="mission-title" className="bg-ivory py-28 lg:py-40">
      <div className="shell">
        <h2 id="mission-title" className="flex items-center gap-3 text-sm font-medium text-accent-deep">
          <span aria-hidden data-fx="rule" className="h-px w-8 bg-current" />
          Our mission
        </h2>
        <blockquote className="mt-10">
          <p
            data-fx="words"
            className="display max-w-[18ch] text-balance text-[clamp(2.8rem,7.4vw,7rem)] italic leading-[1.02]"
          >
            Our mission is to leave an emotional impact on everyone we encounter.
          </p>
        </blockquote>

        <div className="mt-24 grid gap-12 lg:grid-cols-12">
          <p className="max-w-[34ch] text-lg leading-relaxed text-slate lg:col-span-4">
            Five values guide how every company in the group treats its patients, clients, partners, and
            neighbors.
          </p>
          <dl data-fx="group" className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.name} className="border-t border-ink/15 pt-6">
                <dt className="display text-[1.9rem] leading-none">{v.name}</dt>
                <dd className="mt-4 text-[0.98rem] leading-relaxed text-slate">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="bg-paper py-28 lg:py-40">
      <div className="shell">
        <SectionHeading
          id="community-title"
          kicker="Community impact"
          title="Good business should be felt on the block."
          intro="Through youth sports camps, charity drives, and partnerships led by our brands, the group puts its resources into Southern California families. Recent initiatives through CAL Dental USA include:"
        />

        <ul
          data-fx="group"
          className="mt-20 grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {initiatives.map((i) => (
            <li key={i.name} data-fx-item className="flex flex-col bg-paper p-8 lg:p-10">
              {i.partner ? <p className="text-sm text-accent-deep">{i.partner}</p> : null}
              <h3 className="display mt-3 text-[1.75rem] leading-[1.1]">{i.name}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-slate">{i.text}</p>
              {i.href ? (
                <ExternalLink href={i.href} className="mt-8 self-start text-sm font-semibold text-ink">
                  Read the coverage
                </ExternalLink>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Press() {
  const sorted = [...press].sort((a, b) => (b.date ?? "0").localeCompare(a.date ?? "0"));
  const [lead, ...rest] = sorted;
  return (
    <section id="press" aria-labelledby="press-title" className="bg-ivory py-28 lg:py-40">
      <div className="shell">
        <SectionHeading id="press-title" kicker="News & press" title="In the news across the portfolio." />

        {lead ? (
          <article data-fx="mask" className="group relative mt-20 grid gap-8 bg-ink p-8 text-ivory sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-16">
            <div className="lg:col-span-3">
              <p className="text-sm text-accent">Latest</p>
              {lead.date ? (
                <time dateTime={lead.date} className="mt-2 block text-sm text-ivory/60">
                  {formatDate(lead.date)}
                </time>
              ) : null}
            </div>
            <div className="lg:col-span-9">
              <h3 className="display text-balance text-[clamp(2rem,4vw,3.4rem)] leading-[1.08]">
                <a href={lead.href} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
                  {lead.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              <p className="mt-6 text-ivory/60">
                {lead.outlet}, featuring {lead.brand}
              </p>
            </div>
          </article>
        ) : null}

        <ul data-fx="group" className="mt-4 divide-y divide-ink/12 border-b border-ink/12">
          {rest.map((p) => (
            <li key={p.href} data-fx-item>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 py-7 transition-colors sm:grid-cols-12 sm:gap-8"
              >
                <span className="text-sm text-slate sm:col-span-3">
                  {p.date ? <time dateTime={p.date}>{formatDate(p.date)}</time> : p.outlet}
                </span>
                <span className="display text-[1.5rem] leading-snug transition-colors group-hover:text-accent-deep sm:col-span-7">
                  {p.title}
                </span>
                <span className="text-sm text-slate sm:col-span-2 sm:text-right">
                  {p.date ? p.outlet : p.brand}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
