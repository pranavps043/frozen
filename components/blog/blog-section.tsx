"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ImageType } from "@/types/common";

interface BlogSectionProps {
    title: string;
    description: string;
    image: ImageType;
    index: number;
}

export default function BlogSection({ title, description, image, index }: BlogSectionProps) {
    const isEven = index % 2 === 0;

    return (
        <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-[var(--pink-pearl)]">
            <div className="max-w-7xl mx-auto px-8 lg:px-24">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-[var(--dark-raspberry)] text-3xl lg:text-4xl font-bold mb-6 font-primary leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
