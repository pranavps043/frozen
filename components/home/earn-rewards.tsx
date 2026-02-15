

"use client";
import React from 'react';

import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import GradientAnimator from '../utl/grainient';
import { ButtonType, ImageType } from '@/types/common';
import Image from 'next/image';
import { FloatingParticles } from './floating-particles';

gsap.registerPlugin(ScrollTrigger);

interface EarnRewardsType {
    title: string
    description: string
    button: ButtonType,
    image: ImageType,
    particles: string[]
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
            <div className="absolute inset-0 " >
                <GradientAnimator />
            </div>


            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

            <FloatingParticles key={`particles-${earn_rewards.particles}`} images={earn_rewards.particles} count={14} />
            {/* Centered Content Container */}
            <div ref={contentRef} className="relative z-10 flex flex-row items-center px-4 text-center text-white max-w-7xl">
                <div className="w-1/2">

                    <div className="relative">
                        <Image
                            src={earn_rewards.image.src}
                            alt={earn_rewards.image.alt}
                            width={earn_rewards.image.width}
                            height={earn_rewards.image.height}
                        />


                    </div>
                </div>
                <div className="w-1/2">
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
                    <h2 className="mb-8 text-5xl font-bold tracking-tight font-primary leading-none">
                        {earn_rewards.title.split(' ').map((word, i) => (
                            <React.Fragment key={i}>
                                {word}{' '}
                                {i === 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>

                    {/* Description */}
                    <p className="mb-12 text-lg font-light text-gray-200 sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
                        {earn_rewards.description}
                    </p>

                    {/* Interactive Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-black transition-all hover:bg-white/90 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.6)]">
                            <span className="font-bold uppercase tracking-widest text-sm">{earn_rewards.button.label}</span>

                        </button>
                    </motion.div>
                </div>

            </div>


        </div>
    );
}