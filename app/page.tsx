"use client";

import { useRef } from "react";
import Hero from "@/components/home/hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import db from "@/data/home.json";
import AboutSection from "@/components/home/about-section";
import FavoriteTreat from "@/components/home/favorite-treat";
import DessertParadise from "@/components/home/dessert-paradise";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('section', mainRef.current);
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: { min: 0.2, max: 0.8 },
        delay: 0,
        ease: "power1.inOut"
      }
    });
  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden">
      <Hero products={db.products} />
      <AboutSection />
      <FavoriteTreat favorite_treats={db.favorite_treats} />
      <DessertParadise dessert_paradise={db.dessert_paradise} />
    </main>
  );
}
