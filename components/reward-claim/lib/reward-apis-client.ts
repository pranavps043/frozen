import { RewardResponse, UserRewardsResponse, LoginResponse, RegisterResponse } from "../types/reward";

async function apiFetch<T>(url: string, options?: RequestInit): Promise<{ data: T | null; error: string | null }> {
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
            return { data: null, error: data.message || data.error || "An error occurred" };
        }
        return { data, error: null };
    } catch (err) {
        return { data: null, error: err instanceof Error ? err.message : "An unexpected error occurred" };
    }
}


const postJSON = <T = any>(url: string, body: object) =>
    apiFetch<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

export const verifyCode = async (code: string) =>
    postJSON<RewardResponse>("/api/reward/verify-code", { code });

// export const getRandomReward = async () =>
//     apiFetch<RewardResponse>("/api/reward/random");

/* export const loginMember = async (payload: any, uuid: string) => {
    const { data, error } = await post<any, any>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login-member`,
        {
            email_or_phone: payload.email,
            password: payload.password,
            uuid: uuid ? uuid : ""
        }
    );
    return { data, error };
} 
    export const registerMember = async (payload: any) => {
        const { data, error } = await post<any, any>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/register-member`,
            {
                full_name: payload.name,
                email_or_phone: payload.email,
                password: payload.password,
                password_confirmation: payload.confirmPassword,
            }
        );
        return { data, error };
    }

*/



export const loginMember = async (payload: any, uuid: string) => {
    return postJSON<LoginResponse>(
        `/api/reward/login`,
        {
            email_or_phone: payload.email,
            password: payload.password,
            uuid: uuid ? uuid : ""
        }
    );
}

export const registerMember = async (payload: any) => {
    return postJSON<RegisterResponse>(
        `/api/reward/register`,
        {
            full_name: payload.name,
            email_or_phone: payload.email,
            password: payload.password,
            password_confirmation: payload.confirmPassword,
        }
    );
}

export const getRandomReward = async (loginId: string) =>
    postJSON<RewardResponse>("/api/reward/random", { login_id: loginId });

export const getUserReward = async (loginId: string) =>
    postJSON<UserRewardsResponse>("/api/reward/user", { login_id: loginId });

export const getUserGameReward = async (loginId: string) =>
    postJSON<UserRewardsResponse>("/api/reward/user-game", { login_id: loginId });

export const claimReward = async (loginId: string) =>
    postJSON<RewardResponse>("/api/reward/claim", { login_id: loginId });

export const fetchUserRewards = async (loginId: string) =>
    postJSON("/api/reward/all", { login_id: loginId }) as Promise<{ data: UserRewardsResponse; error: any }>;