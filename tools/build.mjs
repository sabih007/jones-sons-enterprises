/**
 * Static site generator for Jones & Sons Enterprises.
 *
 *   node tools/build.mjs
 *
 * Reads tools/content.mjs and writes plain HTML into static/. The output is
 * committed, so deploying needs no build — this script only exists so that
 * shared chrome (header, footer, meta) lives in one place while you edit copy.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  brands,
  brandsInSector,
  contactTopics,
  formatDate,
  initiatives,
  nav,
  press,
  sectorName,
  sectors,
  site,
  social,
  values,
} from "./content.mjs";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "static");

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** HTML-escape interpolated content. Everything from content.mjs goes through this. */
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const map = (list, fn) => list.map(fn).join("\n");
const when = (cond, markup) => (cond ? markup : "");

/* Inline lucide-style icons, so there is no icon dependency to load. */
const svg = (paths, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;

const icons = {
  arrowUpRight: (cls) => svg(`<path d="M7 7h10v10"/><path d="M7 17 17 7"/>`, cls),
  arrowRight: (cls) => svg(`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`, cls),
  arrowLeft: (cls) => svg(`<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>`, cls),
  arrowUp: (cls) => svg(`<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>`, cls),
  menu: (cls) => svg(`<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>`, cls),
  close: (cls) => svg(`<path d="M18 6 6 18"/><path d="M6 6l12 12"/>`, cls),
  check: (cls) => svg(`<path d="M20 6 9 17l-5-5"/>`, cls),
  spinner: (cls) => svg(`<path d="M21 12a9 9 0 1 1-6.219-8.56"/>`, cls),
};

const newTab = `<span class="sr-only"> (opens in a new tab)</span>`;

const extLink = (href, label, cls = "") =>
  `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer" class="link-underline ext-link${cls ? " " + cls : ""}">${label}${icons.arrowUpRight("icon icon--sm")}${newTab}</a>`;

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                              */
/* -------------------------------------------------------------------------- */

const wordmark = (tone) => `
          <span class="wordmark${tone === "ivory" ? " wordmark--ivory" : ""}">
            <img class="wordmark__badge" src="/assets/img/logo-badge.png" alt="" aria-hidden="true" width="512" height="512" />
            <span class="wordmark__text">
              <span class="wordmark__name display">Jones <span class="wordmark__amp">&amp;</span> Sons</span>
              <span class="wordmark__sub">Enterprises</span>
            </span>
          </span>`;

const header = () => `
    <header class="site-header">
      <div class="shell header-inner">
        <a href="/" class="header-home" aria-label="${esc(site.name)}, home">${wordmark("ivory")}
        </a>

        <nav class="nav-primary" aria-label="Primary">
          <ul class="nav-list">
${map(nav.slice(0, -1), (item) => `            <li><a class="nav-link" href="/${item.href}">${esc(item.label)}</a></li>`)}
            <li><a class="nav-cta" href="/#contact">Contact</a></li>
          </ul>
        </nav>

        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          ${icons.menu("icon icon--md menu-toggle__open")}
          ${icons.close("icon icon--md menu-toggle__close")}
        </button>
      </div>

      <div class="mobile-menu grain" id="mobile-menu">
        <nav class="shell mobile-menu__nav" aria-label="Mobile">
          <ul class="mobile-menu__list">
${map(nav, (item) => `            <li><a class="mobile-menu__link" href="/${item.href}">${esc(item.label)}</a></li>`)}
          </ul>
          <p class="mobile-menu__note">Family-owned since ${site.founded}. ${esc(site.location)}.</p>
        </nav>
      </div>
    </header>`;

const footerLinks = social.length
  ? social.map((s) => ({ label: s.label, href: s.href }))
  : [
      { label: "CAL Dental USA", href: "https://caldentalusa.com/" },
      { label: "All In Capital", href: "https://allincapitaldental.com/" },
    ];

const footer = () => `
    <footer class="site-footer">
      <div class="shell site-footer__inner">
        <div class="footer-grid" data-fx="group">
          <div class="footer-grid__brand">
            ${wordmark("ivory")}
            <p class="footer-blurb">A family-owned holding company in ${esc(site.location)}, est. ${site.founded}.</p>
          </div>

          <nav class="footer-grid__nav" aria-label="Footer">
            <p class="footer-heading">Company</p>
            <ul class="footer-list">
${map(nav, (n) => `              <li><a class="link-underline" href="/${n.href}">${esc(n.label)}</a></li>`)}
            </ul>
          </nav>

          <nav class="footer-grid__portfolio" aria-label="Brands">
            <p class="footer-heading">Portfolio</p>
            <ul class="footer-list">
${map(brands, (b) => `              <li><a class="link-underline" href="/brands/${b.slug}/">${esc(b.name)}</a></li>`)}
            </ul>
          </nav>

          <div class="footer-grid__links">
            <p class="footer-heading">${social.length ? "Follow" : "Brand websites"}</p>
            <ul class="footer-list">
${map(footerLinks, (l) => `              <li>${extLink(l.href, esc(l.label))}</li>`)}
            </ul>
          </div>
        </div>

        <div class="footer-base">
          <p class="footer-copy">&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(site.legalName)}. All rights reserved.</p>
          <button type="button" class="back-to-top">
            Back to top
            <span class="back-to-top__circle">${icons.arrowUp()}</span>
          </button>
        </div>
      </div>
    </footer>`;

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: site.url,
  foundingDate: String(site.founded),
  founder: site.founders.map((f) => ({ "@type": "Person", name: f.name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rancho Palos Verdes",
    addressRegion: "CA",
    addressCountry: "US",
  },
  subOrganization: brands
    .filter((b) => b.slug !== "jones-and-sons-enterprises")
    .map((b) => ({ "@type": "Organization", name: b.name, ...(b.website ? { url: b.website.href } : {}) })),
});

/**
 * One page shell for every document: head, skip link, header, main, footer,
 * then GSAP from the CDN and the site script.
 */
const page = ({ title, description, canonical, body, ogTitle, structuredData, noindex }) => `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="theme-color" content="#0c0c0e" />
<meta name="application-name" content="${esc(site.name)}" />
${noindex ? `<meta name="robots" content="noindex, follow" />` : `<meta name="robots" content="index, follow" />`}
<link rel="canonical" href="${esc(site.url + canonical)}" />
<link rel="icon" href="/assets/img/icon.png" sizes="64x64" type="image/png" />
<link rel="apple-touch-icon" href="/assets/img/logo-badge.png" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="${esc(site.name)}" />
<meta property="og:title" content="${esc(ogTitle || title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${esc(site.url + canonical)}" />
<meta property="og:locale" content="en_US" />
<meta property="og:image" content="${esc(site.url)}/assets/img/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Jones &amp; Sons Enterprises, a family-owned holding company in Rancho Palos Verdes, California" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(site.name)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${esc(site.url)}/assets/img/og.png" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&amp;display=swap" />
<link rel="stylesheet" href="/assets/css/site.css" />
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>
${header()}
    <main id="main" tabindex="-1">
${body}
    </main>
${footer()}
    <div class="fx-progress" aria-hidden="true"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" defer></script>
<script src="/assets/js/site.js" defer></script>
<script type="application/ld+json">${structuredData || jsonLd}</script>
</body>
</html>
`;

/** The shared kicker + title + intro block, matching the old SectionHeading. */
const sectionHeading = ({ id, kicker, title, intro }) => `
        <div class="section-head" data-fx="group">
          <p class="section-head__kicker" data-fx-item>
            <span class="eyebrow__rule" data-fx="rule" aria-hidden="true"></span>${esc(kicker)}
          </p>
          <div class="section-head__body">
            <h2 class="section-title display" id="${id}" data-fx-item>${title}</h2>
${when(intro, `            <p class="section-intro" data-fx-item>${intro}</p>`)}
          </div>
        </div>`;

/** A brand's logo, or its monogram when it has none. */
const brandMark = (brand, size = "lg") =>
  brand.logo
    ? `<img class="brand-mark${size === "sm" ? " brand-mark--sm" : ""}" src="/assets/img/${brand.logo.src}" width="${brand.logo.width}" height="${brand.logo.height}" alt="${esc(brand.name)} logo" loading="lazy" />`
    : `<span class="brand-mono" role="img" aria-label="${esc(brand.name)} monogram">${esc(brand.monogram)}</span>`;

/* -------------------------------------------------------------------------- */
/* Home page sections                                                         */
/* -------------------------------------------------------------------------- */

const heroSection = () => `
      <section class="hero grain" aria-labelledby="hero-title">
        <!-- The shaft of light that falls across the house mark. -->
        <div class="hero__light" aria-hidden="true"></div>
        <!-- Crimson bloom behind the glyph, taken from the J. -->
        <div class="hero__glow" aria-hidden="true"></div>
        <!-- Monogram: the house glyph, revealed through a rising mask. -->
        <div class="hero__amp-wrap" aria-hidden="true"><span class="hero__amp">&amp;</span></div>

        <svg class="hero__horizon" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path data-horizon
            d="M0 150 C 120 148, 210 132, 320 118 S 520 70, 640 76 S 820 120, 930 104 S 1120 40, 1250 52 S 1400 96, 1440 100"
            stroke="currentColor" stroke-width="1" stroke-dasharray="2400" stroke-dashoffset="0"
            vector-effect="non-scaling-stroke" />
        </svg>

        <!-- Vignette, so the corners fall away and the copy sits forward. -->
        <div class="hero__vignette" aria-hidden="true"></div>

        <noscript><style>.hero__ready{visibility:visible!important}</style></noscript>

        <div class="hero__ready">
          <div class="shell hero__copy">
            <p class="eyebrow" data-fade>
              <span class="eyebrow__rule" aria-hidden="true"></span>
              A family holding company, est. ${site.founded}
            </p>

            <h1 class="hero__title display" id="hero-title">
              <span class="hero__line"><span>Built by family.</span></span>
              <span class="hero__line"><span>Held for</span></span>
              <span class="hero__line hero__line--italic"><span>generations<span class="hero__dot">.</span></span></span>
            </h1>

            <p class="hero__lead" data-fade>
              Jones &amp; Sons Enterprises owns and guides a portfolio of businesses in healthcare, commercial real
              estate, investments, and sports and entertainment, from our home in Rancho Palos Verdes, California.
            </p>

            <div class="hero__actions">
              <div class="hero__buttons" data-fade>
                <a class="btn btn--accent" href="#brands">Explore our brands</a>
                <a class="btn btn--ghost-light" href="#about">Discover our story</a>
              </div>
              <div class="hero__scroll" data-fade aria-hidden="true">
                Scroll
                <span class="hero__scroll-track"><span class="hero__scroll-dot"></span></span>
              </div>
            </div>
          </div>

          <div class="hero__stats" data-fade>
            <dl class="shell">
              <div class="hero__stat">
                <dt>Founded</dt>
                <dd>${site.founded}</dd>
              </div>
              <div class="hero__stat">
                <dt>Headquarters</dt>
                <dd>Rancho Palos Verdes<span class="hero__stat-long">, California</span></dd>
              </div>
              <div class="hero__stat">
                <dt>Portfolio</dt>
                <dd>${brands.length} brands, ${sectors.length} industries</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>`;

const aboutSection = () => `
      <section class="section section--ivory" id="about" aria-labelledby="about-title">
        <div class="shell">
${sectionHeading({
  id: "about-title",
  kicker: "About Jones & Sons",
  title: "A family business that thinks in decades.",
})}

          <div class="about-grid section-body">
            <div class="about-grid__figure" data-fx="mask">
              <figure class="founder-card">
                <span class="founder-card__amp" aria-hidden="true" data-fx="drift" data-fx-amount="20">&amp;</span>
                <p class="founder-card__label">Founded in ${site.founded} by</p>
                <ul class="founder-list">
${map(
  site.founders,
  (f) => `                  <li class="founder">
                    <span class="founder__initials" aria-hidden="true">${esc(f.initials)}</span>
                    <span>
                      <span class="founder__name">${esc(f.name)}</span>
                      <span class="founder__role">${esc(f.role)}</span>
                    </span>
                  </li>`,
)}
                </ul>
                <figcaption class="founder-card__caption">Headquartered in ${esc(site.location)}</figcaption>
              </figure>
            </div>

            <div class="about-grid__prose prose" data-fx="group">
              <p class="prose__lead">
                Jones &amp; Sons Enterprises is a family-owned American holding company, founded in ${site.founded} by
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
      </section>`;

const brandsSection = () => `
      <section class="section section--ink grain" id="brands" aria-labelledby="brands-title">
        <div class="shell">
${sectionHeading({
  id: "brands-title",
  kicker: "Our brands",
  title: "The Jones &amp; Sons portfolio.",
  intro: "Seven brands under one family name, from dental care to practice brokerage to sports memorabilia.",
})}

          <div class="brands-grid section-body">
            <ul class="brand-list brands-grid__list" data-fx="group">
${map(
  brands,
  (b) => `              <li data-fx-item>
                <a class="brand-row" data-brand="${b.slug}" href="/brands/${b.slug}/">
                  <span class="brand-row__text">
                    <span class="brand-row__name">${esc(b.name)}</span>
                    <span class="brand-row__summary">${esc(b.summary)}</span>
                  </span>
                  ${icons.arrowRight("brand-row__arrow icon")}
                </a>
              </li>`,
)}
            </ul>

            <div class="brands-grid__preview">
              <div class="brand-preview__sticky" aria-live="polite">
${map(
  brands,
  (b, i) => `                <div class="brand-preview__panel" data-brand="${b.slug}"${i === 1 ? "" : " hidden"}>
                  <div class="brand-preview__plate">${brandMark(b)}</div>
                  <p class="brand-preview__summary">${esc(b.summary)}</p>
${when(b.sectors.length, `                  <p class="brand-preview__sectors">${esc(b.sectors.map(sectorName).join(", "))}</p>`)}
                </div>`,
)}
              </div>
            </div>
          </div>
        </div>
      </section>`;

const industriesSection = () => `
      <section class="section section--paper" id="industries" aria-labelledby="industries-title">
        <div class="shell">
${sectionHeading({
  id: "industries-title",
  kicker: "Industries & expertise",
  title: "Six industries, one family standard.",
  intro: "Each industry below is run through one or more of our operating brands. Select a brand to see what it does.",
})}

          <ul class="industry-list section-body" data-fx="group">
${map(sectors, (s) => {
  const inSector = brandsInSector(s.id);
  return `            <li class="industry-row" data-fx-item>
              <h3 class="industry-row__name">${esc(s.name)}</h3>
              <p class="industry-row__text">${esc(s.text)}</p>
              <div class="industry-row__brands">
                <p class="sr-only">Brands in ${esc(s.name)}:</p>
                <ul class="chip-list">
${map(inSector, (b) => `                  <li><a class="chip" href="/brands/${b.slug}/">${esc(b.name)}</a></li>`)}
                </ul>
              </div>
            </li>`;
})}
          </ul>
        </div>
      </section>`;

const missionSection = () => `
      <section class="section section--ivory" id="mission" aria-labelledby="mission-title">
        <div class="shell">
          <h2 class="mission-heading" id="mission-title">
            <span class="eyebrow__rule" data-fx="rule" aria-hidden="true"></span>Our mission
          </h2>
          <blockquote class="mission-quote">
            <p class="display" data-fx="words">${esc(site.mission)}</p>
          </blockquote>

          <div class="values">
            <p class="values__intro">
              Five values guide how every company in the group treats its patients, clients, partners, and neighbors.
            </p>
            <dl class="values__grid" data-fx="group">
${map(
  values,
  (v) => `              <div class="value">
                <dt>${esc(v.name)}</dt>
                <dd>${esc(v.text)}</dd>
              </div>`,
)}
            </dl>
          </div>
        </div>
      </section>`;

const communitySection = () => `
      <section class="section section--paper" id="community" aria-labelledby="community-title">
        <div class="shell">
${sectionHeading({
  id: "community-title",
  kicker: "Community impact",
  title: "Good business should be felt on the block.",
  intro:
    "Through youth sports camps, charity drives, and partnerships led by our brands, the group puts its resources into Southern California families. Recent initiatives through CAL Dental USA include:",
})}

          <ul class="initiative-grid section-body" data-fx="group">
${map(
  initiatives,
  (i) => `            <li class="initiative" data-fx-item>
${when(i.partner, `              <p class="initiative__partner">${esc(i.partner)}</p>`)}
              <h3 class="initiative__name">${esc(i.name)}</h3>
              <p class="initiative__text">${esc(i.text)}</p>
${when(i.href, `              ${extLink(i.href, "Read the coverage", "initiative__link")}`)}
            </li>`,
)}
          </ul>
        </div>
      </section>`;

const pressSection = () => {
  const sorted = [...press].sort((a, b) => (b.date ?? "0").localeCompare(a.date ?? "0"));
  const [lead, ...rest] = sorted;
  return `
      <section class="section section--ivory" id="press" aria-labelledby="press-title">
        <div class="shell">
${sectionHeading({ id: "press-title", kicker: "News & press", title: "In the news across the portfolio." })}

${when(
  lead,
  `          <article class="press-lead section-body" data-fx="mask">
            <div class="press-lead__meta">
              <p class="press-lead__label">Latest</p>
${when(lead.date, `              <time class="press-lead__date" datetime="${esc(lead.date)}">${esc(formatDate(lead.date))}</time>`)}
            </div>
            <div class="press-lead__body">
              <h3 class="press-lead__title">
                <a href="${esc(lead.href)}" target="_blank" rel="noopener noreferrer">${esc(lead.title)}${newTab}</a>
              </h3>
              <p class="press-lead__outlet">${esc(lead.outlet)}, featuring ${esc(lead.brand)}</p>
            </div>
          </article>`,
)}

          <ul class="press-list" data-fx="group">
${map(
  rest,
  (p) => `            <li data-fx-item>
              <a class="press-row" href="${esc(p.href)}" target="_blank" rel="noopener noreferrer">
                <span class="press-row__date">${p.date ? `<time datetime="${esc(p.date)}">${esc(formatDate(p.date))}</time>` : esc(p.outlet)}</span>
                <span class="press-row__title">${esc(p.title)}</span>
                <span class="press-row__outlet">${p.date ? esc(p.outlet) : esc(p.brand)}${newTab}</span>
              </a>
            </li>`,
)}
          </ul>
        </div>
      </section>`;
};

const field = ({ label, name, type = "text", optional, multiline, autocomplete, wide }) => {
  const id = `contact-${name}`;
  const control = multiline
    ? `<textarea class="field__control" id="${id}" name="${name}" rows="5" aria-required="true"></textarea>`
    : `<input class="field__control" id="${id}" name="${name}" type="${type}"${autocomplete ? ` autocomplete="${autocomplete}"` : ""}${optional ? "" : ' aria-required="true"'} />`;
  return `                  <div class="field${wide ? " field--wide" : ""}">
                    <label class="field__label" for="${id}">${esc(label)}${when(optional, `<span class="field__optional"> (optional)</span>`)}</label>
                    ${control}
                    <p class="field__error" id="${id}-error" hidden></p>
                  </div>`;
};

const contactSection = () => `
      <section class="section section--ink grain" id="contact" aria-labelledby="contact-title">
        <div class="shell">
${sectionHeading({ id: "contact-title", kicker: "Contact", title: "Start a conversation with the family." })}

          <div class="contact-grid section-body">
            <div class="contact-grid__aside contact-aside">
              <p class="contact-aside__lead">
                For partnerships, media requests, or questions about one of our brands, send a note and the right
                person will follow up.
              </p>
              <div>
                <p class="contact-aside__label">Headquarters</p>
                <p class="contact-aside__value display">${esc(site.location)}</p>
              </div>
${when(
  social.length,
  `              <div>
                <p class="contact-aside__label">Follow us</p>
                <ul class="contact-aside__social">
${map(social, (s) => `                  <li>${extLink(s.href, esc(s.label))}</li>`)}
                </ul>
              </div>`,
)}
            </div>

            <div class="contact-grid__form">
              <form class="contact-form" id="contact-form" novalidate>
${field({ label: "Full name", name: "name", autocomplete: "name" })}
${field({ label: "Email", name: "email", type: "email", autocomplete: "email" })}
${field({ label: "Company", name: "company", optional: true, autocomplete: "organization" })}
                  <div class="field">
                    <label class="field__label" for="contact-topic">Topic</label>
                    <select class="field__control" id="contact-topic" name="topic" aria-required="true" data-empty="true">
                      <option value="" disabled selected>Choose a topic</option>
${map(contactTopics, (t) => `                      <option value="${esc(t)}">${esc(t)}</option>`)}
                    </select>
                    <p class="field__error" id="contact-topic-error" hidden></p>
                  </div>
${field({ label: "Message", name: "message", multiline: true, wide: true })}

                  <div class="honeypot" aria-hidden="true">
                    <label>Website <input id="contact-website" name="website" tabindex="-1" autocomplete="off" /></label>
                  </div>

                  <div class="contact-submit-row">
                    <p class="contact-server-msg" id="contact-server" role="alert" hidden></p>
                    <button type="submit" class="contact-submit" id="contact-submit">
                      <span class="contact-submit__idle">Send message</span>
                      <span class="contact-submit__sending">${icons.spinner("icon spinner")} Sending message</span>
                    </button>
                  </div>
              </form>

              <div class="contact-success" id="contact-success" role="status" hidden>
                <span class="contact-success__check">${icons.check("icon icon--md")}</span>
                <h3 class="contact-success__title display">Message sent.</h3>
                <p class="contact-success__text">
                  Thank you for writing. A member of the Jones &amp; Sons team will reply to the email you provided.
                </p>
                <button type="button" class="contact-success__again link-underline" id="contact-send-another">
                  Send another message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>`;

/* -------------------------------------------------------------------------- */
/* Pages                                                                      */
/* -------------------------------------------------------------------------- */

const homePage = () =>
  page({
    title: `${site.name} | Family-owned holding company`,
    description: site.description,
    canonical: "/",
    body: [
      heroSection(),
      aboutSection(),
      brandsSection(),
      industriesSection(),
      missionSection(),
      communitySection(),
      pressSection(),
      contactSection(),
    ].join("\n"),
  });

const brandPage = (brand) => {
  const idx = brands.findIndex((b) => b.slug === brand.slug);
  const next = brands[(idx + 1) % brands.length];
  const coverage = press.filter((p) => p.brand === brand.name);

  const body = `
      <article>
        <header class="brand-hero grain">
          <div class="shell" data-fx="group">
            <a class="brand-hero__back link-underline" href="/#brands" data-fx-item>
              ${icons.arrowLeft()} All brands
            </a>
            <h1 class="brand-hero__title" data-fx-item>${esc(brand.name)}</h1>
            <p class="brand-hero__summary" data-fx-item>${esc(brand.summary)}</p>
${when(brand.sectors.length, `            <p class="brand-hero__sectors" data-fx-item>${esc(brand.sectors.map(sectorName).join(", "))}</p>`)}
          </div>
        </header>

        <section class="brand-detail" aria-label="About ${esc(brand.name)}">
          <div class="shell brand-detail__grid">
            <div class="brand-detail__aside">
              <div class="brand-detail__plate" data-fx="mask">${brandMark(brand)}</div>
${when(
  brand.website,
  `              <div class="brand-detail__cta">
                <a class="btn btn--ghost-dark" href="${esc(brand.website?.href)}" target="_blank" rel="noopener noreferrer">
                  ${esc(brand.website?.label)}${icons.arrowUpRight()}${newTab}
                </a>
              </div>`,
)}
            </div>

            <div class="brand-detail__main">
              <div class="brand-detail__prose" data-fx="group">
${map(brand.body, (p) => `                <p>${esc(p)}</p>`)}
              </div>

${when(
  brand.facts?.length,
  `              <dl class="fact-grid" data-fx="group">
${map(
  brand.facts ?? [],
  (f) => `                <div class="fact">
                  <dt>${esc(f.label)}</dt>
                  <dd>${esc(f.value)}</dd>
                </div>`,
)}
              </dl>`,
)}

${when(
  coverage.length,
  `              <div class="coverage">
                <h2 class="coverage__heading">In the news</h2>
                <ul class="coverage__list" data-fx="group">
${map(
  coverage,
  (c) => `                  <li data-fx-item>
                    ${extLink(c.href, esc(c.title), "coverage__title")}
                    <p class="coverage__meta">${esc(c.outlet)}${c.date ? `, ${esc(formatDate(c.date))}` : ""}</p>
                  </li>`,
)}
                </ul>
              </div>`,
)}
            </div>
          </div>
        </section>

        <nav class="next-brand" aria-label="Next brand">
          <a class="shell" href="/brands/${next.slug}/">
            <span class="next-brand__label">Next brand</span>
            <span class="next-brand__name">${esc(next.name)}</span>
          </a>
        </nav>
      </article>`;

  return page({
    title: `${brand.name} | ${site.name}`,
    ogTitle: brand.name,
    description: brand.summary,
    canonical: `/brands/${brand.slug}/`,
    body,
    structuredData: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand.name,
      description: brand.summary,
      ...(brand.website ? { url: brand.website.href } : {}),
      parentOrganization: { "@type": "Organization", name: site.legalName, url: site.url },
    }),
  });
};

