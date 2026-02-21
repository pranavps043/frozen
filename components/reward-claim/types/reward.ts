import React from "react";

// ── Auth ──────────────────────────────────────────────
export type AuthMode = "signin" | "signup";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
  game_level: string;
  createdAt: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ── Reward Flow ───────────────────────────────────────
export type Step = 1 | 2 | 3 | 4 | 5;

export interface Reward {
  id: number
  type: string
  message: string
  type_id: number
  created_at: string
}

export type RewardCode = string;
export type ValidCodesMap = Record<RewardCode, Reward>;

export interface UserInfo {
  name: string;
  email: string;
}

// ── Component Props ───────────────────────────────────
export interface ScratchCardProps {
  reward: Reward | null;
  onScratchedAndClicked: () => void;
  onScratched: () => void;
}

export interface StepCodeProps {
  onSuccess: (reward: Reward, code: string) => void;
}

export interface StepUserInfoProps {
  prefillName?: string;
  prefillEmail?: string;
  onSuccess: (info: UserInfo) => void;
}

export interface StepScratchProps {
  reward: Reward | null;
  onScratchedAndClicked: () => void;
  onScratched: () => void;
}

export interface StepCongratsProps {
  reward: Reward | null;
  name: string;
  email: string;
  code: string;
  onReset: () => void;
}



export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "ghost" | "danger";
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// ── Hooks ─────────────────────────────────────────────
export interface UseScratchReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  scratchPercent: number;
  isScratched: boolean;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleTouchEnd: () => void;
  handleTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
}

export interface AllRewardsProps {
  user: AuthUser;
  onReset: () => void;
}
