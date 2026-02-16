
"use client";
import Image from 'next/image';
import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../ui/button';

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


export default function FavoriteTreat({ data }: { data: any }) {
    return (
        <div className="relative h-full bg-[#FDF8F5] flex flex-col justify-center py-20 overflow-hidden ">
            <div className="absolute inset-0 z-0 opacity-80" style={{ background: `var(${data.bg_gradient})` }} />
            <div className="container mx-auto px-4 max-w-7xl relative z-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-display text-white mb-6 tracking-tight">{data.title}</h2>
                    <p className="text-xl text-black max-w-2xl mx-auto font-medium">
                        {data.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex overflow-x-auto md:overflow-visible pb-8 gap-8 snap-x snap-mandatory scrollbar-hide md:justify-center"
                >
                    {data.products.map((treat: TreatItem, index: number) => (
                        <FavoriteTreatCard bg={data.card_bg} key={index} treat={treat} index={index} active_bg={data.bg_gradient} />
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


const FavoriteTreatCard = ({ bg, treat, index, active_bg }: { bg: string, treat: TreatItem, index: number, active_bg: string }) => {
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
            className="relative flex-none w-[85vw] md:w-[320px] snap-center bg-white rounded-2xl shadow-sm border border-[#BC9478]/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#BC9478]/20 mt-20 group"
            style={{ background: bg }}
        >
            <CardContent bg={bg} treat={treat} index={index} active_bg={active_bg} />
        </motion.div>
    )
}

const CardContent = ({ bg, treat, index, active_bg }: { bg: string, treat: TreatItem, index: number, active_bg: string }) => {
    const [isCardHovered, setIsCardHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            className="relative h-full rounded-2xl transition-all duration-500"
            style={{ background: isCardHovered ? active_bg : bg }}
        >
            <div className={`overflow-hidden ${isCardHovered ? 'active' : ''}`}>
                <ParticleBackground particles={treat.particles} isHovered={isCardHovered} />
            </div>
            <div
                className="relative group z-10"
            >
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
            <div className="p-8 mt-2 relative z-10"
            >
                <h3 className="text-2xl font-bold text-[#3B2516] mb-3">{treat.title}</h3>
                <p className="text-[#5D4037]/70 mb-8 line-clamp-2 leading-relaxed">{treat.description}</p>
                <Button variant="primary" size="sm" fullWidth={true}>
                    {treat.button.label}
                </Button>
            </div>
        </div>
    );
}