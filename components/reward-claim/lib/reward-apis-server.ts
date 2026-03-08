"use server";

import { cookies } from "next/headers";
import { get, post } from "@/lib/api";

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
// const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

const getServerAuthUser = async (): Promise<{ id: string; token: string } | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const userId = cookieStore.get("user_id")?.value;

    if (!token || !userId) return null;
    return { id: userId, token };
};

const getAuthHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
});

export const getRandomReward = async () => {
    const user = await getServerAuthUser();
    if (!user) return { data: null, error: "Unauthorized" };

    const { data, error } = await get<any>(
        `${getApiUrl()}/api/random-reward`,
        { login_id: user.id }
    );
    return { data, error };
};

export const getUserReward = async () => {
    const user = await getServerAuthUser();
    if (!user) return { data: null, error: "Unauthorized" };

    const { data, error } = await post<any, any>(
        `${getApiUrl()}/api/get-reward-by-user`,
        { login_id: user.id }
    );
    return { data, error };
};

export const getUserGameReward = async () => {
    const user = await getServerAuthUser();
    if (!user) return { data: null, error: "Unauthorized" };

    const { data, error } = await post<any, any>(
        `${getApiUrl()}/api/get-user-game-reward`,
        { login_id: user.id }
    );
    return { data, error };
};

export const claimReward = async () => {
    const user = await getServerAuthUser();
    if (!user) return { data: null, error: "Unauthorized" };

    const { data, error } = await post<any, any>(
        `${getApiUrl()}/api/button-claim-reward`,
        { login_id: user.id }
    );
    return { data, error };
};

export const fetchUserRewards = async () => {
    const user = await getServerAuthUser();
    if (!user) return { data: null, error: "Unauthorized" };

    const { data, error } = await post<any, any>(
        `${getApiUrl()}/api/get-reward-by-user`,
        { login_id: user.id }
    );
    return { data, error };
};
