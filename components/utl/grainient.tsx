"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GradientAnimatorProps {
    width?: number | string;
    height?: number | string;
    gradientFrom?: string;
    gradientTo?: string;
    duration?: number;
    ease?: string;
    repeat?: number;
    yoyo?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const GradientAnimator = ({
    width = "100%",
    height = "100%",
    gradientFrom = "linear-gradient(180deg, rgba(226, 144, 32, 0.7) 0%, rgba(248, 202, 74, 0.7) 100%)",
    gradientTo = "linear-gradient(17deg, rgba(255, 234, 0, 0.7), rgba(189, 95, 0, 0) 70.71%), linear-gradient(200deg, rgba(0, 255, 0, .9), rgba(72, 219, 5, 0.2) 70.71%), linear-gradient(336deg, rgba(255, 162, 0, 0.8), rgba(209, 212, 16, 0.71) 70.71%)",
    duration = 6,
    ease = "none",
    repeat = -1,
    yoyo = true,
    className = "",
    style = {}
}: GradientAnimatorProps) => {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!boxRef.current) return;

        const animation = gsap.fromTo(
            boxRef.current,
            {
                width,
                height,
                background: gradientFrom
            },
            {
                ease,
                duration,
                background: gradientTo,
                repeat,
                yoyo
            }
        );

        return () => {
            animation.kill();
        };
    }, [width, height, gradientFrom, gradientTo, duration, ease, repeat, yoyo]);

    return (
        <div
            ref={boxRef}
            className={className}
            style={style}
        />
    );
};

export default GradientAnimator;