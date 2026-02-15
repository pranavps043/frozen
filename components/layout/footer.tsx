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

const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden text-white font-sans">
            {/* 
        Background Layer 
        Using a CSS pattern + Gradient to ensure it works without external image assets.
        To use your original image, replace the backgroundImage below with:
        backgroundImage: `linear-gradient(rgba(162, 63, 28, 0.85), rgba(210, 152, 110, 0.85)), url('/assets/images/footer-bg.webp')`
      */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundColor: '#3a2313',
                    backgroundImage: `
            linear-gradient(rgba(162, 63, 28, 0.90), rgba(58, 35, 19, 0.95)),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d2986e' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">

                    {/* Column 1: Follow Us */}
                    <div className="flex flex-col items-center md:items-start animate-fade-in-up">
                        <h3 className="text-2xl font-bold mb-6 tracking-wide text-[#f3e5d8]">Follow Us</h3>
                        <div className="flex gap-4">
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
                                    className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#3a2313] border border-[#d2986e]/30 text-[#d2986e] transition-all duration-300 hover:bg-[#d2986e] hover:text-[#3a2313] hover:scale-110 hover:shadow-[0_0_15px_rgba(210,152,110,0.5)]"
                                >
                                    <Icon size={20} strokeWidth={2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Contact Us */}
                    <div className="flex flex-col items-center md:items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-2xl font-bold mb-6 tracking-wide text-[#f3e5d8]">Contact Us</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:9053287776"
                                    className="group flex items-center gap-3 text-[#e6ccb2] hover:text-white transition-colors duration-300"
                                >
                                    <div className="p-2 rounded-full bg-[#3a2313]/50 group-hover:bg-[#d2986e] group-hover:text-[#3a2313] transition-all duration-300">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-lg font-medium tracking-wide">905-328-7776</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@frozencreamery.ca"
                                    className="group flex items-center gap-3 text-[#e6ccb2] hover:text-white transition-colors duration-300"
                                >
                                    <div className="p-2 rounded-full bg-[#3a2313]/50 group-hover:bg-[#d2986e] group-hover:text-[#3a2313] transition-all duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-lg font-medium tracking-wide">info@frozencreamery.ca</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Location */}
                    <div className="flex flex-col items-center md:items-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-2xl font-bold mb-6 tracking-wide text-[#f3e5d8]">Location</h3>
                        <div className="flex items-start gap-3 text-[#e6ccb2] max-w-xs">
                            <div className="p-2 rounded-full bg-[#3a2313]/50 mt-1 shrink-0">
                                <MapPin size={18} className="text-[#d2986e]" />
                            </div>
                            <address className="not-italic text-lg leading-relaxed text-right">
                                31 Ontario St,<br />
                                St Catharines,<br />
                                L2R 5J3
                            </address>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-16 mb-8 flex justify-center">
                    <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#d2986e]/50 to-transparent"></div>
                </div>

                {/* Copyright */}
                <div className="text-center animate-fade-in">
                    <p className="text-[#d2986e]/60 text-sm font-light tracking-widest uppercase">
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
      `}</style>
        </footer>
    );
};

export default Footer;