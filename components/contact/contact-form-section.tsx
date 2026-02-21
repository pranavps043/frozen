"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Button from "../ui/button";
import { ImageType } from "@/types/common";
import { submitContactForm, type ContactFormPayload } from "@/actions/contact";

interface ContactFormSectionProps {
    backgroundImage: ImageType;
    title: string;
    description: string;
    buttonText: string;
    overlayColor?: string;
    overlayOpacity?: number;
    fields: {
        full_name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    };
}

type FormStatus = "idle" | "loading" | "success" | "error";

const defaultFormData: ContactFormPayload = {
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function ContactFormSection({
    backgroundImage,
    title,
    description,
    buttonText,
    overlayColor = "#000000",
    overlayOpacity = 0.6,
    fields,
}: ContactFormSectionProps) {
    const [formData, setFormData] = useState<ContactFormPayload>(defaultFormData);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [feedback, setFeedback] = useState<string>("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setFeedback("");

        const result = await submitContactForm(formData);
        if (result) {
            setStatus("success");
            return;
        }

    };

    const handleReset = () => {
        setStatus("idle");
        setFormData(defaultFormData);
        setFeedback("");
    };

    const inputClasses =
        "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all";

    const isLoading = status === "loading";

    return (
        <div className="relative w-full min-h-screen flex items-center px-8 lg:px-24 py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage.src}
                    alt={backgroundImage.alt}
                    fill
                    className="object-cover"
                    priority
                />
                <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity 
                    }} 
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white font-primary leading-tight playfair-display">
                            {title}
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <p className="text-lg text-white/80 leading-relaxed">{description}</p>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        // Success Animation
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -20 }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 lg:p-16 border border-white/20 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                            >
                                <motion.svg
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        delay: 0.4,
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                    className="w-12 h-12 text-green-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </motion.div>

                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="text-3xl font-bold text-white mb-3"
                            >
                                Thank You!
                            </motion.h3>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="text-white/80 mb-8 text-lg"
                            >
                                {feedback}
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                <Button
                                    variant="primary"
                                    onClick={handleReset}
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        // Contact Form
                        <motion.form
                            key="form"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSubmit}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm font-medium">
                                        {fields.full_name}
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm font-medium">
                                        {fields.email}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm font-medium">
                                        {fields.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 mb-2 text-sm font-medium">
                                        {fields.subject}
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-white/80 mb-2 text-sm font-medium">
                                    {fields.message}
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className={`${inputClasses} resize-none`}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <AnimatePresence>
                                {feedback && status === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-6 text-sm font-medium text-red-400"
                                    >
                                        {feedback}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                className="relative overflow-hidden"
                            >
                                {isLoading ? (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-center"
                                    >
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </motion.span>
                                ) : buttonText}
                            </Button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}