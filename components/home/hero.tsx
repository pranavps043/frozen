"use client";

import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Key, useEffect, useRef, useState } from 'react';
import { useRouter } from "next/navigation";

import { FloatingParticles } from './floating-particles';
import { ImageType, PageUrlListType } from '@/types/common';
import Button from '@/components/ui/button';


export interface ContentType {
    title: string
    description: string
    buttonLabel: string
    buttonLink: string
    image: ImageType
    sub_image: ImageType
    floatImages: string[]
    tagline: string
    tagline_img: ImageType
    bg_gradient: string
}



export default function Hero({ content, PageList }: { content: any; PageList: PageUrlListType[] }) {
    const [activeSlug, setActiveSlug] = useState(content.slug || 'default');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (sectionRef.current && overlayRef.current) {
            const bgGradient = content.bg_gradient;
            const backgroundValue = bgGradient.startsWith('--') ? `var(${bgGradient})` : bgGradient;

            gsap.to(sectionRef.current, {
                background: backgroundValue,
                duration: 1.2,
                ease: 'power2.inOut',
            });

            // Add a subtle flash effect
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0.3 },
                {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                }
            );
        }

        // Reset transitioning state when content changes
        setIsTransitioning(false);
    }, [content]);

    const handleProductClick = (slug: string) => {
        // Prevent multiple clicks during transition
        if (isTransitioning || slug === content.slug) return;

        setIsTransitioning(true);
        setActiveSlug(slug);

        if (sectionRef.current && contentRef.current) {
            const timeline = gsap.timeline();

            // Fade out content
            timeline.to(contentRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
            });

            // Subtle background pulse
            timeline.to(overlayRef.current, {
                opacity: 0.15,
                duration: 0.2,
                ease: 'power2.inOut',
            }, "<");

            // Navigate to new page
            timeline.call(() => {
                router.push(`/home/${slug}`);
            });

            // Fade out overlay
            timeline.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        }
    };

    const textVariants: any = {
        hidden: { y: 30, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: "easeOut",
            }
        })
    };


    return (
        <div
            ref={sectionRef}
            className="w-full h-full flex items-center px-8 lg:px-24 overflow-hidden bg-white relative"
        >
            <FloatingParticles key={content.content.title} images={content.content.floatImages} count={12} />
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-white pointer-events-none z-0"
                style={{ opacity: 0 }}
            />

            {/* Main content wrapper with ref for transitions */}
            <div ref={contentRef} className="w-full h-full flex items-center relative z-10">
                {/* Left Column: Main Content */}
                <div className="w-full h-full mt-[50%] lg:w-1/2 flex flex-col items-start pr-5 lg:pr-12">
                    <motion.h2
                        key={`title-${content.title}`}
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="font-playfair font-normal text-[18px] md:text-[38px] text-shadow-md mb-4"
                    >
                        {content.content.title}
                    </motion.h2>
                    <motion.p
                        key={`desc-${content.content.title}`}
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-[12px] md:text-[18px] text-white/90 mb-10 leading-relaxed max-w-md text-shadow-md"
                    >
                        {content.content.description}
                    </motion.p>
                    <motion.div
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mt-4"
                    >
                        <Button variant="primary" size="sm" href={content.content.buttonLink}>
                            {content.content.buttonLabel}
                        </Button>
                    </motion.div>
                </div>

                {/* Right Column: Dynamic Sidebar Buttons */}
                <div className="absolute right-0 w-1/2 flex flex-col items-end h-full justify-center pr-1 lg:pr-12">
                    <div className=" flex flex-col md:gap-6 gap-3">
                        {PageList.map((page: PageUrlListType, index: Key) => (
                            <HeroListItem
                                key={index}
                                label={page.name}
                                image={page.image}
                                onClick={() => handleProductClick(page.slug)}
                                isActive={page.slug === content.slug}
                                isTransitioning={isTransitioning}
                            />
                        ))}
                    </div>
                </div>

                <TagLine
                    tagline={content.content.tagline}
                    image={content.content.tagline_img}
                />

                {/* Center Absolute Content (Image) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-24 -z-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlug}
                            initial={{ rotate: -180, scale: 0, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 360, scale: 0, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 100,
                                damping: 20
                            }}
                            className="relative w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]"
                        >
                            <Image
                                src={content.content.image.src}
                                alt={content.content.image.alt}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

interface HeroListItemProps {
    label: string;
    image: ImageType;
    onClick: () => void;
    index?: number;
    isActive?: boolean;
    isTransitioning?: boolean;
}
const HeroListItem = ({ label, image, onClick, isActive, isTransitioning }: HeroListItemProps) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-4 text-left py-3 px-4 rounded-2xl transition-all duration-300 group backdrop-blur-md shadow-lg border border-white/30 text-white hover:bg-white/30 relative -translate-x-0 hover:-translate-x-5 ease-in-out cursor-pointer scale-80 sm:scale-100
            ${isActive ? 'ring-2 ring-white/50 bg-amber-700/20 -translate-x-2' : ''}
            ${isTransitioning ? 'opacity-50 pointer-events-none' : ''}
        `}
    >
        <div className="relative w-16 h-16 flex-shrink-0">
            <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-contain group-hover:-translate-x-3 ease-in-out transition-transform duration-300 group-hover:scale-180 ${isActive ? 'scale-180 -translate-x-5' : ''}`}
                priority
            />
        </div>
        <span className="text-sm font-semibold uppercase tracking-wider text-shadow-md leading-tight hidden lg:block max-w-[150px] pr-4">{label}</span>
    </div>
);

const TagLine = ({ tagline, image }: { tagline: string, image: ImageType }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="absolute bottom-12 right-0 z-10 text-right pr-4 max-w-3xl"
        >
            <div className="max-w-[400px] flex flex-row-reverse">
                <p className="text-[14px] text-white/80 leading-relaxed font-bold uppercase tracking-[0.3em] mb-4  text-shadow-sm">
                    {tagline}
                </p>
                <div className="relative w-32 h-20">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </motion.div>
    )
};