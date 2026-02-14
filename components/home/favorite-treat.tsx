
"use client";
import Image from 'next/image';
import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TreatItem {
    id: number;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
    button: {
        label: string;
        link: string;
    };
    particles: string[];
}


export default function FavoriteTreat({ favorite_treats }: { favorite_treats: any }) {
    return (
        <section className="relative min-h-screen bg-[#FDF8F5] flex flex-col justify-center py-20 overflow-hidden ">
            <div className="absolute inset-0 z-0 [background:var(--gradient-golden-mango)] opacity-50" />
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-[#3B2516] mb-6 tracking-tight">{favorite_treats.title}</h2>
                    <p className="text-xl text-[#5D4037]/80 max-w-2xl mx-auto font-medium">
                        {favorite_treats.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex overflow-x-auto md:overflow-visible pb-8 gap-8 snap-x snap-mandatory scrollbar-hide md:justify-center"
                >
                    {favorite_treats.products.map((treat: TreatItem, index: number) => (
                        <FavoriteTreatCard key={index} treat={treat} index={index} />
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
        </section>
    );
}

const ParticleBackground = ({ particles = [], isHovered }: { particles?: string[], isHovered: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!containerRef.current || !particles.length) return;

        // Base animation timeline that always runs
        const timeline = gsap.timeline({ repeat: -1 });

        particlesRef.current.forEach((particle, i) => {
            if (!particle) return;

            const angle = (i / particles.length) * Math.PI * 2;
            const radius = 90 + Math.random() * 50;
            const baseSpeed = 0.3 + Math.random() * 0.3;
            const direction = Math.random() > 0.5 ? 1 : -1;

            gsap.set(particle, {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                opacity: 0.15,
                scale: 0.4,
                rotation: Math.random() * 360
            });

            // Orbital animation using modifiers for smooth continuous movement
            timeline.to(particle, {
                duration: 2, // This doesn't actually matter much with modifiers
                repeat: -1,
                ease: "none",
                modifiers: {
                    x: () => {
                        // Dynamic speed based on hover state
                        const speedMultiplier = isHovered ? 2.5 : 1;
                        const time = Date.now() * 0.0004 * baseSpeed * direction * speedMultiplier;
                        return Math.cos(angle + time) * radius;
                    },
                    y: () => {
                        const speedMultiplier = isHovered ? 2.5 : 1;
                        const time = Date.now() * 0.0004 * baseSpeed * direction * speedMultiplier;
                        return Math.sin(angle + time) * radius;
                    },
                    rotation: (rotate) => {
                        const speedMultiplier = isHovered ? 3 : 1;
                        return parseFloat(rotate) + (baseSpeed * direction * speedMultiplier);
                    },
                    scale: (s) => (parseFloat(s) * (1 + Math.sin(Date.now() * 0.002) * 0.05))
                }
            }, 0);
        });

        if (isHovered) {
            gsap.to(particlesRef.current, {
                opacity: 0.6,
                scale: (i) => 0.8 + Math.random() * 0.4,
                duration: 0.8,
                stagger: {
                    amount: 0.3,
                    from: "center"
                },
                ease: "power2.out"
            });
        } else {
            gsap.to(particlesRef.current, {
                opacity: 0.15,
                scale: 0.4,
                duration: 1.2,
                stagger: 0.1,
                ease: "power1.inOut"
            });
        }
    }, { dependencies: [isHovered, particles], scope: containerRef });

    if (!particles.length) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
            {particles.map((src, i) => (
                <div
                    key={i}
                    ref={el => { particlesRef.current[i] = el; }}
                    className="absolute w-16 h-16"
                >
                    <Image
                        src={src}
                        alt="particle"
                        width={64}
                        height={64}
                        className="object-contain opacity-80"
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{
                y: -20,
                scale: 1.05,
                transition: { type: "spring", bounce: 0.25 }
            }}
            className="relative flex-none w-[85vw] md:w-[320px] snap-center bg-white rounded-2xl shadow-sm border border-[#BC9478]/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#BC9478]/20 mt-20 group
            [background:var(--gradient-chocolate)]
            "
        >
            <CardContent treat={treat} index={index} />
        </motion.div>
    )
}

const CardContent = ({ treat, index }: { treat: TreatItem, index: number }) => {
    const [isCardHovered, setIsCardHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            className="relative h-full"
        >
            <div className='overflow-hidden'>
                <ParticleBackground particles={treat.particles} isHovered={isCardHovered} />
            </div>
            <div className="relative group z-10">
                <div className="absolute h-40 w-40 -bottom-10 left-0 right-0 mx-auto group overflow-hidden">
                    <Image
                        width={treat.image.width}
                        height={treat.image.height}
                        src={treat.image.src}
                        alt={treat.image.alt}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B2516]/20 to-transparent" />
            </div>
            <div className="p-8 mt-2 relative z-10">
                <h3 className="text-2xl font-bold text-[#3B2516] mb-3">{treat.title}</h3>
                <p className="text-[#5D4037]/70 mb-8 line-clamp-2 leading-relaxed">{treat.description}</p>
                <button className="w-full py-4 px-6 bg-[#A23F1C] text-white font-bold rounded-2xl hover:bg-[#8B3518] transition-all duration-300 shadow-lg shadow-[#A23F1C]/20 hover:shadow-xl hover:shadow-[#A23F1C]/30 active:scale-[0.98]">
                    {treat.button.label}
                </button>
            </div>
        </div>
    );
}