import {
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Phone,
    Mail,
    MapPin
} from 'lucide-react';

// Footer Content Configuration
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
    return (
        <>
            <footer className="relative w-full text-white font-sans bg-cover bg-center bg-no-repeat "
                style={{
                    backgroundImage: 'url(/assets/images/footer-icecream.webp)',
                }}>

                <div
                    className="absolute inset-0 z-0 opacity-80"
                    style={{
                        backgroundColor: '#3a2313',
                        backgroundImage: 'linear-gradient(180deg, rgba(226, 144, 32, 0.6) 0%, rgba(248, 202, 74, 0.6) 100%)',
                    }}
                />



                {/* Content Container - Added extra top padding (pt-24 md:pt-32) to clear the wave */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">

                        {/* Column 1: Follow Us */}
                        <div className="flex flex-col items-center text-center">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                {footerContent.social.title}
                            </h3>
                            <div className="flex gap-3 sm:gap-4">
                                {footerContent.social.links.map(({ Icon, label, href }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        aria-label={label}
                                        className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full 
                                         bg-[#3a2313] border border-[#d2986e]/30 text-[#d2986e] 
                                         transition-all duration-300 
                                         hover:bg-[#d2986e] hover:text-[#3a2313] hover:scale-110 hover:shadow-[0_0_15px_rgba(210,152,110,0.5)]
                                         active:scale-95 touch-manipulation"
                                    >
                                        <Icon size={18} strokeWidth={2} className="sm:w-5 sm:h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Contact Us */}
                        <div
                            className="flex flex-col items-center text-center md:items-start md:text-left"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                {footerContent.contact.title}
                            </h3>
                            <ul className="space-y-3 sm:space-y-4 w-full max-w-xs md:max-w-none">
                                {footerContent.contact.items.map(({ type, label, href, Icon }, index) => (
                                    <li key={index}>
                                        <a
                                            href={href}
                                            className="group flex items-center justify-center md:justify-start gap-3 
                                             text-[#e6ccb2] hover:text-white transition-colors duration-300
                                             py-2 px-3 rounded-lg hover:bg-[#d2986e]/10 touch-manipulation"
                                        >
                                            <div className="p-2 rounded-full bg-[#3a2313]/50 group-hover:bg-[#d2986e] 
                                                  group-hover:text-[#3a2313] transition-all duration-300 shrink-0">
                                                <Icon size={18} className="sm:w-5 sm:h-5" />
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
                            className="flex flex-col items-center text-center md:items-start md:text-left lg:items-end lg:text-right md:col-span-2 lg:col-span-1"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide text-[#f3e5d8]">
                                {footerContent.location.title}
                            </h3>
                            <div className="flex items-start justify-center md:justify-start lg:justify-end gap-3 text-[#e6ccb2]">
                                <div className="p-2 rounded-full bg-[#3a2313]/50 mt-1 shrink-0">
                                    <MapPin size={18} className="text-[#d2986e] sm:w-5 sm:h-5" />
                                </div>
                                <address className="not-italic text-base sm:text-lg leading-relaxed">
                                    {footerContent.location.address.street}<br />
                                    {footerContent.location.address.city}<br />
                                    {footerContent.location.address.postal}
                                </address>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-12 md:mt-16 mb-6 md:mb-8 flex justify-center">
                        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-[#3a2313]/40 to-transparent"></div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center animate-fade-in px-4">
                        <p className="text-[#3a2313]/70 text-xs sm:text-sm font-light tracking-widest uppercase">
                            © {footerContent.copyright.year} {footerContent.copyright.text}. All Rights Reserved
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;