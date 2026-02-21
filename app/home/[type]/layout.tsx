'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { StyleProvider } from '@/context/style-context';
import { AnimatePresence, motion } from 'motion/react';


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const types = ['cheese-cake', 'ice-cream', 'veg-salad'];

        types.forEach(type => {
            const path = `/home/${type}`;
            if (pathname !== path) {
                router.prefetch(path);
            }
        });

    }, [router, pathname]);

    return (
        <div>
            <StyleProvider>
                <AnimatePresence mode="wait">
                    <motion.main
                        key={pathname}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </StyleProvider>
        </div>
    );
}