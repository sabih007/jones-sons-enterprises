"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "./ui";
import { site } from "@/content/site";
import { brands, sectors } from "@/content/brands";

const lines = ["Built by family.", "Held for", "generations."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set("[data-hero-ready]", { autoAlpha: 1 })
          .from("[data-amp]", { clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "expo.inOut" })
          .from("[data-line]", { yPercent: 110, duration: 1.3, stagger: 0.09 }, "-=1.1")
          .from("[data-horizon]", { strokeDashoffset: 2400, duration: 2.4, ease: "power2.inOut" }, "-=1.4")
          .from("[data-fade]", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, "-=1.8");

        gsap.to("[data-amp-wrap]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.fromTo(
          "[data-hero-copy]",
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -12,
            opacity: 0.25,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: "30% top", end: "bottom top", scrub: true },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-ready]", { autoAlpha: 1 });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory"
    >
      {/* Monogram: the house glyph, revealed through a rising mask */}
      <div
        data-amp-wrap
        aria-hidden
        className="pointer-events-none absolute -right-[12vw] top-[6vh] select-none sm:-right-[6vw] lg:right-[2vw] lg:top-[2vh]"
      >
        <span
          data-amp
          className="display block text-[min(118vw,62rem)] italic leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(232,71,77,0.5)] lg:text-[min(64vw,60rem)]"
        >
          &amp;
        </span>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[22vh] h-[18vh] w-full text-accent/40 lg:bottom-[18vh]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          data-horizon
          d="M0 150 C 120 148, 210 132, 320 118 S 520 70, 640 76 S 820 120, 930 104 S 1120 40, 1250 52 S 1400 96, 1440 100"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2400"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <noscript>
        <style>{`[data-hero-ready]{visibility:visible!important}`}</style>
      </noscript>
      <div data-hero-ready className="invisible relative flex flex-1 flex-col">
        <div data-hero-copy className="shell flex flex-1 flex-col justify-center pb-12 pt-28 lg:pt-32">
          <p data-fade className="mb-8 flex items-center gap-3 text-sm text-accent">
            <span aria-hidden className="h-px w-8 bg-current" />
            A family holding company, est. {site.founded}
          </p>
          <h1 id="hero-title" className="display text-[clamp(3.2rem,min(9vw,12.5vh),8.5rem)] text-ivory">
            {lines.map((l) => (
              <span key={l} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span data-line className="block">
                  {l}
                </span>
              </span>
            ))}
          </h1>
          <p data-fade className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ivory/70 sm:text-xl">
            Jones &amp; Sons Enterprises owns and guides a portfolio of businesses in healthcare, commercial real
            estate, investments, and sports and entertainment, from our home in Rancho Palos Verdes, California.
          </p>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/#brands">Explore our brands</ButtonLink>
            <ButtonLink href="/#about" variant="ghost-light">
              Discover our story
            </ButtonLink>
          </div>
        </div>

        <div data-fade className="border-t border-ivory/10">
          <dl className="shell grid grid-cols-3 gap-4 py-6 text-sm sm:py-8">
            <div>
              <dt className="text-ivory/45">Founded</dt>
              <dd className="mt-1 text-ivory">{site.founded}</dd>
            </div>
            <div>
              <dt className="text-ivory/45">Headquarters</dt>
              <dd className="mt-1 text-ivory">
                Rancho Palos Verdes<span className="hidden sm:inline">, California</span>
              </dd>
            </div>
            <div>
              <dt className="text-ivory/45">Portfolio</dt>
              <dd className="mt-1 text-ivory">
                {brands.length} brands, {sectors.length} industries
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
