"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImageType } from "@/types/common";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
    year: string;
    image: ImageType;
    title: string;
    description: string;
}

interface TimelineSectionProps {
    backgroundImage: ImageType;
    title: string;
    items: TimelineItem[];
}

export default function TimelineSection({ backgroundImage, title, items }: TimelineSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".timeline-card");

        cards.forEach((card: any, index: number) => {
            const isLeft = index % 2 === 0;

            // Animate card from left or right
            gsap.fromTo(card,
                {
                    x: isLeft ? -100 : 100,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate the dot with bounce effect
            gsap.fromTo(card.querySelector(".timeline-dot"),
                {
                    scale: 0,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate card content with stagger
            gsap.fromTo(card.querySelectorAll(".timeline-content-item"),
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate the timeline line from top to bottom
        gsap.fromTo(".timeline-line",
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full min-h-screen py-20 overflow-hidden py-20 lg:py-40">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage.src}
                    alt={backgroundImage.alt}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-24">
                {/* Title */}
                <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-primary">
                    {title}
                </h2>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="timeline-line absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-white/50 lg:-translate-x-1/2 origin-top" />

                    {/* Timeline Items */}
                    <div className="space-y-20 lg:space-y-24">
                        {items.map((item, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`timeline-card relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="timeline-dot absolute left-4 lg:left-1/2 w-4 h-4 bg-white rounded-full lg:-translate-x-1/2 z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)] border-2 border-white/50" />

                                    {/* Content Card */}
                                    <div className={`pl-12 lg:pl-0 ${isLeft ? 'lg:col-start-1 lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12 lg:text-left'}`}>
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]">
                                            {/* Year */}
                                            <span className="timeline-content-item inline-block text-4xl font-bold text-white mb-6 font-primary bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                                {item.year}
                                            </span>

                                            {/* Image */}
                                            <div className="timeline-content-item relative w-full h-56 mb-6 rounded-xl overflow-hidden shadow-xl">
                                                <Image
                                                    src={item.image.src}
                                                    alt={item.image.alt}
                                                    fill
                                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>

                                            {/* Title */}
                                            <h3 className="timeline-content-item text-2xl font-semibold text-white mb-3 font-primary">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="timeline-content-item text-white/80 leading-relaxed text-base">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Empty space on the other side (desktop only) */}
                                    <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}