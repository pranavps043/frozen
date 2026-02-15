"use client";

import { useRef } from "react";
import Hero from "@/components/home/hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import db from "@/data/home.json";
import AboutSection from "@/components/home/about-section";
import FavoriteTreat from "@/components/home/favorite-treat";
import DessertParadise from "@/components/home/dessert-paradise";
import FlavorsFeelings from "@/components/home/flavors-feelings";
import EarnRewards from "@/components/home/earn-rewards";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const treatRef = useRef<HTMLElement>(null);
  const paradiseRef = useRef<HTMLElement>(null);
  const flavorsRef = useRef<HTMLElement>(null);
  const rewardsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('section', mainRef.current);

    // Smooth scroll snap
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1,
        ease: "power2.inOut"
      }
    });
  }, { scope: mainRef });

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: ref.current,
          offsetY: 0
        },
        ease: "power3.inOut"
      });
    }
  };

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden">
      <section ref={heroRef} className="h-screen">
        <Hero products={db.products} scrollToSection={scrollToSection} aboutRef={aboutRef} />
      </section>

      <section ref={aboutRef} className="h-screen">
        <AboutSection />
      </section>

      <section ref={treatRef} className="h-screen">
        <FavoriteTreat favorite_treats={db.favorite_treats} />
      </section>

      <section ref={paradiseRef} className="h-screen">
        <DessertParadise dessert_paradise={db.dessert_paradise} />
      </section>

      <section ref={flavorsRef} className="h-screen">
        <FlavorsFeelings data={db.flavors_feelings} />
      </section>

      <section ref={rewardsRef} className="h-screen">
        <EarnRewards earn_rewards={db.earn_rewards} />
      </section>
    </main>
  );
} 