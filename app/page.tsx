"use client";

import { useRef } from "react";
import Hero from "@/components/home/hero";
import FeaturedSections from "@/components/home/featured-sections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Snap between Hero and FeaturedSections
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: [0, 1], // Simplified snap points for the whole home page
        duration: { min: 0.2, max: 0.8 },
        delay: 0,
        ease: "power1.inOut"
      }
    });

    // We can also let the children components handle their own internal snapping
  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden">
      <section className="snap-section h-screen">
        <Hero content={products[0].content} />
      </section>
      {/* <FeaturedSections /> */}
    </main>
  );
}
