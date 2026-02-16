"use client";
import Logo from "./logo";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Navigation() {
    const [hidden, setHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        const twoSectionsHeight = window.innerHeight * 1.5;

        if (latest > previous && latest > twoSectionsHeight) {
            setHidden(true);
        } else if (latest + 30 < previous) {
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -120, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-[20px] left-0 right-0 w-full max-w-[1280px] h-[63px] bg-nav-bg rounded-3xl border border-[#BC9478]/30 items-center px-6 md:px-8 lg:px-12 z-50 shadow-sm mx-auto hidden md:flex isolate aspect-video bg-white/40 shadow-lg ring-1 ring-black/5"
                style={{ margin: '50px auto 0' }}
            >
                <div className="flex w-full items-center justify-between">
                    {/* Left Links */}
                    <div className="flex gap-8 xl:gap-14 items-center flex-1">
                        {navLinks.slice(0, 3).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[#3B2516] text-[16px] xl:text-[18px] font-medium hover:text-[#5D4037] transition-colors uppercase tracking-wider font-sans whitespace-nowrap"
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
                        className="flex justify-center items-center w-[140px] lg:w-[180px] relative h-[100px]"
                    >
                        <Link href="/" className="mt-2 block hover:scale-105 transition-transform absolute bottom-0">
                            <Logo />
                        </Link>
                    </motion.div>

                    {/* Right Links */}
                    <div className="flex gap-8 xl:gap-14 items-center flex-1 justify-end">
                        {navLinks.slice(3).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[#3B2516] text-[16px] xl:text-[18px] font-medium hover:text-[#5D4037] transition-colors uppercase tracking-wider font-sans whitespace-nowrap"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation - Just Hamburger and Logo */}
            <motion.div
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -120, opacity: 0 }
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-[20px] left-4 right-4 z-50 md:hidden"
            >
                <div className="flex items-center justify-end">
                    {/* Hamburger Menu Button */}
                    <motion.button
                        onClick={toggleMobileMenu}
                        className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center bg-grey-500/20 rounded-full border border-[#BC9478]/30 shadow-sm"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="w-7 h-[3px] bg-white rounded-full"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-7 h-[3px] bg-white rounded-full"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="w-7 h-[3px] bg-white rounded-full"
                        />
                    </motion.button>



                    {/* Centered Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.1,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                        className="absolute left-1/2 -translate-x-1/2 z-50"
                    >
                        <Link href="/" className="block hover:scale-105 transition-transform">
                            <div className="w-[90px]">
                                <Logo />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Invisible spacer for balance */}
                    <div className="w-10 h-10"></div>
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#FFF8F0] shadow-2xl z-50 md:hidden overflow-y-auto"
                        >
                            {/* Menu Header with Logo */}
                            <div className="flex flex-col items-center justify-center py-8 px-6 border-b border-[#BC9478]/20">
                                <div className="w-[120px] mb-4">
                                    <Logo />
                                </div>
                                <button
                                    onClick={closeMobileMenu}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#BC9478]/10 hover:bg-[#BC9478]/20 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#3B2516"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Menu Links */}
                            <div className="px-6 py-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            className="block py-4 text-[#3B2516] text-[18px] font-medium hover:text-[#5D4037] hover:translate-x-2 transition-all uppercase tracking-wider font-sans border-b border-[#BC9478]/20 last:border-b-0"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}