"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Wordmark } from "./ui";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-700 ease-[var(--ease-house)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        solid ? "bg-ivory/90 shadow-[0_1px_0_rgba(12,12,14,0.1)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name}, home`} className="relative z-10" onClick={() => setOpen(false)}>
          <Wordmark tone={solid ? "ink" : "ivory"} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.slice(0, -1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "link-underline text-[0.92rem] font-medium transition-colors",
                    solid ? "text-ink/80 hover:text-ink" : "text-ivory/80 hover:text-ivory",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-5 text-[0.92rem] font-semibold transition-colors duration-500",
                  solid ? "bg-ink text-ivory hover:bg-accent hover:text-ink" : "bg-ivory text-ink hover:bg-accent",
                )}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={cn(
            "relative z-10 inline-flex size-11 items-center justify-center rounded-full lg:hidden",
            solid ? "text-ink" : "text-ivory",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="grain fixed inset-0 bg-ink lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="shell flex h-full flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display block py-2 text-[2.6rem] text-ivory transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="text-sm text-ivory/50">
                Family-owned since {site.founded}. {site.location}.
              </p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
