"use client";

import gsap from 'gsap';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { FloatingParticles } from './floating-particles';

interface HeroListItemProps {
    label: string;
    onClick: () => void;
}



export default function Hero({ products }: { products: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const currentProduct = products[activeIndex];
    const content = currentProduct.content;

    useEffect(() => {
        if (sectionRef.current && overlayRef.current) {
            const bgGradient = currentProduct['bg-gradient'];
            // Check if it's a CSS variable or a direct value
            const backgroundValue = bgGradient.startsWith('--') ? `var(${bgGradient})` : bgGradient;

            // Animate the background change
            gsap.to(sectionRef.current, {
                background: backgroundValue,
                duration: 1.5,
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
    }, [activeIndex, currentProduct]);

    const handleProductClick = (index: number) => {
        setActiveIndex(index);
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
        <section
            ref={sectionRef}
            className="w-full h-screen flex items-center px-8 lg:px-24 overflow-hidden bg-white relative"
        >
            <FloatingParticles key={`particles-${activeIndex}`} images={content.floatImages} count={12} />
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-white pointer-events-none z-0"
                style={{ opacity: 0 }}
            />

            {/* Left Column: Main Content */}
            <div className=" w-1/2 flex flex-col items-start z-10 pr-12">
                <motion.h1
                    key={`title-${activeIndex}`}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-7xl font-bold tracking-tight text-white mb-8 font-primary leading-[1.1]"
                >
                    {content.title}
                </motion.h1>
                <motion.p
                    key={`desc-${activeIndex}`}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-xl text-white/90 mb-10 leading-relaxed max-w-md"
                >
                    {content.description}
                </motion.p>
                <motion.div
                    key={`btn-${activeIndex}`}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-4"
                >
                    <button className="px-10 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all">
                        {content.buttonLabel}
                    </button>
                </motion.div>
            </div>

            {/* Right Column: Dynamic Sidebar Buttons */}
            <div className="absolute right-0 w-1/2 flex flex-col items-end z-10 h-full justify-center pr-12">
                <div className="w-80 flex flex-col gap-6">
                    {products.map((product, index) => (
                        <HeroListItem
                            key={index}
                            label={product.title}
                            image={product.image}
                            onClick={() => handleProductClick(index)}
                            index={index}
                            isActive={activeIndex === index}
                        />
                    ))}
                </div>
                <TagLine
                    key={`tagline-${activeIndex}`}
                    tagline={content.tagline}
                    tagline_img={content.tagline_img}
                />
            </div>


            {/* Center Absolute Content (Image) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-24 z-5">
                <motion.div
                    key={`image-${activeIndex}`}
                    initial={{ rotate: -180, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    className="relative w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]"
                >
                    <Image
                        src={content.image.src}
                        alt={content.image.alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Center Button - Interactive */}
                <motion.div
                    key={`center-btn-${activeIndex}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    className="mt-0 pointer-events-auto z-20"
                >
                    <button className="bg-nav-bg text-chocolate px-14 py-4 rounded-full font-bold text-xl shadow-xl border-b-4 border-earthy-brown/40 hover:bg-[#D4A588] hover:-translate-y-1 active:translate-y-0.5 active:border-b-0 transition-all uppercase tracking-[0.2em]">
                        {content.buttonLabel}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

interface HeroListItemProps {
    label: string;
    image: string;
    onClick: () => void;
    index: number;
    isActive: boolean;
}

const HeroListItem = ({ label, image, onClick, index, isActive }: HeroListItemProps) => (
    <motion.button
        onClick={onClick}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
        className={`flex items-center gap-4 text-left py-3 px-4 rounded-2xl transition-all duration-300 group ${isActive
            ? "bg-white/20 backdrop-blur-md border border-white/30 text-white"
            : "bg-transparent hover:bg-white/10 text-white/70 hover:text-white"
            }`}
    >
        <div className="relative w-16 h-16 flex-shrink-0">
            <Image
                src={image}
                alt={label}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
            />
        </div>
        <span className="text-sm font-semibold uppercase tracking-wider leading-tight">{label}</span>
    </motion.button>
);

const TagLine = ({ tagline, tagline_img }: { tagline: string, tagline_img: string }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="absolute bottom-12 right-0 z-10 text-right pr-4"
    >
        <div className="max-w-[400px] flex flex-col items-end">
            <p className="text-[10px] text-white/60 leading-relaxed font-bold uppercase tracking-[0.3em] mb-4 text-right">
                {tagline}
            </p>
            <div className="relative w-32 h-20">
                <Image
                    src={tagline_img}
                    alt="Tagline"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    </motion.div>
);