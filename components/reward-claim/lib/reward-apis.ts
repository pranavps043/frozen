import { get, post } from "@/lib/api";
import { AuthUser } from "../types/reward";

export const getRandomReward = async (user: AuthUser) => {
    const { data, error } = await get<any>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/random-reward`,
        {
            login_id: user.id
        }
    );
    return { data, error };
}

export const getUserReward = async (user: AuthUser) => {
    const { data, error } = await post<any, any>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-user-game-reward`,
        {
            login_id: user.id
        }
    );
    return { data, error };
}

export const loginMember = async (payload: any, uuid: string) => {
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


export const getUserGameReward = async (user: AuthUser) => {
    const { data, error } = await post<any, any>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-user-game-reward`,
        {
            login_id: user.id,
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

