"use client";
import React, { useState } from "react";
import { SignInPayload, AuthMode } from "../types/reward";
import { Button } from "@/components/ui/button";
import { Input } from "./Input";

interface SignInProps {
  onSignIn: (payload: SignInPayload) => Promise<boolean>;
  onSwitch: (mode: AuthMode) => void;
  loading: boolean;
  error: string | null;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn, onSwitch, loading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<SignInPayload>>({});

  const validate = (): boolean => {
    const errors: Partial<SignInPayload> = {};
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = "Valid email required.";
    if (!password) errors.password = "Password is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSignIn({ email: email.trim(), password });
  };

  return (
    <div className="animate-fade-in font-josefin-sans duration-300">
      <div className="text-center mb-8">
        <div className="text-[52px] mb-3">🔑</div>
        <h1 className="text-[#651243] text-[26px] font-bold mb-2 font-pacifico">
          Sign in to Claim Your Frozen Reward
        </h1>
        <p className="text-slate-900 text-md m-0 px-5 py-2">
          Already a member? Log in below.New here? Join the Frozen family and unlock more treats!
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          error={fieldErrors.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          error={fieldErrors.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {error && (
        <span className="block text-red-600 text-md mt-1 animate-fade-in pt-3 px-3 rounded-lg text-shadow-sm">
          {error}
        </span>
      )}

      <div className="mt-5 flex justify-center">
        <Button variant="primary" isLoading={loading} onClick={handleSubmit}>
          Login & Claim Reward →
        </Button>
      </div>

      <p className="text-slate-900 text-center mt-10 font-josefin-sans">
        Don't have an account?{" "}
        <span
          onClick={() => onSwitch("signup")}
          className="text-[#651243] cursor-pointer "
        >
          [Sign Up]
        </span>
      </p>
    </div>
  );
};
