import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Wordmark({ tone = "ink", className }: { tone?: "ink" | "ivory"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {/* The JS monogram from the house mark, cropped from the full lockup. */}
      <Image
        src="/logo-badge.png"
        alt=""
        aria-hidden
        width={512}
        height={512}
        priority
        className={cn(
          "size-11 shrink-0 rounded-[0.6rem] object-cover ring-1",
          tone === "ivory" ? "ring-ivory/15" : "ring-ink/10",
        )}
      />
      <span className="inline-flex flex-col leading-none">
        <span className={cn("display text-[1.45rem] tracking-[-0.01em]", tone === "ivory" ? "text-ivory" : "text-ink")}>
          Jones <span className="text-accent italic">&amp;</span> Sons
        </span>
        <span className={cn("mt-1 text-[0.68rem] tracking-[0.28em]", tone === "ivory" ? "text-ivory/60" : "text-slate")}>
          Enterprises
        </span>
      </span>
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "ghost-light" | "ghost-dark";
  external?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "accent", external, className }: ButtonProps) {
  const styles = {
    accent: "bg-accent text-ink hover:bg-ivory",
    "ghost-light": "text-ivory ring-1 ring-inset ring-ivory/30 hover:ring-accent hover:text-accent",
    "ghost-dark": "text-ink ring-1 ring-inset ring-ink/25 hover:ring-ink hover:bg-ink hover:text-ivory",
  }[variant];
  const cls = cn(
    "group inline-flex min-h-12 items-center gap-3 rounded-full px-6 text-[0.95rem] font-semibold transition-colors duration-500 ease-[var(--ease-house)]",
    styles,
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  id,
  kicker,
  title,
  intro,
  tone = "ink",
  className,
}: {
  id?: string;
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "ink" | "ivory";
  className?: string;
}) {
  return (
    <div data-fx="group" className={cn("grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
      <p
        data-fx-item
        className={cn(
          "flex items-center gap-3 self-start text-sm font-medium lg:col-span-3 lg:pt-5",
          tone === "ivory" ? "text-accent" : "text-accent-deep",
        )}
      >
        <span aria-hidden data-fx="rule" className="h-px w-8 bg-current" />
        {kicker}
      </p>
      <div className="lg:col-span-9">
        <h2
          id={id}
          data-fx-item
          className={cn(
            "display text-balance text-[clamp(2.4rem,5.4vw,4.75rem)]",
            tone === "ivory" ? "text-ivory" : "text-ink",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p
            data-fx-item
            className={cn(
              "mt-6 max-w-[58ch] text-lg leading-relaxed",
              tone === "ivory" ? "text-ivory/70" : "text-slate",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("link-underline inline-flex items-center gap-1", className)}>
      {children}
      <ArrowUpRight aria-hidden className="size-3.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
