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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import { useStyle } from "@/context/style-context";

export default function HomeClient({ data, heros, PageList }: { data: any; heros: any[]; PageList: PageUrlListType[] }) {
    const { styles, setStyles } = useStyle();

    // Use context's activeSlug, or default from heros
    const activeSlug = styles.activeSlug || heros[0]?.slug || 'cheese-cake';

    useEffect(() => {
        if (!styles.activeSlug && heros[0]?.slug) {
            setStyles(prev => ({ ...prev, activeSlug: heros[0].slug }));
        }
    }, [styles.activeSlug, heros, setStyles]);

    const activeHero = heros.find(h => h.slug === activeSlug) || heros[0];
    const theme = activeHero.theme || data.base_styles;

    const mainRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const treatRef = useRef<HTMLElement>(null);
    const paradiseRef = useRef<HTMLElement>(null);
    const flavorsRef = useRef<HTMLElement>(null);
    const rewardsRef = useRef<HTMLElement>(null);

    const handleHeroChange = (slug: string) => {
        setStyles(prev => ({ ...prev, activeSlug: slug }));
    };

    useGSAP(() => {
        if (window.innerWidth < 768) return;

        const sections = gsap.utils.toArray('section', mainRef.current);

        // Smooth scroll snap with improved easing
        ScrollTrigger.create({
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            snap: {
                snapTo: 1 / (sections.length - 1),
                duration: { min: 0.3, max: 0.6 },
                delay: 0.05,
                ease: "power4.inOut"
            }
        });

        // Add parallax effect to sections
        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0.7 },
                {
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    }
                }
            );
        });
    }, { scope: mainRef });

    return (
        <main ref={mainRef} className="relative w-full overflow-x-hidden transition-colors duration-700"
            style={{
                '--btn-primary-bg': theme.button_color,
                '--btn-primary-shadow': data.base_styles.button_shadow,
                '--btn-primary-bg-hover': theme.button_hover,
                '--theme-gradient': theme.bg_gradient.startsWith('--') ? `var(${theme.bg_gradient})` : theme.bg_gradient,
                '--accordion-bg': theme.accordion_bg.startsWith('--') ? `var(${theme.accordion_bg})` : theme.accordion_bg,
                '--accordion-bg-active': theme.accordion_bg_active.startsWith('--') ? `var(${theme.accordion_bg_active})` : theme.accordion_bg_active,
            } as React.CSSProperties}
        >
            <section ref={heroRef} className="h-screen">
                <Hero heros={heros} PageList={PageList} onHeroChange={handleHeroChange} activeSlug={activeSlug} />
            </section>

            <section ref={aboutRef} className="h-screen" style={{ background: 'var(--theme-gradient)' }}>
                <AboutSection data={data.about_us} />
            </section>

            <section ref={treatRef} className="h-screen" style={{ background: 'var(--theme-gradient)' }}>
                <FavoriteTreat data={data.favorite_treats} />
            </section>

            <section ref={paradiseRef} className="h-[70vh] md:h-screen" style={{ background: 'var(--theme-gradient)' }}>
                <DessertParadise content={data.dessert_paradise} />
            </section>

            <section ref={flavorsRef} className="min-h-screen" style={{ background: 'var(--theme-gradient)' }}>
                <FlavorsFeelings data={data.flavors_feelings} />
            </section>

            <section ref={rewardsRef} className="h-screen" style={{ background: 'var(--theme-gradient)' }}>
                <EarnRewards earn_rewards={data.earn_rewards} />
            </section>
        </main>
    );
}
