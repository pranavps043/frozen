"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ImageType } from "@/types/common";
import { useEffect, useRef } from "react";

interface FullWidthProps {
    backgroundImage?: ImageType;
    backgroundVideo?: {
        src: string;
        poster?: string;
    };
    title: string;
    description: string;
    overlayColor?: string;
    overlayOpacity?: number;
}

export default function FullWidth({
    backgroundImage,
    backgroundVideo,
    title,
    description,
    overlayColor = "#000000",
    overlayOpacity = 0.4
}: FullWidthProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && backgroundVideo) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay was prevented:", error);
            });
        }
    }, [backgroundVideo]);

    return (
        <div className="relative w-full h-[80vh] flex items-center px-8 lg:px-24 overflow-hidden">
            <div
                className="absolute inset-0 z-1"
                style={{
                    background: overlayColor,
                    opacity: overlayOpacity
                }}
            />

            <div className="absolute inset-0 z-0">
                {backgroundVideo ? (
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={backgroundVideo.poster}
                    >
                        <source src={backgroundVideo.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : backgroundImage && (
                    <Image
                        src={backgroundImage.src}
                        alt={backgroundImage.alt}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
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