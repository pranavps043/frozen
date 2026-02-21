"use server";

import { post } from "@/lib/api";

export interface ContactFormPayload {
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
}

export async function submitContactForm(
    payload: ContactFormPayload
): Promise<ContactFormResponse> {
    const { data, error } = await post<ContactFormResponse, ContactFormPayload>(
        `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_CONTACT_PATH}`,
        payload
    );

    if (error || !data) {
        return { success: false, message: error ?? "Submission failed. Please try again." };
    }

    return data;
}