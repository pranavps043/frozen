"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        title: "Artisanal Perfection",
        description: "Every cake is handcrafted with the finest ingredients and a touch of magic. Discover the secret behind our signature textures.",
        image: "/assets/images/banner-cake.webp",
        bgColor: "#FFF9F5",
        accentColor: "#BC9478",
    },
    {
        title: "Pure Ingredients",
        description: "We source only organic and sustainable ingredients for our premium frozen treats. From farm to freezer, quality is our priority.",
        image: "/assets/images/banner-cake.webp",
        bgColor: "#F5FBFF",
        accentColor: "#78A0BC",
    },
    {
        title: "Expertly Frozen",
        description: "Our flash-freezing technique locks in flavor and moisture for the perfect bite every time. Experience freshness in every slice.",
        image: "/assets/images/banner-cake.webp",
        bgColor: "#F9F5FF",
        accentColor: "#9478BC",
    },
];

export default function FeaturedSections() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".feature-section");

        // Stacked pinning effect
        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                pin: true,
                pinSpacing: false,
                end: () => `+=${window.innerHeight}`,
                id: `section-${i}`, // Added for easier debugging/reference
            });

            // Scale down previous sections slightly as they get covered
            if (i < sections.length - 1) {
                gsap.to(section, {
                    scale: 0.9,
                    opacity: 0.5,
                    scrollTrigger: {
                        trigger: sections[i + 1],
                        start: "top top",
                        end: "top 40%",
                        scrub: true,
                    }
                });
            }

            // Individual content animations
            const content = section.querySelector(".section-content");
            if (content) {
                gsap.from(content, {
                    opacity: 0,
                    y: 100,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    }
                });
            }
        });

        // Pinned image animations
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: ".pin-image-wrapper",
            pinSpacing: false,
        });

        gsap.to(".pinned-image", {
            rotate: 360,
            scale: 1.2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        // Handle Snap across ALL sections including the Hero
        // The containerRef covers only the featured sections.
        // The total distance is the height of the container.
        const snapTo = 1 / sections.length;
        const snapValues = sections.map((_, i) => (i) * snapTo);
        // Add points for the end of each section
        snapValues.push(1);

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            snap: {
                snapTo: snapValues,
                duration: { min: 0.2, max: 0.8 },
                delay: 0,
                ease: "power2.inOut"
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Pinned Image Layer - Stays above all sections */}
            <div className="pin-image-wrapper absolute right-0 top-0 w-1/2 h-screen flex items-center justify-center p-12 overflow-hidden pointer-events-none z-[100]">
                <div className="relative w-full aspect-square max-w-2xl pinned-image">
                    <Image
                        src="/assets/images/banner-cake.webp"
                        alt="Pinned Product"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>

            {/* Sections */}
            {SECTIONS.map((section, index) => (
                <section
                    key={index}
                    className="feature-section relative h-screen w-full flex items-center px-8 lg:px-24 shadow-2xl overflow-hidden"
                    style={{
                        backgroundColor: section.bgColor,
                        zIndex: index + 10
                    }}
                >
                    {/* Subtle Background Pattern or Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                        <h3 className="text-[20rem] font-black whitespace-nowrap uppercase">
                            {section.title.split(' ')[0]}
                        </h3>
                    </div>

                    <div className="section-content max-w-xl z-20">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-[2px] w-12" style={{ backgroundColor: section.accentColor }}></span>
                            <span className="text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                                0{index + 1} / 0{SECTIONS.length}
                            </span>
                        </div>

                        <h2 className="text-7xl font-black text-gray-900 mb-8 leading-tight">
                            {section.title}
                        </h2>
                        <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-lg">
                            {section.description}
                        </p>

                        <button
                            className="group relative px-12 py-5 bg-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
                            style={{ backgroundColor: "#1c1c1c" }}
                        >
                            <span className="relative z-10 uppercase tracking-[0.2em] text-sm">Discover More</span>
                        </button>
                    </div>
                </section>
            ))}

            {/* Spacing for the pinned sections */}
            <div className="h-screen w-full invisible pointer-events-none"></div>
        </div>
    );
}
