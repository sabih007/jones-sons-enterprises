/**
 * Regenerates the Open Graph share image (1200x630 PNG).
 *
 *   node tools/og-image.mjs
 *
 * Replaces the Next.js /opengraph-image route. Needs `sharp`, which is only a
 * generation-time dependency — the PNG it writes is committed, so neither the
 * site nor a deploy needs sharp installed.
 */

import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "static", "assets", "img", "og.png");

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bloom" cx="0.82" cy="0.18" r="0.62">
      <stop offset="0%" stop-color="#ef5257" stop-opacity="0.42" />
      <stop offset="100%" stop-color="#ef5257" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="shaft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f6f4f2" stop-opacity="0" />
      <stop offset="52%" stop-color="#f6f4f2" stop-opacity="0.09" />
      <stop offset="100%" stop-color="#f6f4f2" stop-opacity="0" />
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#0c0c0e" />
  <rect width="${W}" height="${H}" fill="url(#bloom)" />
  <g transform="rotate(17 980 100)"><rect x="760" y="-200" width="420" height="1100" fill="url(#shaft)" /></g>

  <!-- The house glyph, stroked rather than filled, as on the site. -->
  <text x="965" y="482" font-family="Georgia, 'Times New Roman', serif" font-style="italic"
        font-size="600" fill="none" stroke="#ef5257" stroke-opacity="0.5" stroke-width="3"
        text-anchor="middle">&amp;</text>

  <!-- Horizon hairline. -->
  <path d="M0 470 C 100 466, 175 452, 267 440 S 433 400, 533 405 S 683 443, 775 430 S 933 376, 1042 386 S 1167 422, 1200 425"
        fill="none" stroke="#ef5257" stroke-opacity="0.3" stroke-width="1.5" />

  <text x="80" y="118" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="27" fill="#ef5257">
    Est. 2018, Rancho Palos Verdes, California
  </text>

  <g font-family="Georgia, 'Times New Roman', serif" fill="#f6f4f2">
    <text x="80" y="400" font-size="102">Jones &amp; Sons</text>
    <text x="80" y="496" font-size="102">Enterprises</text>
  </g>

  <text x="80" y="556" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="29"
        fill="#f6f4f2" fill-opacity="0.7">
    A family-owned holding company
  </text>

  <rect y="${H - 6}" width="${W}" height="6" fill="#ef5257" />
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);

const meta = await sharp(png).metadata();
console.log(`Wrote static/assets/img/og.png (${meta.width}x${meta.height}, ${(png.length / 1024).toFixed(1)} kB)`);
