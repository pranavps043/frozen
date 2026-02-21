"use client";

import { motion } from "motion/react";
import { FloatingParticles } from "@/components/home/floating-particles";
import db from "@/data/gallery.json";

export default function GalleryPage() {
    return (
        <main className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#651243] to-[#1a0a1a]">
            <FloatingParticles images={db.comingSoon.particleImages} count={15} />
            
            <div className="relative z-10 text-center px-8 max-w-3xl">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl lg:text-8xl font-bold text-white mb-4 font-primary"
                >
                    {db.comingSoon.title}
                </motion.h1>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                    className="inline-block"
                >
                    <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xl font-medium mb-8 border border-white/30">
                        {db.comingSoon.subtitle}
                    </span>
                </motion.div>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-xl lg:text-2xl text-white/80 leading-relaxed"
                >
                    {db.comingSoon.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-12"
                >
                    <div className="flex items-center justify-center gap-1">
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
