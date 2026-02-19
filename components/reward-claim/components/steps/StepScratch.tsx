"use client";
import React from "react";
import { StepScratchProps } from "../../types/reward";
import { ScratchCard } from "../ScratchCard";

export const StepScratch: React.FC<StepScratchProps> = ({ reward, onScratchedAndClicked, onScratched }: StepScratchProps) => (
  <div className="animate-fade-in">
    <div className="text-center mb-8 relative">

      <h1 className="text-[#651243] text-[26px] font-bold mb-2 font-pacifico">
        Scratch & Win Big Rewards
      </h1>
      <p className="text-slate-900 text-md m-0 px-5 py-2">
        You’ve uncovered a special Frozen treat  let’s see what’s inside
      </p>
    </div>

    <ScratchCard reward={reward} onScratchedAndClicked={onScratchedAndClicked} onScratched={onScratched} />
  </div>
);
