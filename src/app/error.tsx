"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-24 text-ivory">
      <div className="shell">
        <p className="text-sm text-accent">Something went wrong</p>
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,5.5rem)]">This page didn&rsquo;t load.</h1>
        <p className="mt-6 max-w-[44ch] text-lg text-ivory/70">Reload the section to try again. If it keeps happening, return to the homepage.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button onClick={reset} className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-semibold text-ink hover:bg-ivory">
            Reload section
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold ring-1 ring-inset ring-ivory/30 hover:ring-accent">
            Go to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
