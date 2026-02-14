

"use client";

import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { Button, Image } from '@/types/common';

gsap.registerPlugin(ScrollTrigger);

interface DessertParadiseType {
    title: string
    description: string
    button: Button,
    image: Image
}


export default function DessertParadise({ dessert_paradise }: { dessert_paradise: DessertParadiseType }) {
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !bgRef.current) return;

        // Background Parallax
        gsap.to(bgRef.current, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Content Reveal
        const elements = contentRef.current?.children;
        if (elements) {
            gsap.from(elements, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, { scope: containerRef });


    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                style={{
                    backgroundImage: "url('/assets/images/about-us-bg.webp')",
                }}
            />

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />


            {/* Centered Content Container */}
            <div ref={contentRef} className="relative z-10 flex flex-col items-center px-4 text-center text-white max-w-5xl">
                {/* Pre-title */}
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-peach-frost"
                >
                    Experience the Magic
                </motion.span>

                {/* Title */}
                <h1 className="mb-8 text-6xl font-bold tracking-tight sm:text-8xl md:text-9xl font-primary leading-none">
                    Dessert <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Paradise</span>
                </h1>

                {/* Description */}
                <p className="mb-12 text-lg font-light text-gray-200 sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
                    A curated collection of frozen delights crafted with exotic fruits and premium ingredients.
                    Every bite is a journey to a world of pure indulgence.
                </p>

                {/* Interactive Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-black transition-all hover:bg-white/90 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.6)]">
                        <span className="font-bold uppercase tracking-widest text-sm">Explore Collection</span>
                        <svg
                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </motion.div>
            </div>

            {/* Bottom Tagline/Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Nature's Finest</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
        </section>
    );
}