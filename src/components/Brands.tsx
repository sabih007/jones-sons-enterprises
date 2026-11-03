"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { brands, sectorName, type Brand } from "@/content/brands";
import { SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

export function BrandMark({ brand, size = "lg" }: { brand: Brand; size?: "lg" | "sm" }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo.src}
        width={brand.logo.width}
        height={brand.logo.height}
        alt={`${brand.name} logo`}
        sizes={size === "lg" ? "(min-width: 1024px) 320px, 70vw" : "160px"}
        className={cn("h-auto w-auto object-contain", size === "lg" ? "max-h-28 max-w-[78%]" : "max-h-12 max-w-[70%]")}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label={`${brand.name} monogram`}
      className={cn("display italic text-ink", size === "lg" ? "text-[clamp(4rem,9vw,7.5rem)]" : "text-4xl")}
    >
      {brand.monogram}
    </span>
  );
}

export function Brands() {
  const [active, setActive] = useState(brands[1].slug);
  const reduce = useReducedMotion();
  const current = brands.find((b) => b.slug === active) ?? brands[0];

  return (
    <section id="brands" aria-labelledby="brands-title" className="grain bg-ink py-28 text-ivory lg:py-40">
      <div className="shell">
        <SectionHeading
          id="brands-title"
          tone="ivory"
          kicker="Our brands"
          title="The Jones & Sons portfolio."
          intro="Seven brands under one family name, from dental care to practice brokerage to sports memorabilia."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <ul data-fx="group" className="border-t border-ivory/12 lg:col-span-7">
            {brands.map((b) => {
              const isActive = b.slug === active;
              return (
                <li key={b.slug} data-fx-item className="border-b border-ivory/12">
                  <Link
                    href={`/brands/${b.slug}`}
                    onMouseEnter={() => setActive(b.slug)}
                    onFocus={() => setActive(b.slug)}
                    className="group flex items-center justify-between gap-6 py-6 sm:py-7"
                  >
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "display block text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.05] transition-[color,transform] duration-700 ease-[var(--ease-house)]",
                          isActive ? "translate-x-0 text-ivory lg:translate-x-3" : "text-ivory/55",
                        )}
                      >
                        {b.name}
                      </span>
                      <span className="mt-2 block text-sm text-ivory/50 lg:hidden">{b.summary}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "size-6 shrink-0 transition-all duration-500",
                        isActive ? "text-accent opacity-100" : "text-ivory/30 lg:opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-ivory">
                    <BrandMark brand={current} />
                  </div>
                  <p className="mt-8 text-lg leading-relaxed text-ivory/75">{current.summary}</p>
                  {current.sectors.length ? (
                    <p className="mt-4 text-sm text-accent">{current.sectors.map(sectorName).join(", ")}</p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
