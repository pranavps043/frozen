// components/SplitCodeInput.tsx
"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface SplitCodeInputProps {
    length?: number;
    value: string;
    error?: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    label?: string;
}

export const SplitCodeInput: React.FC<SplitCodeInputProps> = ({
    length = 6,
    value,
    error,
    onChange,
    onKeyDown,
    className = "",
    label = "Enter 6-digit code"
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sync external value changes
    useEffect(() => {
        // const chars = value.toUpperCase().split("").slice(0, length);
        const chars = value.split("").slice(0, length);
        inputRefs.current.forEach((input, idx) => {
            if (input) input.value = chars[idx] || "";
        });
    }, [value, length]);

    const focusInput = useCallback((index: number) => {
        if (index >= 0 && index < length) {
            inputRefs.current[index]?.focus();
            inputRefs.current[index]?.select();
        }
    }, [length]);

    const getAllValues = useCallback(() => {
        return inputRefs.current.map((input) => input?.value || "").join("");
    }, []);

    const triggerChange = useCallback((newValue: string) => {
        const syntheticEvent = {
            target: { value: newValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    }, [onChange]);

    const handleInput = useCallback((index: number, inputValue: string) => {
        // const char = inputValue.slice(-1).toUpperCase();
        const char = inputValue.slice(-1);

        // Update current input
        if (inputRefs.current[index]) {
            inputRefs.current[index]!.value = char;
        }

        const allValues = getAllValues();
        triggerChange(allValues);

        // Auto-focus next input
        if (char && index < length - 1) {
            focusInput(index + 1);
        }
    }, [focusInput, getAllValues, length, triggerChange]);

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === "Backspace") {
            if (!inputRefs.current[index]?.value && index > 0) {
                // Current is empty, move to previous and clear it
                focusInput(index - 1);
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1]!.value = "";
                    triggerChange(getAllValues());
                }
            } else {
                // Clear current
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = "";
                    triggerChange(getAllValues());
                }
            }
            e.preventDefault();
            return;
        }

        // Handle arrow keys
        if (e.key === "ArrowLeft" && index > 0) {
            focusInput(index - 1);
            e.preventDefault();
            return;
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            focusInput(index + 1);
            e.preventDefault();
            return;
        }

        // Handle enter
        if (e.key === "Enter") {
            onKeyDown?.(e);
            return;
        }

        // Allow only alphanumeric
        if (e.key.length === 1 && !/[a-zA-Z0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }, [focusInput, getAllValues, length, onKeyDown, triggerChange]);

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        // const pasted = e.clipboardData.getData("text").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, length);
        const pasted = e.clipboardData.getData("text").replace(/[^A-Z0-9]/g, "").slice(0, length);

        pasted.split("").forEach((char, idx) => {
            if (inputRefs.current[idx]) {
                inputRefs.current[idx]!.value = char;
            }
        });

        triggerChange(pasted);

        // Focus next empty or last
        const nextIndex = Math.min(pasted.length, length - 1);
        focusInput(nextIndex);
    }, [focusInput, length, triggerChange]);

    const handleFocus = useCallback((index: number) => {
        inputRefs.current[index]?.select();
    }, []);

    return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
            <p className="text-gray-900 text-sm m-0">{label}</p>
            <div className="flex gap-2 justify-center flex-wrap">
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        type="text"
                        inputMode="text"
                        maxLength={1}
                        className={`
              w-12 h-14 text-center text-xl font-bold 
              bg-[#DCADC980] border-2 rounded-lg
              text-[#651243] placeholder-[#4B5563]
              transition-all duration-150
              focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
              ${error ? "border-red-500 animate-shake" : "border-[#374151]"}
            `}
                        onChange={(e) => handleInput(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => handleFocus(index)}
                    />
                ))}
            </div>
            {error && (
                <span className="text-red-600 text-md mt-1 animate-fade-in bg-stone-900/20 p-1 px-3 rounded-lg text-shadow-sm">
                    {error}
                </span>
            )}
        </div>
    );
};

export default SplitCodeInput;