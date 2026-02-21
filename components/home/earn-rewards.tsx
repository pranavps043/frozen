

"use client";
import React from 'react';

import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import GradientAnimator from '../utl/grainient';
import { ButtonType, ImageType } from '@/types/common';
import Image from 'next/image';
import { FloatingParticles } from './floating-particles';
import Button from '../ui/button';

gsap.registerPlugin(ScrollTrigger);

interface EarnRewardsType {
    title: string
    description: string
    button: ButtonType,
    image: ImageType,
    subtitle: string,
    pre_title: string,
    particles: string[],
    bg_gradient: string,
    opacity?: number
}


export default function EarnRewards({ earn_rewards }: { earn_rewards: EarnRewardsType }) {
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);


    return (
        <div className="relative h-full w-full overflow-hidden flex items-center justify-center overflow-hidden">
            <div
                ref={bgRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
                style={{
                    backgroundImage: "url('/assets/images/about-us-bg.webp')",
                }}
            />
            <div 
                className="absolute inset-0" 
                style={{ opacity: earn_rewards.opacity ? earn_rewards.opacity / 100 : 1 }}
            >
                <GradientAnimator
                    gradientFrom={earn_rewards.bg_gradient.startsWith('--') ? `var(${earn_rewards.bg_gradient})` : earn_rewards.bg_gradient}
                    gradientTo={earn_rewards.bg_gradient.startsWith('--') ? `var(${earn_rewards.bg_gradient})` : earn_rewards.bg_gradient}
                />
            </div>


            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            <FloatingParticles key={`particles-${earn_rewards.particles}`} images={earn_rewards.particles} count={14} />
            {/* Centered Content Container */}
            <div ref={contentRef} className="relative z-10 flex flex-col lg:flex-row items-center px-4 text-center text-white max-w-7xl">
                <div className="w-full lg:w-1/2">

                    <div className="relative">
                        <Image
                            src={earn_rewards.image.src}
                            alt={earn_rewards.image.alt}
                            width={earn_rewards.image.width}
                            height={earn_rewards.image.height}
                        />


                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    {/* Pre-title */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-peach-frost"
                    >
                        {earn_rewards.pre_title}
                    </motion.span>

                    {/* Title */}
                    <h2 className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4">

                        {earn_rewards.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-5 lg:text-lg text-base font-normal text-black sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-semibold text-white lg:text-black">
                        {earn_rewards.subtitle}
                    </p>
                    <p className="mb-5 lg:text-lg text-base font-normal text-black sm:text-xl md:text-2xl max-w-2xl leading-relaxed text-white lg:text-black">
                        {earn_rewards.description}
                    </p>

                    {/* Interactive Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="primary" size="lg" href={earn_rewards.button.link}>
                            {earn_rewards.button.label}
                        </Button>

                    </motion.div>
                </div>

            </div>


        </div>
    );
}