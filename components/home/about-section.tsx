"use client";

import { ButtonType, ImageType } from '@/types/common';
import { motion } from 'motion/react';
import Image from 'next/image';
import Button from '../ui/button';

interface AboutSectionProps {
    title: string
    heading: string
    description: string
    body: string
    button: ButtonType
    image: ImageType
    bg_image: string
    bg_gradient: string
}

const AboutSection = ({ data }: { data: AboutSectionProps }) => {
    return (
        <div className="relative h-full w-full flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-1">
                <Image
                    src={data.bg_image}
                    alt={data.title}
                    fill
                    className="object-cover blur-xs"
                    priority
                />
                <div className="absolute inset-0 z-1 opacity-50" style={{ background: `var(${data.bg_gradient})` }} />

            </div>
            <div
                className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full px-8 lg:px-24"
            >

                <div className="w-full lg:w-1/2 overflow-hidden rounded-xl max-w-[250px] lg:max-w-[450px] max-h-[450px]">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full h-full"
                    >
                        <Image
                            width={data.image.width}
                            height={data.image.height}
                            src={data.image.src}
                            alt={data.image.alt}
                            className="w-full h-auto  rounded-xl object-cover shadow-2xl"
                        />
                    </motion.div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-playfair font-bold text-[22px] md:font-pacifico md:font-normal md:text-[48px] my-4"
                        >
                            {data.title}
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-montserrat font-semibold text-[14px] md:text-[32px] pb-3"
                        >
                            {data.heading}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-zinc-900/90 mb-8 leading-relaxed font-bold"
                        >
                            {data.description}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-zinc-900 mb-8 leading-relaxed"
                        >
                            {data.body}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className=" transition-colors uppercase tracking-widest w-1/2"
                        >
                            <Button fullWidth variant="primary" size="sm" href={data.button.link}>
                                {data.button.label}
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;

