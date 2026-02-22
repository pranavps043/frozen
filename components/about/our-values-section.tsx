"use client";

import { motion, Variants } from 'motion/react';


const titleVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface OurValuesSectionProps {
    content: {
        title: string;
        values: {
            id: number;
            title: string;
            description: string;
            icon: string;
        }[];
    };
}

export default function OurValuesSection({ content }: OurValuesSectionProps) {
    return (
        <section className="min-h-screen w-full bg-[#E8B4D9] py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={titleVariants}
                className="mb-16 text-center"
            >
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#5c1a3d] tracking-wide drop-shadow-sm">
                    {content.title}
                </h2>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full"
            >
                {content.values.map((value) => (
                    <motion.div
                        key={value.id}
                        variants={itemVariants}
                        className="group relative bg-[#F3E5F5] rounded-3xl p-8 md:p-10 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 border border-white/50 border hover:border-[#651243] hover:border-2"
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 rounded-full duration-300">
                                <img className='h-30 w-30' src={value.icon} alt={value.title} width={50} height={50} />
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#5c1a3d] font-serif">
                                {value.title}
                            </h3>
                            <p className="text-[#5c1a3d]/80 leading-relaxed text-sm md:text-base font-medium">
                                {value.description}
                            </p>
                        </div>

                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}