import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-ink pt-24 text-ivory">
      <div className="shell">
        <p className="text-sm text-accent">Page not found</p>
        <h1 className="display mt-6 max-w-[14ch] text-[clamp(3rem,8vw,6.5rem)]">This page isn&rsquo;t part of the family.</h1>
        <p className="mt-6 max-w-[44ch] text-lg text-ivory/70">The link may be old or mistyped. Head home or browse the portfolio.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/#brands" variant="ghost-light">View our brands</ButtonLink>
        </div>
      </div>
    </section>
  );
}
