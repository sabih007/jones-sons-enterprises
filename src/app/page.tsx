import { Hero } from "@/components/Hero";
import { ScrollFX } from "@/components/ScrollFX";
import { Brands } from "@/components/Brands";
import { Contact } from "@/components/Contact";
import { About, Community, Industries, Mission, Press } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Brands />
      <Industries />
      <Mission />
      <Community />
      <Press />
      <Contact />
      {/* Mounted inside the page so its effect runs only once this subtree has hydrated. */}
      <ScrollFX />
    </>
  );
}
