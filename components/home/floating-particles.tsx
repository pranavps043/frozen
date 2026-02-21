"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    imageIndex?: number;
    rotation: number;
}

interface FloatingParticlesProps {
    images?: string[];
    count?: number;
}

export const FloatingParticles = ({ images, count = 25 }: FloatingParticlesProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: images
                ? Math.random() * 60 + 40   // Larger for images
                : Math.random() * 4 + 1,    // Small for dots
            duration: Math.random() * 20 + 20,
            delay: Math.random() * -40, // Negative delay to start mid-animation
            imageIndex: images ? i % images.length : undefined,
            rotation: Math.random() * 360,
        }));
        setParticles(newParticles);
    }, [images, count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    initial={{
                        x: `${particle.x}vw`,
                        y: `${particle.y}vh`,
                        opacity: 0,
                        scale: 0.8,
                        rotate: particle.rotation,
                    }}
                    animate={{
                        x: [
                            `${particle.x}vw`,
                            `${particle.x + 2}vw`,
                            `${particle.x - 2}vw`,
                            `${particle.x}vw`,
                        ],
                        y: [
                            `${particle.y}vh`,
                            `${particle.y - 4}vh`,
                            `${particle.y + 2}vh`,
                            `${particle.y}vh`,
                        ],
                        opacity: [0.4, 0.7, 0.7, 0.4],
                        scale: [0.9, 1.1, 1, 0.9],
                        rotate: [particle.rotation, particle.rotation + 15, particle.rotation - 15, particle.rotation],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: particle.size,
                        height: particle.size,
                    }}
                >
                    {images && particle.imageIndex !== undefined ? (
                        <div className="relative w-full h-full opacity-70">
                            <Image
                                src={images[particle.imageIndex]}
                                alt="floating icon"
                                fill
                                className="object-contain filter drop-shadow-lg"
                            />
                        </div>
                    ) : (
                        <div
                            className="w-full h-full rounded-full bg-white blur-[1px]"
                            style={{
                                boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};
