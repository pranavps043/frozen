import { RewardResponse, UserRewardsResponse } from "../types/reward";

async function apiFetch<T>(url: string, options?: RequestInit): Promise<{ data: T | null; error: any }> {
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) return { data: null, error: data };
        return { data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}


const postJSON = (url: string, body: object) =>
    apiFetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

export const verifyCode = async (code: string) =>
    postJSON("/api/reward/verify-code", { code }) as Promise<{ data: RewardResponse; error: any }>;

// export const getRandomReward = async () =>
//     apiFetch<RewardResponse>("/api/reward/random");

export const getRandomReward = async (loginId: string) =>
    postJSON("/api/reward/random", { login_id: loginId }) as Promise<{ data: RewardResponse; error: any }>;

export const getUserReward = async (loginId: string) =>
    postJSON("/api/reward/user", { login_id: loginId }) as Promise<{ data: UserRewardsResponse; error: any }>;

export const getUserGameReward = async (loginId: string) =>
    postJSON("/api/reward/user-game", { login_id: loginId }) as Promise<{ data: UserRewardsResponse; error: any }>;

export const claimReward = async (loginId: string) =>
    postJSON("/api/reward/claim", { login_id: loginId }) as Promise<{ data: RewardResponse; error: any }>;

export const fetchUserRewards = async (loginId: string) =>
    postJSON("/api/reward/all", { login_id: loginId }) as Promise<{ data: UserRewardsResponse; error: any }>;