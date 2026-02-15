'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';



export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const types = ['cheese-cake', 'ice-cream'];

        types.forEach(type => {
            const path = `/home/${type}`;
            if (pathname !== path) {
                router.prefetch(path);
            }
        });
    }, [router, pathname]);

    return (
        <div>
            <main className="transition-opacity duration-300 relative">
                {children}
            </main>
        </div>
    );
}