"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundType, ButtonType, ImageType } from '@/types/common';
import Button from '../ui/button';
import Image from 'next/image';

interface FlavorsFeelingsType {
    title: string;
    description: string;
    background: BackgroundType;
    accordion_bg: string;
    accordion_bg_active: string;
    bg_gradient: string;
    accordion: Accordion[];
}

interface Accordion {
    id: number;
    title: string;
    description: string;
    image: ImageType;
    button: ButtonType;
}

// Extracted constant for animation variants
const ANIMATION_VARIANTS = {
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }
};

export default function FlavorsFeelings({ data }: { data: FlavorsFeelingsType }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Memoize click handler to prevent unnecessary re-renders
    const handleAccordionClick = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    // Memoize title splitting to avoid recalculation on each render
    const formattedTitle = useMemo(() => {
        if (!data?.title) return '';
        return data.title;
    }, [data?.title]);

    // Early return if no data
    if (!data?.accordion?.length) {
        return null;
    }

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-8">
            {/* Background gradient with improved performance */}
            <div
                className="absolute inset-0 z-1 opacity-50 will-change-transform"
                style={{ background: `var(${data.bg_gradient})` }}
                aria-hidden="true"
            />

            <div className="relative w-full max-w-7xl z-2 px-4 md:px-6">
                <motion.div
                    {...ANIMATION_VARIANTS.fadeInUp}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-8 md:mb-16"
                >
                    <h2 className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4">
                        {formattedTitle}
                    </h2>
                    <p className="text-xl md:text-[32px] text-black max-w-2xl mx-auto leading-[1.4] md:leading-[45px] tracking-normal text-center fancy-text">
                        {data.description}
                    </p>
                </motion.div>
            </div>

            <div
                className="relative w-full max-w-7xl h-[600px] flex gap-2 z-2 px-0 md:px-2 md:px-6"
                role="tablist"
                aria-label="Flavors and feelings accordion"
            >
                {data.accordion.map((item, index) => (
                    <AccordionItem
                        key={item.id || index}
                        item={item}
                        index={index}
                        isActive={activeIndex === index}
                        onClick={handleAccordionClick}
                        accordionBg={data.accordion_bg}
                        accordionBgActive={data.accordion_bg_active}
                    />
                ))}
            </div>
        </div>
    );
}

// Extracted Accordion Item component for better separation of concerns
const AccordionItem = React.memo(({
    item,
    index,
    isActive,
    onClick,
    accordionBg,
    accordionBgActive
}: {
    item: Accordion;
    index: number;
    isActive: boolean;
    onClick: (index: number) => void;
    accordionBg: string;
    accordionBgActive: string;
}) => {
    // Memoize title words to avoid recalculation
    const titleWords = useMemo(() => item.title.split(' '), [item.title]);

    const handleClick = useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    return (
        <motion.div
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-xl will-change-contents"
            style={{ background: `var(${accordionBg})` }}
            animate={{
                flex: isActive ? 3 : 0.8,
            }}
            transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1]
            }}
            onClick={handleClick}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            {/* Collapsed State - Vertical Title */}
            <AnimatePresence mode="wait">
                {!isActive && (
                    <motion.div
                        key={`collapsed-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: `var(${accordionBg})` }}
                    >
                        <h3
                            className="fancy-text lg:text-2xl text-sm font-serif text-white whitespace-nowrap"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed'
                            }}
                        >
                            {item.title}
                        </h3>
                    </motion.div>
                )}

                {/* Expanded State - Full Content */}
                {isActive && (
                    <motion.div
                        key={`expanded-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="h-full p-4 md:p-5 flex flex-col justify-center gap-4 md:gap-8 overflow-y-auto"
                        style={{ background: `var(${accordionBgActive})` }}
                    >
                        <div className="flex items-start gap-4 md:gap-8 flex-col lg:flex-row">
                            {/* Image Container */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex-shrink-0 w-full lg:w-auto"
                            >
                                <div className="w-full lg:w-[300px] h-[200px] lg:h-[250px] rounded-3xl bg-white/30 backdrop-blur-sm p-3 md:p-4 shadow-lg">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.image.src}
                                            alt={item.image.alt || item.title}
                                            fill
                                            className="object-cover rounded-2xl"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                            priority={index === 0}
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex-1 flex flex-col gap-4 md:gap-6"
                            >
                                <h3 className="lg:text-5xl text-2xl font-serif italic text-gray-800 leading-tight">
                                    {titleWords.map((word, i) => (
                                        <React.Fragment key={i}>
                                            {word}
                                            {i < titleWords.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </h3>

                                <p className="lg:text-lg text-sm text-gray-700 leading-relaxed max-w-xl">
                                    {item.description}
                                </p>

                                {item.button?.label && (
                                    <div className="w-full md:w-1/2">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            href={item.button.link}
                                        >
                                            {item.button.label}
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

AccordionItem.displayName = 'AccordionItem';