"use client";
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundType, ButtonType, ImageType } from '@/types/common';
import Button from '../ui/button';
import Image from 'next/image';

interface FlavorsFeelingsType {
    title: string;
    description: string;
    background?: BackgroundType;
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

const ANIMATION_VARIANTS = {
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
} as const;

export default function FlavorsFeelings({ data }: { data: FlavorsFeelingsType }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleAccordionClick = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const formattedTitle = useMemo(() => {
        if (!data?.title) return '';
        return data.title;
    }, [data?.title]);

    if (!data?.accordion?.length) {
        return null;
    }

    return (
        <div className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-8">
            <div
                className="absolute inset-0 z-[1] opacity-50"
                style={{ background: `var(--theme-gradient)` }}
                aria-hidden="true"
            />

            <div className="relative w-full max-w-7xl z-[2] px-4 md:px-6">
                <motion.div
                    {...ANIMATION_VARIANTS.fadeInUp}
                    viewport={{ once: true, margin: "-20px" }}
                    className="text-center mb-8 md:mb-16"
                >
                    <h2 className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4 text-black">
                        {formattedTitle}
                    </h2>
                    <p className="text-xl md:text-[32px] text-black max-w-2xl mx-auto leading-[1.4] md:leading-[45px] tracking-normal text-center fancy-text">
                        {data.description}
                    </p>
                </motion.div>
            </div>

            <div
                className="relative w-full max-w-7xl z-[2] px-0 md:px-6
                    flex flex-col md:flex-row 
                    gap-2 md:gap-2
                    md:min-h-[60vh]"
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
                        accordionBg="--accordion-bg"
                        accordionBgActive="--accordion-bg-active"
                    />
                ))}
            </div>
        </div>
    );
}

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
    const titleWords = useMemo(() => item.title.split(' '), [item.title]);

    const handleClick = useCallback(() => {
        onClick(index);
    }, [onClick, index]);

    return (
        <motion.div
            layout
            className={`
                relative cursor-pointer w-full overflow-hidden rounded-3xl shadow-lg
                ${isActive
                    ? 'flex-[3] h-auto min-h-[400px]'
                    : 'flex-none md:flex-[0.5] h-[60px] md:h-auto'
                }
            `}
            style={{
                background: `var(${isActive ? accordionBgActive : accordionBg})`,
            }}
            transition={{
                layout: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8
                }
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
            <AnimatePresence mode="wait">
                {/* Collapsed State */}
                {!isActive && (
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: `var(${accordionBg})` }}
                    >
                        {/* Mobile: Horizontal text */}
                        <h3 className="fancy-text text-lg font-serif text-white md:hidden px-4 text-center">
                            {item.title}
                        </h3>

                        {/* Desktop: Vertical text */}
                        <h3
                            className="fancy-text lg:text-2xl text-sm font-serif text-white whitespace-nowrap hidden md:block"
                            style={{
                                writingMode: 'vertical-rl',
                                textOrientation: 'mixed'
                            }}
                        >
                            {item.title}
                        </h3>
                    </motion.div>
                )}

                {/* Expanded State */}
                {isActive && (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative md:absolute md:inset-0 p-4 md:p-8 flex flex-col justify-center h-full"
                        style={{ background: `var(${accordionBgActive})` }}
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 lg:gap-8 h-full">
                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="w-full h-[200px] md:w-[250px] md:h-[200px] lg:w-[300px] lg:h-[300px] relative flex-shrink-0"
                            >
                                <Image
                                    src={item.image.src}
                                    alt={item.image.alt || item.title}
                                    fill
                                    className="object-cover rounded-2xl"
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    priority={index === 0}
                                />
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.2,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="flex-1 flex flex-col gap-3 md:gap-4 lg:gap-6 min-w-0"
                            >
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-black">
                                    {titleWords.map((word, i) => (
                                        <React.Fragment key={i}>
                                            {word}
                                            {i < titleWords.length - 1 && <br className="hidden md:block" />}
                                            {i < titleWords.length - 1 && <span className="md:hidden"> </span>}
                                        </React.Fragment>
                                    ))}
                                </h3>

                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    {item.description}
                                </p>

                                {item.button?.label && (
                                    <div className="w-full md:w-auto">
                                        <Button
                                            variant="primary"
                                            size="md"
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