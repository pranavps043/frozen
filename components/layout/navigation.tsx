"use client";
import Logo from "./logo";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function Navigation() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Calculate viewport height sections (adjust multiplier as needed)
        const twoSectionsHeight = window.innerHeight * 1.5; // 1.5 viewports = "two sections"

        if (latest > previous && latest > twoSectionsHeight) {
            // Scrolling down & past two sections
            setHidden(true);
        } else if (latest + 30 < previous) {
            // Scrolling up
            setHidden(false);
        }
    });

    const navLinks = [
        { name: "Menu", href: "/menu" },
        { name: "Franchise", href: "/franchise" },
        { name: "Gallery", href: "/gallery" },
        { name: "About Us", href: "/about-us" },
        { name: "Rewards", href: "/rewards" },
        { name: "Contact Us", href: "/contact-us" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -120, opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-[50px] left-0 right-0 w-[1280px] h-[63px] bg-nav-bg rounded-3xl border border-[#BC9478]/30 flex items-center px-12 z-50 shadow-sm mx-auto"
        >
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
                        duration: 0.10,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="flex justify-center items-center w-[180px] relative h-[100px]"
                >
                    <Link href="/" className="mt-2 block hover:scale-105 transition-transform absolute bottom-0">
                        <Logo />
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
        </motion.nav>
    );
}