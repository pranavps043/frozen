"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function Navigation() {
    const navLinks = [
        { name: "Menu", href: "/menu" },
        { name: "Franchise", href: "/franchise" },
        { name: "Gallery", href: "/gallery" },
        { name: "About Us", href: "/about-us" },
        { name: "Rewards", href: "/rewards" },
        { name: "Contact Us", href: "/contact-us" },
    ];

    return (
        <nav className="fixed top-[50px] left-0 right-0 w-[1280px] h-[63px] bg-nav-bg rounded-3xl border border-[#BC9478]/30 flex items-center px-12 z-50 shadow-sm mx-auto">
            <div className="flex w-full items-center justify-between">
                {/* Left Links */}
                <div className="flex gap-14 items-center flex-1">
                    {navLinks.slice(0, 3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#3B2516] text-[18px] font-medium hover:text-[#5D4037] transition-colors uppercase tracking-wider font-sans"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Animated Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="flex justify-center items-center w-[180px]"
                >
                    <Link href="/" className="mt-2 block hover:scale-105 transition-transform">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Logo"
                            width={148}
                            height={77}
                            className="object-contain"
                            priority
                        />
                    </Link>
                </motion.div>

                {/* Right Links */}
                <div className="flex gap-14 items-center flex-1 justify-end">
                    {navLinks.slice(3).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[#3B2516] text-[18px] font-medium hover:text-[#5D4037] transition-colors uppercase tracking-wider font-sans"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}