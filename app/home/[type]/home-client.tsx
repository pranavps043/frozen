"use client";

import { useRef, useEffect } from "react";

import Hero from "@/components/home/hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import AboutSection from "@/components/home/about-section";
import FavoriteTreat from "@/components/home/favorite-treat";
import DessertParadise from "@/components/home/dessert-paradise";
import FlavorsFeelings from "@/components/home/flavors-feelings";
import EarnRewards from "@/components/home/earn-rewards";
import { PageUrlListType } from "@/types/common";
import { HomeDataType, HeroType } from "@/types/home";
import { useStyle } from "@/context/style-context";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// type TypeData = {
//     title: string;
//     description: string;
//     content: string;
//     products?: any[];
//     favorite_treats?: any[];
//     dessert_paradise?: any[];
//     flavors_feelings?: any;
//     earn_rewards?: any;
// };

import { useRouter } from "next/navigation";

export default function HomeClient({ data, heros, PageList }: { data: HomeDataType; heros: HeroType[]; PageList: PageUrlListType[] }) {
    const router = useRouter();
    const { styles, setStyles } = useStyle();
    const activeSlug = data.hero.slug;

    useEffect(() => {
        if (styles.activeSlug !== activeSlug) {
            setStyles(prev => ({ ...prev, activeSlug }));
        }
    }, [activeSlug, setStyles, styles.activeSlug]);

    const mainRef = useRef<HTMLElement>(null);

    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const treatRef = useRef<HTMLElement>(null);
    const paradiseRef = useRef<HTMLElement>(null);
    const flavorsRef = useRef<HTMLElement>(null);
    const rewardsRef = useRef<HTMLElement>(null);

    const handleHeroChange = (slug: string) => {
        router.push(`/home/${slug}`);
    };

    useGSAP(() => {
        if (window.innerWidth < 768) return;
        const sections = gsap.utils.toArray('section', mainRef.current);

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

    return (
        <main ref={mainRef} className="relative w-full overflow-x-hidden"
            style={{
                '--btn-primary-bg': data.base_styles.button_color,
                '--btn-primary-shadow': data.base_styles.button_shadow,
                '--btn-primary-bg-hover': data.base_styles.button_hover,
            } as React.CSSProperties}
        >
            <section ref={heroRef} className="h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <Hero heros={heros} PageList={PageList} onHeroChange={handleHeroChange} activeSlug={activeSlug} />
            </section>

            <section ref={aboutRef} className="h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <AboutSection 
                    data={data.about_us} 
                    dynamicImage={data.hero.theme?.about_section_image}
                />
            </section>

            <section ref={treatRef} className="h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <FavoriteTreat data={data.favorite_treats} />
            </section>

            <section ref={paradiseRef} className="h-[70vh] md:h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <DessertParadise content={data.dessert_paradise} bgImage={data.hero.theme?.dessert_paradise_bg} />
            </section>

            <section ref={flavorsRef} className="min-h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <FlavorsFeelings data={data.flavors_feelings} />
            </section>

            <section ref={rewardsRef} className="h-screen" style={{ background: data.base_styles.bg_gradient.startsWith('--') ? `var(${data.base_styles.bg_gradient})` : data.base_styles.bg_gradient }}>
                <EarnRewards earn_rewards={data.earn_rewards} />
            </section>
        </main>
    );
}