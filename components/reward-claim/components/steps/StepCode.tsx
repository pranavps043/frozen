"use client";
import React, { useState } from "react";
import { Reward, StepCodeProps } from "../../types/reward";
import { Button } from "@/components/ui/button";
import SplitCodeInput from "../SplitCodeInput";
import { post } from "@/lib/api";

interface ErrorType {
  success: boolean;
  message: string;
}

// interface StepCodeProps {
//   onSuccess: (reward: Reward, code: string) => void;
// }

export const StepCode: React.FC<StepCodeProps> = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!code) { setError("Please enter a reward code."); return; }
    setIsLoading(true);
    setError("");
    const { data, error } = await post<any, any>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verify-code`,
      { code: code }
    );

    if (!data) {
      setError(error);
      setIsLoading(false);
      return;
    }

    localStorage.setItem("rewardCode", code);
    localStorage.setItem("claimToken", data.claim_token);
    localStorage.setItem("tokenExpiry", data.expires_at);

    setError("");
    onSuccess(data, code);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-[#651243] md:text-[42px] text-[32px]  font-bold mb-4 tracking-tight font-pacifico text-shadow-lg">
          Welcome to Frozen
        </h1>
        <p className="text-[#651243] text-[26px] font-bold mb-4 tracking-tight font-serif text-shadow-md">The Coolest Way to Enjoy Fresh Flavors!</p>
        <p className="text-[#651243] text-[18px] font-bold mb-4 tracking-tight font-serif">
          You’ll find your unique code on your ice cream pack or salad bowl.
        </p>
        <p className="text-amber-800 text-[18px] font-bold mb-4 tracking-tight font-serif text-shadow-sm">Enter it below to unlock your reward!</p>
      </div>

      <SplitCodeInput length={6}
        value={code}
        error={error}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setCode(e.target.value); setError(""); }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit()}
      />

      <div className="mt-5 flex justify-center">
        <Button isLoading={isLoading} onClick={handleSubmit}>Verify & Continue →</Button>
      </div>

    </div>
  );
};
