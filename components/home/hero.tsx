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



export default function Hero({ content }: { content: any }) {
    const [gradientIndex, setGradientIndex] = useState(0);
    const sectionRef = useRef(null);
    const overlayRef = useRef(null);

    const gradients = [
        'linear-gradient(135deg, #F8F3F0 0%, #E8D5C8 100%)',
        'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
        'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    ];

    useEffect(() => {
        if (sectionRef.current && overlayRef.current) {
            // Animate the background change
            gsap.to(sectionRef.current, {
                background: gradients[gradientIndex % gradients.length],
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
    }, [gradientIndex]);

    const handleItemClick = (item: string) => {
        console.log(`${item} clicked`);
        setGradientIndex((prev) => (prev + 1) % gradients.length);
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
            style={{ background: gradients[0] }}
            className=" w-full h-screen flex items-center px-8 lg:px-24 overflow-hidden bg-white"
        >
            <FloatingParticles images={content.floatImages} count={12} />
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-white pointer-events-none"
                style={{ opacity: 0 }}
            />

            {/* Left Column: Main Content */}
            <div className=" w-1/2 flex flex-col items-start z-10 pr-12">
                <motion.h1
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-7xl font-bold tracking-tight text-gray-900 mb-8 font-primary leading-[1.1]"
                >
                    {content.title}
                </motion.h1>
                <motion.p
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="text-xl text-gray-600 mb-10 leading-relaxed max-w-md"
                >
                    {content.description}
                </motion.p>
                <motion.div
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="mt-4"
                >
                    <button className="px-10 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all">
                        {content.buttonLabel}
                    </button>
                </motion.div>
            </div>

            {/* Right Column: Hero List Items */}
            <div className="absolute right-0 w-1/2 flex flex-col items-end z-10 h-full justify-center">
                <div className="w-64 flex flex-col justify-around h-[50%]">
                    <HeroListItem
                        label="Smart Cooling"
                        onClick={() => handleItemClick('Smart Cooling')}
                        image={content.image}
                        index={0}
                    />
                    <HeroListItem
                        label="Eco Friendly"
                        onClick={() => handleItemClick('Eco Friendly')}
                        image={content.image}
                        index={1}
                    />
                    <HeroListItem
                        label="Fast Freeze"
                        onClick={() => handleItemClick('Fast Freeze')}
                        image={content.image}
                        index={2}
                    />
                </div>
                <TagLine
                    tagline={content.tagline}
                    tagline_img={content.tagline_img}
                />
            </div>


            {/* Center Absolute Content (Image) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-24">
                <motion.div
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


const HeroListItem = ({ label, onClick, index, image }: HeroListItemProps & { index: number, image: string }) => (
    <motion.button
        onClick={onClick}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
        className=" flex text-left py-4 px-0 border-b border-black/10 hover:text-chocolate transition-colors duration-200 group bg-[#B8784B] items-center"
    >
        <Image
            src={image}
            alt={label}
            width={100}
            height={100}
            className="object-contain"
            priority
        />
        <span className="text-lg font-medium group-hover:pl-4 transition-all duration-300">{label}</span>
    </motion.button>
);

const TagLine = ({ tagline, tagline_img }: { tagline: string, tagline_img: string }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="absolute bottom-12 right-10 lg:right-10 z-10 text-right"
    >
        <div className="max-w-[400px] flex flex-col items-center">
            <p className="text-sm text-gray-500 leading-relaxed font-medium uppercase tracking-widest mb-4">
                {tagline}
            </p>
            <Image
                src={tagline_img}
                alt="Tagline"
                width={150}
                height={100}
                className="object-contain"
                priority
            />
        </div>
    </motion.div>
);