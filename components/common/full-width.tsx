"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ImageType } from "@/types/common";

interface FullWidthProps {
    backgroundImage: ImageType;
    title: string;
    description: string;
    overlayColor?: string;
}

export default function FullWidth({ backgroundImage, title, description, overlayColor }: FullWidthProps) {
    return (
        <div className="relative w-full h-[80vh] flex items-center px-8 lg:px-24 overflow-hidden">
            <div className="absolute inset-0 z-1 opacity-50" style={{ background: overlayColor }} />

            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage.src}
                    alt={backgroundImage.alt}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 w-full max-w-full lg:max-w-2xl mx-auto text-center">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-[22px] text-white/90 leading-relaxed mt-4"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}
