"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundType, ButtonType, ImageType } from '@/types/common';

interface FlavorsFeelingsType {
    title: string
    description: string
    background: BackgroundType
    accordion_bg: string
    accordion_bg_active: string
    accordion: Accordion[]
}

interface Accordion {
    id: number
    title: string
    description: string
    image: ImageType
    button: ButtonType
}


export default function FlavorsFeelings({ data }: { data: FlavorsFeelingsType }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-full w-full bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center p-8">
            <h1>{activeIndex} ddd  </h1>
            <div className="w-full max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-[#3B2516] mb-6 tracking-tight">{data.title}</h2>
                    <p className="text-xl text-[#5D4037]/80 max-w-2xl mx-auto font-medium">
                        {data.description}
                    </p>
                </motion.div>
            </div>

            <div className="w-full max-w-7xl h-[600px] flex gap-4">

                {data.accordion.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="relative rounded-3xl overflow-hidden cursor-pointer shadow-xl"
                        style={{ background: `var(${data.accordion_bg})` }}
                        // style={{ backgroundColor: item.color }}
                        animate={{
                            flex: activeIndex === index ? 3 : 0.8,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.32, 0.72, 0, 1]
                        }}
                        onClick={() => setActiveIndex(index)}
                    >
                        {/* Collapsed State - Vertical Title */}
                        <AnimatePresence>
                            {activeIndex !== index && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`absolute inset-0 flex items-center justify-center bg-[var(${data.accordion_bg})]`}
                                >
                                    <h2
                                        className="text-2xl font-serif text-gray-800 whitespace-nowrap"
                                        style={{
                                            writingMode: 'vertical-rl',
                                            textOrientation: 'mixed'
                                        }}
                                    >
                                        {item.title}
                                    </h2>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Expanded State - Full Content */}
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className="h-full p-5 flex flex-col justify-center gap-8"
                                    style={{ background: `var(${data.accordion_bg_active})` }}
                                >
                                    <div className="flex items-start gap-8">
                                        {/* Image Container */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="flex-shrink-0"
                                        >
                                            <div className="w-64 h-64 rounded-3xl bg-white/30 backdrop-blur-sm p-4 shadow-lg">
                                                <img
                                                    src={item.image.src}
                                                    alt={item.image.alt}
                                                    className="w-full h-full object-cover rounded-2xl"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Text Content */}
                                        <motion.div
                                            initial={{ x: 20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="flex-1 flex flex-col gap-6"
                                        >
                                            <h1 className="text-5xl font-serif italic text-gray-800 leading-tight">
                                                {item.title.split(' ').map((word, i) => (
                                                    <React.Fragment key={i}>
                                                        {word}
                                                        {i < item.title.split(' ').length - 1 && <br />}
                                                    </React.Fragment>
                                                ))}
                                            </h1>

                                            <p className="text-lg text-gray-700 leading-relaxed max-w-xl">
                                                {item.description}
                                            </p>

                                            <button className="self-start px-8 py-4 bg-gray-800 text-white rounded-full text-lg font-medium hover:bg-gray-900 transition-colors shadow-lg">
                                                {item.button.label}
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}