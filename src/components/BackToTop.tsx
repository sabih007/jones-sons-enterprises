"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-3 text-sm font-semibold text-ivory"
    >
      Back to top
      <span className="flex size-11 items-center justify-center rounded-full ring-1 ring-ivory/25 transition-colors duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
        <ArrowUp aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}
