"use client";

import { motion } from 'motion/react';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <div className="relative h-full w-full flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-1">
                <Image
                    src="/assets/images/about-us-bg.webp"
                    alt="About Us Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 z-1 opacity-50" style={{ background: 'var(--gradient-chocolate)' }} />

            </div>
            <div
                className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full px-8 lg:px-24"
            >

                <div className="w-full lg:w-1/2 overflow-hidden rounded-xl max-w-[600px] max-h-[450px]">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full h-full"
                    >
                        <Image
                            width={800}
                            height={600}
                            src="/assets/images/about-image.webp"
                            alt="About Frozen"
                            className="w-full h-auto rounded-xl object-cover shadow-2xl"
                        />
                    </motion.div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-tighter"
                        >
                            About Our Vision
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-white/80 mb-8 leading-relaxed"
                        >
                            We are dedicated to providing the highest quality service in the industry. Our team of experts works tirelessly to ensure that every project we undertake meets our rigorous standards of excellence and innovation.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black font-bold hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm rounded-full"
                        >
                            Explore More
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;

