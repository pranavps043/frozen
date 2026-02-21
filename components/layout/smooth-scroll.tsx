"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Synchronize Lenis scrolling with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Define ticker function for consistent addition/removal
        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        // Add Lenis's raf to GSAP's ticker
        gsap.ticker.add(updateLenis);

        // Disable lag smoothing for GSAP to prevent "jumps"
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);

    return <>{children}</>;
}
