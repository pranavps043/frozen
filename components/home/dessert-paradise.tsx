import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { ButtonType, ImageType } from '@/types/common';
import Button from '../ui/button';
import Image from 'next/image';

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

    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 scale-110">
                <Image
                    src={content.image.src}
                    alt={content.image.alt || content.title}
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>


            {/* Dynamic Overlay from Content */}
            <div 
                className="absolute inset-0 z-0 opacity-10" 
                style={{ background: content.gradients?.from || '#3A2313' }} 
            />


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
                    <Button variant="primary" size='lg' href={content.button.link}>
                        {content.button.label}
                    </Button>
                </motion.div>
            </div>


        </div>
    );
}