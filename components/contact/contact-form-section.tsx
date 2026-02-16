"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import Button from "../ui/button";
import { ImageType } from "@/types/common";

interface ContactFormSectionProps {
    backgroundImage: ImageType;
    title: string;
    description: string;
    buttonText: string;
    fields: {
        fullName: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    };
}

export default function ContactFormSection({
    backgroundImage,
    title,
    description,
    buttonText,
    fields,
}: ContactFormSectionProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const inputClasses =
        "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all";

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
                <div className="absolute inset-0 bg-black/60" />
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
                        <p className="text-lg text-white/80 leading-relaxed">
                            {description}
                        </p>
                    </motion.div>
                </div>

                <motion.form
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    onSubmit={handleSubmit}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-white/80 mb-2 text-sm font-medium">
                                {fields.fullName}
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={inputClasses}
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
                            required
                        />
                    </div>

                    <Button variant="primary" type="submit">{buttonText}</Button>
                </motion.form>
            </div>
        </div>
    );
}
