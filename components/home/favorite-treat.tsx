"use client";
import Image from 'next/image';
import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../ui/button';

import { TreatItem, ImageType } from '@/types/common';

export default function FavoriteTreat({ data }: { 
    data: {
        title: string;
        description: string;
        bg_gradient: string;
        products: TreatItem[];
        image?: ImageType;
        bg_gradient_active?: string;
        card_bg?: string;
    } 
}) {
    return (
        <div
            className="relative h-full bg-[#FDF8F5] flex flex-col justify-center py-12 sm:py-16 md:py-20 overflow-hidden"
            style={
                {
                    '--card-bg': `var(${data.bg_gradient})`,
                    '--card-bg-hover': `var(${data.bg_gradient})`,
                } as React.CSSProperties
            }
        >
            <div className="absolute inset-0 z-0 opacity-80" style={{ background: `var(${data.bg_gradient})` }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-2">
                {/* Header Section - Mobile optimized */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <h2 className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4">
                        {data.title}
                    </h2>
                    <p className="font-montserrat font-semibold text-[14px] md:text-[18px] pb-3">
                        {data.description}
                    </p>
                </motion.div>

                {/* Cards Container - Mobile optimized scrolling */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex overflow-x-auto md:overflow-visible pb-6 sm:pb-8 gap-4 sm:gap-6 md:gap-8 
                             snap-x snap-mandatory scrollbar-hide md:justify-center 
                             -mx-4 sm:-mx-6 px-4 sm:px-6 md:mx-0 md:px-0"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {data.products.map((treat: TreatItem, index: number) => (
                        <FavoriteTreatCard key={treat.id || index} treat={treat} index={index} />
                    ))}
                </motion.div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

const ParticleBackground = ({ particles = [], isHovered }: { particles?: string[], isHovered: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        if (!containerRef.current || !particles.length) return;

        // Disable particles on mobile for better performance
        if (isMobile) {
            particlesRef.current.forEach((particle) => {
                if (particle) {
                    gsap.set(particle, { opacity: 0 });
                }
            });
            return;
        }

        // Base animation timeline that always runs
        const timeline = gsap.timeline({ repeat: -1 });

        particlesRef.current.forEach((particle, i) => {
            if (!particle) return;

            const angle = (i / particles.length) * Math.PI * 2;
            // Smaller radius on mobile if not disabled
            const radius = (isMobile ? 40 : 90) + Math.random() * (isMobile ? 30 : 50);
            const baseSpeed = (isMobile ? 0.2 : 0.3) + Math.random() * (isMobile ? 0.2 : 0.3);
            const direction = Math.random() > 0.5 ? 1 : -1;

            gsap.set(particle, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: isMobile ? 0.1 : 0.15,
                scale: isMobile ? 0.25 : 0.4,
                rotation: Math.random() * 360
            });

            // Orbital animation using modifiers for smooth continuous movement
            timeline.to(particle, {
                duration: 2,
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: () => {
                        const speedMultiplier = isHovered ? (isMobile ? 1.5 : 2.5) : 1;
                        const time = Date.now() * 0.0004 * baseSpeed * direction * speedMultiplier;
                        return Math.cos(angle + time) * radius;
                    },
                    y: () => {
                        const speedMultiplier = isHovered ? (isMobile ? 1.5 : 2.5) : 1;
                        const time = Date.now() * 0.0004 * baseSpeed * direction * speedMultiplier;
                        return Math.sin(angle + time) * radius;
                    },
                    rotation: (rotate) => {
                        const speedMultiplier = isHovered ? (isMobile ? 2 : 3) : 1;
                        return parseFloat(rotate) + (baseSpeed * direction * speedMultiplier);
                    }
                }
            }, 0);
        });

        if (isHovered && !isMobile) {
            gsap.to(particlesRef.current, {
                opacity: 0.6,
                scale: () => 0.8 + Math.random() * 0.4,
                duration: 0.8,
                stagger: {
                    amount: 0.3,
                    from: "center"
                },
                ease: "power2.out"
            });
        } else if (!isMobile) {
            gsap.to(particlesRef.current, {
                opacity: 0.15,
                scale: 0.4,
                duration: 1.2,
                stagger: 0.1,
                ease: "power1.inOut"
            });
        }
    }, { dependencies: [isHovered, particles, isMobile], scope: containerRef });

    if (!particles.length || isMobile) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
            {particles.map((src, i) => (
                <div
                    key={i}
                    ref={el => { particlesRef.current[i] = el; }}
                    className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                >
                    <Image
                        src={src}
                        alt="particle"
                        width={isMobile ? 48 : 64}
                        height={isMobile ? 48 : 64}
                        className="object-contain opacity-80"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};

const FavoriteTreatCard = ({ treat, index }: { treat: TreatItem, index: number }) => {
    return (
        <motion.div
            key={treat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: Math.min(0.1 * index, 0.3) }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", bounce: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative flex-none w-[280px] sm:w-[300px] md:w-[320px] 
                       snap-center rounded-2xl shadow-sm border border-[#BC9478]/10 
                       transition-all duration-300 hover:shadow-2xl hover:shadow-[#BC9478]/20 
                       mt-16 sm:mt-20 group bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)]
                       touch-manipulation"
            style={{
                '--card-bg': `var(--card-bg-hover)`,
                '--card-bg-hover': `var(--card-bg-hover)`,
            } as React.CSSProperties}
        >
            <CardContent treat={treat} index={index} />
        </motion.div>
    );
};

const CardContent = ({ treat, index }: { treat: TreatItem, index: number }) => {
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle touch events for mobile
    const handleTouchStart = () => {
        if (isMobile) {
            setIsCardHovered(true);
        }
    };

    const handleTouchEnd = () => {
        if (isMobile) {
            setTimeout(() => setIsCardHovered(false), 300);
        }
    };

    return (
        <div
            onMouseEnter={() => !isMobile && setIsCardHovered(true)}
            onMouseLeave={() => !isMobile && setIsCardHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-full rounded-2xl transition-all duration-500 overflow-visible isolate bg-white/20 shadow-lg ring-1 ring-black/5"
        >
            <ParticleBackground particles={treat.particles} isHovered={isCardHovered} />

            {/* Image Container - Fixed to pop out from top */}
            <div className="relative z-20">
                <div className="absolute left-1/2 transform -translate-x-1/2 
                              -top-16 sm:-top-20 md:-top-24
                              w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40
                              transition-all duration-300 
                              group-hover:scale-110 group-hover:-top-20 sm:group-hover:-top-24 md:group-hover:-top-28">
                    <div className="relative w-full h-full">
                        <Image
                            src={treat.image.src}
                            alt={treat.image.alt}
                            fill
                            className="object-contain drop-shadow-xl"
                            sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                            priority={index < 3}
                            onError={() => setImageError(true)}
                        />
                        {/* Fallback div in case image fails to load */}
                        {imageError && (
                            <div className="w-full h-full bg-[#BC9478] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                🍦
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Content with top padding to accommodate popping image */}
            <div className="pt-20 sm:pt-24 md:pt-28 p-6 sm:p-7 md:p-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-[#3B2516] mb-2 sm:mb-3 line-clamp-2 text-center sm:text-left playfair-display">
                    {treat.title}
                </h3>
                <p className="text-sm sm:text-base text-[#5D4037]/70 mb-4 sm:mb-6 md:mb-8 
                           line-clamp-2 sm:line-clamp-3 leading-relaxed text-center sm:text-left">
                    {treat.description}
                </p>
                <Button
                    variant="primary"
                    size={isMobile ? "sm" : "md"}
                    fullWidth={true}
                    className="touch-manipulation"
                    href={treat.button.link}
                >
                    {treat.button.label}
                </Button>
            </div>
        </div>
    );
};