const notFoundPage = () =>
  page({
    title: `Page not found | ${site.name}`,
    description: "The page you were looking for is not part of the Jones & Sons Enterprises site.",
    canonical: "/404.html",
    noindex: true,
    body: `
      <section class="error-page grain">
        <div class="shell">
          <p class="error-page__label">Page not found</p>
          <h1 class="error-page__title">This page isn&rsquo;t part of the family.</h1>
          <p class="error-page__text">The link may be old or mistyped. Head home or browse the portfolio.</p>
          <div class="error-page__actions">
            <a class="btn btn--accent" href="/">Go to the homepage</a>
            <a class="btn btn--ghost-light" href="/#brands">View our brands</a>
          </div>
        </div>
      </section>`,
  });

const sitemapXml = () => {
  const today = new Date().toISOString().slice(0, 10);
  const url = (loc, priority, freq) =>
    `  <url>\n    <loc>${site.url}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url("/", "1.0", "monthly")}
${brands.map((b) => url(`/brands/${b.slug}/`, "0.7", "yearly")).join("\n")}
</urlset>
`;
};

const robotsTxt = () => `User-agent: *
Allow: /

Host: ${site.url}
Sitemap: ${site.url}/sitemap.xml
`;

/* -------------------------------------------------------------------------- */
/* Write                                                                      */
/* -------------------------------------------------------------------------- */

async function emit(relPath, contents) {
  const target = join(OUT, relPath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
  console.log("  wrote static/" + relPath.replace(/\\/g, "/"));
}

console.log("Building static site...");
await emit("index.html", homePage());
for (const brand of brands) await emit(join("brands", brand.slug, "index.html"), brandPage(brand));
await emit("404.html", notFoundPage());
await emit("sitemap.xml", sitemapXml());
await emit("robots.txt", robotsTxt());
console.log(`Done. ${brands.length + 4} files.`);
