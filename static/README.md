# Jones & Sons Enterprises — static site

The whole site as plain HTML, CSS, and JavaScript. No framework, no server, no build
step required to deploy. Animation is GSAP + ScrollTrigger from a CDN.

This folder is the deployable artefact. Everything in it is committed, so a host only
has to serve these files.

```
static/
  index.html                  home page (hero, about, brands, industries,
                              mission, community, press, contact)
  brands/<slug>/index.html    one page per brand (7)
  404.html                    not-found page
  robots.txt, sitemap.xml
  vercel.json                 clean URLs + asset caching
  assets/css/site.css         the entire stylesheet
  assets/js/site.js           the entire behaviour layer
  assets/img/                 logo, badge, favicon, OG image, brand logos
```

## Deploy

### Vercel

The repo root still contains the old Next.js app, so point Vercel at this folder:

1. Import the repo in Vercel.
2. **Settings → Build & Deployment**
   - Framework Preset: **Other**
   - Root Directory: **`static`**
   - Build Command: leave empty
   - Output Directory: leave empty
3. Deploy. There is nothing to build, so it publishes in seconds.

Alternatively, from this folder: `npx vercel deploy --prod`.

If you would rather the site live at the repo root, move the contents of `static/`
up one level and delete the Next.js app — the files have no dependency on their
location, as every internal link is root-relative (`/assets/…`, `/brands/…`).

### Anywhere else

Netlify (publish directory `static`), Cloudflare Pages, GitHub Pages, S3, or any
shared host: upload the folder. The only requirement is that the server serves
`index.html` for a directory request, which every static host does.

## Preview locally

Internal links are root-relative, so open it through a server rather than
double-clicking the file:

```bash
npx serve static          # or: python -m http.server 8000 -d static
```

## Editing content

Copy lives in `../tools/content.mjs` — one file holding the company facts,
navigation, brands, sectors, press items, and community initiatives. After editing:

```bash
node tools/build.mjs      # run from the repo root; rewrites the HTML in static/
```

Node is only needed to regenerate the HTML. It is not needed to deploy or serve the
site. If you prefer, edit the generated `.html` files directly — just remember the
shared header and footer appear on all nine pages.

| Task | Where |
| --- | --- |
| Add a press item | `press` in `tools/content.mjs` (ISO `date`, sorts newest first) |
| Add a brand | `brands` in `tools/content.mjs`; a page is generated for it |
| Add a brand logo | Drop the file in `static/assets/img/brands/`, set `logo` with its pixel width and height. Brands without a logo show a typographic monogram. |
| Add a social profile | `social` in `tools/content.mjs`; it appears in the footer and contact section |
| Change the mission line | `site.mission` |
| Regenerate the share image | `node tools/og-image.mjs` (needs `sharp`; the PNG it writes is committed) |

## The contact form

There is no server, so the form posts wherever you tell it to. Open
`assets/js/site.js` and set the endpoint near the top:

```js
var CONTACT = {
  endpoint: "",                                  // ← paste your form endpoint here
  email: "hello@jonesandsonsenterprises.com"     // ← and the real inbox here
};
```

- **With an endpoint** — any service that accepts a plain `POST` of form fields works:
  Formspree, Web3Forms, Basin, Formsubmit, a Google Apps Script, or your own worker.
  Example: `endpoint: "https://formspree.io/f/abcdwxyz"`.
- **With no endpoint** (the default) — the form validates, then opens the visitor's own
  mail app with the message composed and addressed to `CONTACT.email`. It always works,
  but it is less convenient for the visitor, so set an endpoint before launch.

`CONTACT.email` is currently a placeholder. Set it to the real inbox.

Validation (required fields, email shape, 20-character minimum message, length caps)
and the spam honeypot both run client-side and match the rules the old API route used.

## How the motion works

`assets/js/site.js` holds one GSAP engine for the whole site. Markup opts in with data
attributes, so the HTML stays plain:

| Attribute | Effect |
| --- | --- |
| `data-fx="group"` | Children arrive one after another. Animates every `[data-fx-item]` inside, or the direct children if none are marked. |
| `data-fx="rise"` | A single element fades and lifts into place. |
| `data-fx="mask"` | A clip-path wipe, for figures and pull quotes. |
| `data-fx="words"` | A plain-text headline revealed word by word from behind a mask. |
| `data-fx="rule"` | A hairline rule draws itself out from the left. |
| `data-fx="drift"` | Scrub-linked parallax; `data-fx-amount` sets the travel in percent. |

Everything motion-related sits inside `gsap.matchMedia`, so anyone asking for reduced
motion gets the finished layout with no motion and nothing hidden. If the GSAP CDN is
blocked the script reveals the hero and the page degrades to a static but complete site.

## Browser support

Modern evergreen browsers. Uses CSS nesting-free plain selectors, custom properties,
`clamp()`, `aspect-ratio`, `inset`, and `100svh`.
