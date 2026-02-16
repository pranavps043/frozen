

"use client";

import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { ButtonType, ImageType } from '@/types/common';
import GradientAnimator from '../utl/grainient';
import Button from '../ui/button';

gsap.registerPlugin(ScrollTrigger);

interface DessertParadiseType {
    title: string
    description: string
    button: ButtonType,
    image: ImageType
    gradients: {
        from: string,
        to: string
    }
}


export default function DessertParadise({ content }: { content: DessertParadiseType }) {

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
                <GradientAnimator
                    gradientFrom={content.gradients.from}
                    gradientTo={content.gradients.to}
                />
            </div>


            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />


            {/* Centered Content Container */}
            <div ref={contentRef} className="relative z-10 flex flex-col items-center px-4 text-center text-white max-w-5xl">
                {/* Pre-title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4"
                >
                    {content.title}
                </motion.h2>


                {/* Description */}
                <p className="mb-12 text-lg font-light text-gray-200 sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
                    {content.description}
                </p>

                {/* Interactive Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button variant="primary" size='lg'>
                        {content.button.label}
                    </Button>
                </motion.div>
            </div>


        </div>
    );
}