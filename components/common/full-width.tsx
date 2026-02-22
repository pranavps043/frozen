"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ImageType } from "@/types/common";
import { useEffect, useRef } from "react";

interface FullWidthProps {
    backgroundImage: ImageType;
    title: string;
    description: React.ReactNode;
    overlayColor?: string;
    overlayOpacity?: number;
}

export default function FullWidthSection({
    backgroundImage,
    title,
    description,
    overlayColor = "#000000",
    overlayOpacity = 1
}: FullWidthProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="relative w-full min-h-[70vh] flex items-center px-8 lg:px-24 overflow-hidden">
            <div
                className="absolute inset-0 z-1"
                style={{
                    background: overlayColor,
                    opacity: overlayOpacity
                }}
            />

            <div className="absolute inset-0 z-0">

                <Image
                    src={backgroundImage.src}
                    alt={backgroundImage.alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-10 w-full max-w-full lg:max-w-2xl mx-auto text-center">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-josefin-sans font-normal text-[22px] leading-[32px] tracking-normal"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
}