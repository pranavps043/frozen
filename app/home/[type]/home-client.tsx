"use client";

import { useRef } from "react";
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
import { PageUrlListType, PageDataType } from "@/types/common";

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

export default function HomeClient({ data, PageList }: { data: PageDataType; PageList: PageUrlListType[] }) {
    const mainRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const treatRef = useRef<HTMLElement>(null);
    const paradiseRef = useRef<HTMLElement>(null);
    const flavorsRef = useRef<HTMLElement>(null);
    const rewardsRef = useRef<HTMLElement>(null);

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

    // const { styles, setStyles } = useStyle();
    // setStyles({
    //     ...styles,
    //     theme: styles.buttonStyle = data.base_styles.button_style
    // })

    return (
        <main ref={mainRef} className="relative w-full overflow-x-hidden"
            style={{
                '--btn-primary-bg': data.base_styles.button_color,
                '--btn-primary-shadow': data.base_styles.button_shadow,
                '--btn-primary-bg-hover': data.base_styles.button_hover,
            } as React.CSSProperties}
        >
            <section ref={heroRef} className="h-screen">
                <Hero content={data.hero} PageList={PageList} />
            </section>

            <section ref={aboutRef} className="h-screen">
                <AboutSection data={data.about_us} />
            </section>

            <section ref={treatRef} className="h-screen">
                <FavoriteTreat data={data.favorite_treats} />
            </section>

            <section ref={paradiseRef} className="h-[70vh] md:h-screen">
                <DessertParadise key={`${data.hero.slug}-paradise`} content={data.dessert_paradise} />
            </section>

            <section ref={flavorsRef} className="min-h-screen">
                <FlavorsFeelings data={data.flavors_feelings} />
            </section>

            <section ref={rewardsRef} className="h-screen">
                <EarnRewards earn_rewards={data.earn_rewards} />
            </section>
        </main>
    );
}