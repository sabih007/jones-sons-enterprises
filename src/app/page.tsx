import { Hero } from "@/components/Hero";
import { ScrollFX } from "@/components/ScrollFX";
import { Brands } from "@/components/Brands";
import { Explore, Mission } from "@/components/sections";

/**
 * The homepage is a landing page, not the whole site.
 *
 * About, Industries, Community, News and Contact each live at their own route;
 * duplicating them here would compete with those pages in search. Brands and
 * Mission stay because they are the portfolio and the thesis, and Explore is the
 * way into everything that moved out.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <Mission />
      <Explore />
      {/* Mounted inside the page so its effect runs only once this subtree has hydrated. */}
      <ScrollFX />
    </>
  );
}
