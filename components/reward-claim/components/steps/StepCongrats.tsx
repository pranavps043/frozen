"use client";
import React from "react";
import { StepCongratsProps } from "../../types/reward";
import { Button } from "@/components/ui/button";

export const StepCongrats: React.FC<StepCongratsProps> = ({
  reward,
  name,
  email,
  code,
  onReset,
}: StepCongratsProps) => {
  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    alert("Reward code copied to clipboard!");
  };

  if (!reward) return null;

  return (
    <div className="animate-fade-in text-center">
      <div className="text-6xl mb-3 animate-bounce">🎉</div>
      <h1 className="text-white text-[28px] font-bold mb-2 font-serif">
        Congratulations!
      </h1>
      <p className="text-[#9CA3AF] text-sm mb-7">
        {name}, you've unlocked an amazing reward!
      </p>

      <div className="bg-gradient-to-br from-[#1a0533] to-[#2d1065] border-2 border-[#7C3AED] rounded-[20px] p-[30px] mb-6 shadow-[0_0_40px_rgba(124,58,237,0.5)]">
        <div className="text-[#FFD700] text-xl font-bold tracking-tight mb-2 font-serif">
          {reward.message}
        </div>
        <div className="text-[#9CA3AF] text-xs">Confirmation sent to {email}</div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="mint" onClick={handleCopy}>
          📋 COPY REWARD CODE
        </Button>
        <Button variant="secondary" onClick={onReset}>
          Claim Another Reward
        </Button>
      </div>
    </div>
  );
};
