"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One GSAP + ScrollTrigger engine for the whole site, mounted once in the root layout.
 *
 * Sections stay server components and opt in with data attributes:
 *
 *   data-fx="group"   children arrive one after another. Animates every
 *                     [data-fx-item] inside, or the direct children if none are marked.
 *   data-fx="rise"    a single element fades and lifts into place.
 *   data-fx="mask"    a clip-path wipe, for figures and pull quotes.
 *   data-fx="words"   plain-text headline revealed word by word from behind a mask.
 *   data-fx="rule"    a hairline rule draws itself out from the left.
 *   data-fx="drift"   scrub-linked parallax; data-fx-amount sets the travel in percent.
 *
 * Everything lives inside gsap.matchMedia, so anyone asking for reduced motion gets
 * the finished layout with no motion and no hidden content.
 *
 * Setup waits a frame on purpose: this component sits in the root layout and would
 * otherwise write inline styles onto page markup React has not hydrated yet, which
 * React reports as a mismatch and then throws away.
 */

const RISE = { autoAlpha: 0, y: 28, duration: 1, ease: "expo.out" } as const;

/** Rebuild an element's text as masked word spans, returning the inner spans to animate. */
function splitIntoWords(el: HTMLElement) {
  const frag = document.createDocumentFragment();
  const words: HTMLElement[] = [];

  for (const chunk of (el.textContent ?? "").split(/(\s+)/)) {
    if (!chunk) continue;
    if (!chunk.trim()) {
      frag.append(chunk);
      continue;
    }
    const mask = document.createElement("span");
    mask.className = "fx-word";
    const inner = document.createElement("span");
    inner.textContent = chunk;
    mask.append(inner);
    frag.append(mask);
    words.push(inner);
  }

  el.replaceChildren(frag);
  return words;
}

export function ScrollFX() {
  // Rebuilds the triggers after a client-side navigation to a brand page.
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const split: { el: HTMLElement; html: string }[] = [];
    let ctx: gsap.Context | undefined;

    const frame = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.utils.toArray<HTMLElement>('[data-fx="group"]').forEach((group) => {
            const marked = group.querySelectorAll<HTMLElement>("[data-fx-item]");
            const items = marked.length ? Array.from(marked) : Array.from(group.children);
            if (!items.length) return;
            gsap.from(items, {
              ...RISE,
              stagger: 0.09,
              scrollTrigger: { trigger: group, start: "top 85%" },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-fx="rise"]').forEach((el) => {
            gsap.from(el, { ...RISE, scrollTrigger: { trigger: el, start: "top 88%" } });
          });

          gsap.utils.toArray<HTMLElement>('[data-fx="mask"]').forEach((el) => {
            gsap.from(el, {
              clipPath: "inset(16% 0 16% 0)",
              opacity: 0.2,
              duration: 1.4,
              ease: "expo.inOut",
              scrollTrigger: { trigger: el, start: "top 88%" },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-fx="words"]').forEach((el) => {
            if (el.children.length) return; // only safe on plain text
            split.push({ el, html: el.innerHTML });
            gsap.from(splitIntoWords(el), {
              yPercent: 115,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.045,
              scrollTrigger: { trigger: el, start: "top 80%" },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-fx="rule"]').forEach((el) => {
            gsap.from(el, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 92%" },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-fx="drift"]').forEach((el) => {
            const amount = Number(el.dataset.fxAmount ?? 14);
            gsap.fromTo(
              el,
              { yPercent: -amount / 2 },
              {
                yPercent: amount / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest("section") ?? el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });

          // Reading progress along the top edge.
          gsap.fromTo(
            "[data-fx-progress]",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
              },
            },
          );
        });
      });

      // Afacad changes the metrics once it swaps in, so re-measure every trigger.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(frame);
      ctx?.revert();
      for (const s of split) s.el.innerHTML = s.html;
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      data-fx-progress
      style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-accent"
    />
  );
}
