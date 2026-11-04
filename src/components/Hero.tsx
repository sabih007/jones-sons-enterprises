"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "./ui";
import { site } from "@/content/site";
import { brands, sectors } from "@/content/brands";

const lines = [
  { text: "Built by family.", italic: false },
  { text: "Held for", italic: false },
  { text: "generations", italic: true },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set("[data-hero-ready]", { autoAlpha: 1 })
          .from("[data-light]", { autoAlpha: 0, xPercent: 35, duration: 2.6, ease: "power2.out" }, 0)
          .from("[data-glow]", { autoAlpha: 0, scale: 0.55, duration: 2.4, ease: "power2.out" }, 0.15)
          .from("[data-amp]", { clipPath: "inset(100% 0 0 0)", duration: 1.8, ease: "expo.inOut" }, 0)
          .from("[data-line]", { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.7)
          .from("[data-horizon]", { strokeDashoffset: 2400, duration: 2.4, ease: "power2.inOut" }, 0.4)
          .from("[data-fade]", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.9);

        // The scroll cue keeps travelling until the hero leaves.
        gsap.fromTo(
          "[data-scroll-dot]",
          { yPercent: -110 },
          { yPercent: 250, duration: 1.7, ease: "power1.inOut", repeat: -1, repeatDelay: 0.35, delay: 2 },
        );

        gsap.to("[data-amp-wrap]", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-light]", {
          yPercent: 12,
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

      // Pointer parallax, on devices that actually have a pointer. x/y here are
      // independent of the yPercent the scroll tweens above own.
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const lightX = gsap.quickTo("[data-light]", "x", { duration: 1.1, ease: "power3" });
        const lightY = gsap.quickTo("[data-light]", "y", { duration: 1.1, ease: "power3" });
        const ampX = gsap.quickTo("[data-amp-wrap]", "x", { duration: 1.4, ease: "power3" });
        const ampY = gsap.quickTo("[data-amp-wrap]", "y", { duration: 1.4, ease: "power3" });

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          lightX(nx * 48);
          lightY(ny * 28);
          ampX(nx * -26);
          ampY(ny * -16);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
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
      {/* The shaft of light that falls across the house mark. */}
      <div
        data-light
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-18%] h-[165%] w-[68%] rotate-[17deg] bg-[linear-gradient(90deg,transparent_0%,rgba(246,244,242,0.04)_38%,rgba(246,244,242,0.085)_54%,rgba(246,244,242,0.02)_72%,transparent_100%)] blur-2xl"
      />

      {/* Crimson bloom behind the glyph, taken from the J. */}
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute right-[-14vw] top-[2vh] size-[62vw] rounded-full bg-accent/25 blur-[130px] lg:size-[42vw]"
      />

      {/* Monogram: the house glyph, revealed through a rising mask */}
      <div
        data-amp-wrap
        aria-hidden
        className="pointer-events-none absolute -right-[12vw] top-[6vh] select-none sm:-right-[6vw] lg:right-[2vw] lg:top-[2vh]"
      >
        <span
          data-amp
          className="display block text-[min(118vw,62rem)] italic leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(246,244,242,0.26)] lg:text-[min(64vw,60rem)]"
        >
          &amp;
        </span>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[13vh] h-[16vh] w-full text-accent/25 lg:bottom-[11vh]"
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

      {/* Vignette, so the corners fall away and the copy sits forward. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_45%_15%,transparent_30%,rgba(0,0,0,0.5)_100%)]"
      />

      <noscript>
        <style>{`[data-hero-ready]{visibility:visible!important}`}</style>
      </noscript>
      <div data-hero-ready className="invisible relative flex flex-1 flex-col">
        <div data-hero-copy className="shell flex flex-1 flex-col justify-center pb-8 pt-24 lg:pt-28">
          <p data-fade className="mb-6 flex items-center gap-3 text-sm text-accent">
            <span aria-hidden className="h-px w-8 bg-current" />
            A family holding company, est. {site.founded}
          </p>

          <h1
            id="hero-title"
            className="display bg-[linear-gradient(176deg,#ffffff_0%,#f6f4f2_42%,rgba(246,244,242,0.74)_100%)] bg-clip-text text-[clamp(3.2rem,min(9vw,12.5vh),8.5rem)] text-transparent"
          >
            {lines.map((l) => (
              <span key={l.text} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span data-line className={l.italic ? "block italic" : "block"}>
                  {l.text}
                  {l.italic ? <span className="not-italic text-accent">.</span> : null}
                </span>
              </span>
            ))}
          </h1>

          <p data-fade className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ivory/70">
            Jones &amp; Sons Enterprises owns and guides a portfolio of businesses in healthcare, commercial real
            estate, investments, and sports and entertainment, from our home in Rancho Palos Verdes, California.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
            <div data-fade className="flex flex-wrap gap-3">
              <ButtonLink href="/#brands">Explore our brands</ButtonLink>
              <ButtonLink href="/#about" variant="ghost-light">
                Discover our story
              </ButtonLink>
            </div>

            <div
              data-fade
              aria-hidden
              className="hidden items-center gap-4 text-[0.68rem] uppercase tracking-[0.24em] text-ivory/40 lg:flex"
            >
              Scroll
              <span className="relative block h-11 w-px overflow-hidden bg-ivory/15">
                <span data-scroll-dot className="absolute inset-x-0 top-0 block h-4 bg-accent" />
              </span>
            </div>
          </div>
        </div>

        <div data-fade className="border-t border-ivory/10 bg-ink/40 backdrop-blur-[2px]">
          <dl className="shell grid grid-cols-3 py-4 sm:py-5">
            <div className="pr-4">
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-accent sm:text-[0.66rem] sm:tracking-[0.22em]">Founded</dt>
              <dd className="display mt-1.5 text-[0.95rem] text-ivory sm:text-lg lg:text-xl">{site.founded}</dd>
            </div>
            <div className="border-l border-ivory/10 pl-4 pr-4 sm:pl-8">
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-accent sm:text-[0.66rem] sm:tracking-[0.22em]">Headquarters</dt>
              <dd className="display mt-1.5 text-[0.95rem] text-ivory sm:text-lg lg:text-xl">
                Rancho Palos Verdes<span className="hidden sm:inline">, California</span>
              </dd>
            </div>
            <div className="border-l border-ivory/10 pl-4 sm:pl-8">
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-accent sm:text-[0.66rem] sm:tracking-[0.22em]">Portfolio</dt>
              <dd className="display mt-1.5 text-[0.95rem] text-ivory sm:text-lg lg:text-xl">
                {brands.length} brands, {sectors.length} industries
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
