"use client";
import React, { useState } from "react";
import { SignUpPayload, AuthMode } from "../types/reward";
import { Button } from "@/components/ui/button";
import { Input } from "./Input";

interface SignUpProps {
  onSignUp: (payload: SignUpPayload) => Promise<boolean>;
  onSwitch: (mode: AuthMode) => void;
  loading: boolean;
  error: string | null;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitch, loading, error }) => {
  const [form, setForm] = useState<SignUpPayload>({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<SignUpPayload>>({});

  const set = (field: keyof SignUpPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errors: Partial<SignUpPayload> = {};
    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "Valid email required.";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSignUp(form);
  };

  return (
    <div className="animate-fade-in font-josefin-sans duration-300">
      <div className="text-center mb-8">
        <div className="text-[52px] mb-3">🔑</div>
        <h1 className="text-[#651243] text-[26px] font-bold mb-2 font-pacifico">
          Create Your Frozen Account
        </h1>
        <p className="text-slate-900 text-md m-0 px-5 py-2">
          Earn rewards, save your favorites, and enjoy exclusive offers!
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <Input label="Full Name" placeholder="Jane Doe" value={form.name} error={fieldErrors.name} onChange={set("name")} />
        <Input label="Email" type="email" placeholder="you@example.com" value={form.email} error={fieldErrors.email} onChange={set("email")} />
        <Input label="Password" type="password" placeholder="Min 6 characters" value={form.password} error={fieldErrors.password} onChange={set("password")} />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
          value={form.confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={set("confirmPassword")}
          onKeyDown={(e: { key: string; }) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {error && (
        <p className="text-red-600 text-[15px] text-center mt-5 ">
          {error}
        </p>
      )}

      <div className="mt-5 flex justify-center">
        <Button variant="primary" isLoading={loading} onClick={handleSubmit}>
          CREATE ACCOUNT →
        </Button>
      </div>

      <p className="text-slate-900 text-center mt-10 font-josefin-sans">
        Already have an account?{" "}
        <span
          onClick={() => onSwitch("signin")}
          className="text-[#651243] cursor-pointer"
        >
          [Sign In]
        </span>
      </p>
    </div>
  );
};
