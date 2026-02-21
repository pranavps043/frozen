"use client";

import React from 'react';
import {
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';

import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact-us';
    const isRewardsPage = pathname === '/rewards';
    const isAboutPage = pathname === '/about-us';
    const isFranchisePage = pathname === '/franchise';
    const isCheeseCakePage = pathname === '/home/cheese-cake';
    const isVegSaladPage = pathname === '/home/veg-salad';
    const isIceCreamPage = pathname === '/home/ice-cream';
    
    let bgImagePath = '/assets/images/footer-icecream.webp';
    let footerOverlayBackground = '#651243';
    let footerOverlayOpacity = 0.05;

    if (isContactPage) bgImagePath = '/assets/images/contactfooter.webp';
    if (isRewardsPage) bgImagePath = '/assets/images/rewardfooter.webp';
    if (isAboutPage) bgImagePath = '/assets/images/contactfooter.webp';
    if (isFranchisePage) bgImagePath = '/assets/images/contactfooter.webp';
    if (isCheeseCakePage) bgImagePath = '/assets/images/cheesefooter.webp';
    if (isVegSaladPage) {
        bgImagePath = '/assets/images/vegfooter.webp';
        footerOverlayBackground = 'linear-gradient(180deg, #4D8A2A 0%, #A3B75E 50%, #F9E592 100%)';
        footerOverlayOpacity = 0.2;
    }
    
    if (isIceCreamPage) {
        footerOverlayBackground = '#F8CA4A';
        footerOverlayOpacity = 0.1;
    }

    return (
        <>
          
            <footer 
                className="relative w-full text-white font-sans bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImagePath})` }}
            >
                {/* Overlay - Optimized for mobile */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: footerOverlayBackground,
                        opacity: footerOverlayOpacity
                    }}
                />


                {/* Content Container - Optimized padding for mobile */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 md:py-20">
                    {/* Main Grid - Stack on mobile, side by side on larger screens */}
                    <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-8">
                        {/* Column 1: Follow Us - Centered on mobile */}
                        <div className="flex flex-col items-center text-center animate-fade-in-up">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                Follow Us
                            </h3>
                            <div className="flex gap-3 sm:gap-4">
                                {[
                                    { Icon: Facebook, label: 'Facebook' },
                                    { Icon: Linkedin, label: 'LinkedIn' },
                                    { Icon: Instagram, label: 'Instagram' },
                                    { Icon: Twitter, label: 'Twitter' }
                                ].map(({ Icon, label }, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        aria-label={label}
                                        className="group relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full 
                                             bg-[#3a2313] border border-[#d2986e]/30 text-[#d2986e] 
                                             transition-all duration-300 
                                             active:bg-[#d2986e] active:text-[#3a2314] active:scale-95
                                             hover:bg-[#d2986e] hover:text-[#3a2313] hover:scale-110 hover:shadow-[0_0_15px_rgba(210,152,110,0.5)]
                                             touch-manipulation"
                                    >
                                        <Icon size={16} strokeWidth={2} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Contact Us - Centered on mobile */}
                        <div
                            className="flex flex-col items-center text-center animate-fade-in-up"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                Contact Us
                            </h3>
                            <ul className="space-y-3 sm:space-y-4 w-full max-w-xs mx-auto">
                                <li className="w-full">
                                    <a
                                        href="tel:9053287776"
                                        className="group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 
                                             text-[#e6ccb2] hover:text-white transition-colors duration-300
                                             py-2 px-3 rounded-lg active:bg-[#d2986e]/10 touch-manipulation"
                                    >
                                        <div className="p-1.5 sm:p-2 rounded-full bg-[#3a2313]/50 group-hover:bg-[#d2986e] 
                                                  group-hover:text-[#3a2313] transition-all duration-300 shrink-0">
                                            <Phone size={16} />
                                        </div>
                                        <span className="text-base sm:text-lg font-medium tracking-wide break-all">
                                            905-328-7776
                                        </span>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="mailto:info@frozencreamery.ca"
                                        className="group flex items-center justify-center sm:justify-start gap-2 sm:gap-3 
                                             text-[#e6ccb2] hover:text-white transition-colors duration-300
                                             py-2 px-3 rounded-lg active:bg-[#d2986e]/10 touch-manipulation"
                                    >
                                        <div className="p-1.5 sm:p-2 rounded-full bg-[#3a2313]/50 group-hover:bg-[#d2986e] 
                                                  group-hover:text-[#3a2313] transition-all duration-300 shrink-0">
                                            <Mail size={16} />
                                        </div>
                                        <span className="text-base sm:text-lg font-medium tracking-wide break-all">
                                            info@frozencreamery.ca
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Location - Centered on mobile */}
                        <div
                            className="flex flex-col items-center text-center md:items-end animate-fade-in-up"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                Location
                            </h3>
                            <div className="flex items-start justify-center md:justify-end gap-2 sm:gap-3 text-[#e6ccb2] 
                                      max-w-xs w-full px-4 sm:px-0">
                                <div className="p-1.5 sm:p-2 rounded-full bg-[#3a2313]/50 mt-1 shrink-0">
                                    <MapPin size={16} className="text-[#d2986e]" />
                                </div>
                                <address className="not-italic text-base sm:text-lg leading-relaxed text-center md:text-right">
                                    31 Ontario St,<br />
                                    St Catharines,<br />
                                    L2R 5J3
                                </address>
                            </div>
                        </div>
                    </div>

                    {/* Divider - Optimized for mobile */}
                    <div className="mt-12 md:mt-16 mb-6 md:mb-8 flex justify-center">
                        <div className="h-px w-11/12 sm:w-full max-w-4xl bg-gradient-to-r from-transparent via-[#d2986e]/50 to-transparent"></div>
                    </div>

                    {/* Copyright - Mobile optimized text size */}
                    <div className="text-center animate-fade-in px-4">
                        <p className="text-[#d2986e]/60 text-xs sm:text-sm font-light tracking-widest uppercase">
                            © {new Date().getFullYear()} Frozen Creamery. All Rights Reserved
                        </p>
                    </div>
                </div>

                {/* Inline Styles for Animations */}
                <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 20px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-fade-in {
                    animation: fadeInUp 1s ease-out 0.5s forwards;
                    opacity: 0;
                }

                /* Better touch targets for mobile */
                .touch-manipulation {
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                }

                /* Prevent text overflow on small screens */
                .break-all {
                    word-break: break-word;
                }

                /* Responsive icon sizes */
                @media (max-width: 640px) {
                    [class*="sm:"] {
                        font-size: 14px;
                    }
                }
            `}</style>
            </footer>
        </>
    );
};

export default Footer;