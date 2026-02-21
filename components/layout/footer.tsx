'use client';
import {
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const footerStyles = {
    default: {
        bg: 'bg-[#651243]',
        image: '/assets/images/footer/footer-bg-default.webp',
        icon_color: '#651243'
    },
    'cheese-cake': {
        bg: 'bg-gradient-to-b from-[rgba(162,63,28,0.45)] to-[rgba(210,152,110,0.45)]',
        image: '/assets/images/footer/footer-bg-default.webp',
        icon_color: '#3A2313'
    },
    'ice-cream': {
        bg: 'bg-[linear-gradient(#8b5000_4%,_#7a5b04fa_100%)]',
        image: '/assets/images/footer/mango.webp',
        icon_color: '#F19803'
    },
    'veg-salad': {
        bg: 'bg-gradient-to-b from-[rgba(77,138,42,0.6)] via-[rgba(163,184,94,0.6)] to-[rgba(249,229,146,0.6)]',
        image: '/assets/images/footer/veg-salad.webp',
        icon_color: '#0F3408'
    }
};

const footerContent = {
    social: {
        title: "Follow Us",
        links: [
            { Icon: Facebook, label: 'Facebook', href: '#' },
            { Icon: Linkedin, label: 'LinkedIn', href: '#' },
            { Icon: Instagram, label: 'Instagram', href: '#' },
            { Icon: Twitter, label: 'Twitter', href: '#' }
        ]
    },
    contact: {
        title: "Contact Us",
        items: [
            {
                type: 'phone',
                label: '905-328-7776',
                href: 'tel:9053287776',
                Icon: Phone
            },
            {
                type: 'email',
                label: 'info@frozencreamery.ca',
                href: 'mailto:info@frozencreamery.ca',
                Icon: Mail
            }
        ]
    },
    location: {
        title: "Location",
        address: {
            street: "31 Ontario St,",
            city: "St Catharines,",
            postal: "L2R 5J3"
        }
    },
    copyright: {
        text: "Frozen Creamery",
        year: new Date().getFullYear()
    }
};

const Footer = ({ waveColor = '#000' }) => {
    const pathname = usePathname();
    const [footerStyle, setFooterStyle] = useState(footerStyles.default);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Extract style from URL path (e.g., /home/cheese-cake -> cheese-cake)
        if (pathname) {
            const pathParts = pathname.split('/');
            // Get the last part of the path that isn't empty
            const lastSegment = pathParts.filter(Boolean).pop();

            if (lastSegment && footerStyles[lastSegment as keyof typeof footerStyles]) {
                setFooterStyle(footerStyles[lastSegment as keyof typeof footerStyles]);
            } else {
                setFooterStyle(footerStyles.default);
            }
        }
    }, [pathname]);

    // Prevent hydration mismatch by not rendering style-dependent classes until mounted
    if (!mounted) {
        return null; // or a loading skeleton
    }

    return (
        <>
            <footer className="relative w-full text-white font-sans bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${footerStyle.image})`,
                }}>

                <div
                    className={`absolute inset-0 z-0 opacity-60 ${footerStyle.bg}`}
                />

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
                    {/* Main Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full justify-between">
                        <div className='hidden lg:block'>
                            <Social social={footerContent.social} iconColor={footerStyle.icon_color} />
                        </div>

                        <div
                            className="flex flex-col text-left md:items-start md:text-left"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <h3 className="text-xl sm:text-2xl text-left font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                {footerContent.contact.title}
                            </h3>
                            <ul className="space-y-3 sm:space-y-4 w-full max-w-xs md:max-w-none">
                                {footerContent.contact.items.map(({ type, label, href, Icon }, index) => (
                                    <li key={index}>
                                        <a
                                            href={href}
                                            className="group flex md:justify-start gap-3 
                                             text-[#e6ccb2] hover:text-white transition-colors duration-300
                                             py-2 px-3 rounded-lg hover:bg-[#d2986e]/10 touch-manipulation"
                                        >
                                            <div
                                                className="p-2 rounded-full transition-all duration-300 shrink-0"
                                                style={{ backgroundColor: footerStyle.icon_color }}
                                            >
                                                <Icon color="white" size={18} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <span className="text-base sm:text-lg font-medium tracking-wide break-all">
                                                {label}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Location */}
                        <div
                            className="flex flex-col text-left"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                {footerContent.location.title}
                            </h3>
                            <div className="flex items-start gap-3 text-[#e6ccb2]">
                                <div
                                    className="p-2 rounded-full mt-1 shrink-0"
                                    style={{ backgroundColor: footerStyle.icon_color }}
                                >
                                    <MapPin color="white" size={18} className="text-[#d2986e] sm:w-5 sm:h-5" />
                                </div>
                                <address className="not-italic text-base sm:text-lg leading-relaxed">
                                    {footerContent.location.address.street}<br />
                                    {footerContent.location.address.city}<br />
                                    {footerContent.location.address.postal}
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className='lg:hidden'>
                        <Social social={footerContent.social} iconColor={footerStyle.icon_color} />
                    </div>

                    {/* Divider */}
                    <div className="mt-12 md:mt-16 mb-6 md:mb-8 flex justify-center">
                        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#3a2313]/40 to-transparent"></div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center animate-fade-in px-4">
                        <p className="text-white/70 text-xs sm:text-sm font-light tracking-widest uppercase">
                            © {footerContent.copyright.year} {footerContent.copyright.text}. All Rights Reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

const Social = ({ social, iconColor }: { social: { title: string, links: { Icon: any, label: string, href: string }[] }, iconColor: string }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                {social.title}
            </h3>
            <div className="flex gap-3 sm:gap-4">
                {social.links.map(({ Icon, label, href }, index) => (
                    <a
                        key={index}
                        href={href}
                        aria-label={label}
                        className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full 
                                 border border-[#d2986e]/30 text-[#d2986e] 
                                 transition-all duration-300 
                                 hover:bg-[#d2986e] hover:text-[#3a2313] hover:scale-110 hover:shadow-[0_0_15px_rgba(210,152,110,0.5)]
                                 active:scale-95 touch-manipulation"
                        style={{ backgroundColor: iconColor }}
                    >
                        <Icon color="white" size={18} strokeWidth={2} className="sm:w-5 sm:h-5" />
                    </a>
                ))}
            </div>
        </div>
    )
}