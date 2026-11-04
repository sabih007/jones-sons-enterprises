# Jones & Sons Enterprises

Corporate website for Jones & Sons Enterprises, a family-owned holding company in Rancho Palos Verdes, California.

There are two builds of the same site in this repo:

| | Stack | Deploy |
| --- | --- | --- |
| **`static/`** — the one to ship | Plain HTML, CSS, JS + GSAP from a CDN. No build step. | Point the host at `static/`. See [`static/README.md`](static/README.md). |
| `src/` | Next.js 15, TypeScript, Tailwind v4, Motion | `npm run build` |

`static/` is a complete, hand-written port of the Next.js app — same copy, same layout,
same motion, same nine pages — made so the site deploys as static files with nothing to
build. Its copy lives in `tools/content.mjs`; `node tools/build.mjs` regenerates the HTML.

The rest of this file documents the original Next.js app.

---

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Motion, and Lucide icons.
Type is Afacad (via `next/font`) throughout; the palette is sampled from the house mark in `public/logo.jpg`.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel (framework preset: Next.js, no overrides needed).
2. Add environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL`: the production domain.
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`: enable contact form delivery. The sender domain must be verified in Resend.
3. Point the domain at Vercel.

## Where to edit content

All copy lives in `src/content/`, so most updates need no component changes.

| File | Contents |
| --- | --- |
| `site.ts` | Company facts, navigation, values, social profiles |
| `brands.ts` | The seven brands, sectors, logos, links, brand-page copy |
| `press.ts` | News & press items and community initiatives |

- **Add a social profile:** add `{ label: "Instagram", href: "..." }` to `social` in `site.ts`. It appears in the footer and contact section automatically.
- **Add a press release:** add an entry to `press` with an ISO `date`. Items sort newest first.
- **Add a brand logo:** place the file in `public/brands/` and set `logo` on the brand with its pixel width and height. Brands without a logo show a typographic monogram.
- **Change the house mark:** `public/logo.jpg` is the full lockup as supplied; `public/logo-badge.png` is the JS monogram cropped out of it, used in the header and footer, and `src/app/icon.png` is the favicon cut from the same crop.

## Structure

```
src/
  app/
    page.tsx                 Homepage
    brands/[slug]/page.tsx   Brand detail pages (statically generated)
    api/contact/route.ts     Contact endpoint (server-side validation, Resend delivery)
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
    not-found.tsx error.tsx loading.tsx
  components/                Header, Hero, Brands, Contact, Footer, ScrollFX, sections, ui
  content/                   Data files (see above)
  lib/                       Validation, formatting, helpers
public/                      Brand logos, house mark and monogram badge
```

## Notes

- **Motion:** GSAP drives the hero entrance and every scroll effect; Motion handles the menu, brand preview and form states. Everything respects `prefers-reduced-motion`.
- **Scroll effects:** `ScrollFX` is the single GSAP + ScrollTrigger engine. Sections stay server components and opt in with data attributes — `data-fx="group"` (staggered children, marked with `data-fx-item`), `"rise"`, `"mask"`, `"words"`, `"rule"`, and `"drift"` (parallax, amount from `data-fx-amount`). It is mounted at the end of each page rather than in the layout, so its effect runs only after the page subtree has hydrated.
- **Colours:** the theme tokens in `globals.css` come from the logo — `--color-ink` (near-black ground), `--color-accent` / `--color-accent-deep` (the crimson J), `--color-ivory` (the wordmark white). Form errors use amber so they stay distinct from the red accent.
- **Contact form:** validates on the client and again on the server, and includes a honeypot field. It never reports success unless delivery actually succeeded.
- **Content provenance:** see `AUDIT.md` for what was verified and what still needs the client.
