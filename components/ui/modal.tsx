"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

function WavyBorder() {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "visible" }}
        >
            <defs>
                <filter id="waveFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves={2} seed={2}>
                        <animate
                            attributeName="baseFrequency"
                            values="0.02;0.04;0.02"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale={5} />
                </filter>
            </defs>

            <rect
                x="-4"
                y="-4"
                width="calc(100% + 8px)"
                height="calc(100% + 8px)"
                rx={20}
                ry={20}
                fill="none"
                stroke="#F9B22B"
                strokeWidth={4}
                filter="url(#waveFilter)"
            />
        </svg>
    );
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-40 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            className="relative pointer-events-auto bg-white rounded-2xl p-1 w-full max-w-200 min-h-48 overflow-visible"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <WavyBorder />

                            {/* Close button */}
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={onClose}
                                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-red-400 text-white text-sm font-bold flex items-center justify-center hover:bg-red-600 transition-colors border-0 cursor-pointer z-99"
                            >
                                ✕
                            </button>

                            {/* Content */}
                            <div className="relative z-20">
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}