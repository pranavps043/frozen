"use client";
import React from "react";
import { StepScratchProps } from "../../types/reward";
import { ScratchCard } from "../ScratchCard";

export const StepScratch: React.FC<StepScratchProps> = ({ reward, onScratched }: StepScratchProps) => (
  <div className="animate-fade-in">
    <div className="text-center mb-7">
      <div className="text-[52px] mb-3">🪙</div>
      <h1 className="text-white text-[26px] font-bold mb-2 font-serif">
        Scratch to Reveal!
      </h1>
      <p className="text-[#9CA3AF] text-sm m-0">
        Your exclusive reward is hiding underneath…
      </p>
    </div>

    <ScratchCard reward={reward} onScratched={onScratched} />
  </div>
);
