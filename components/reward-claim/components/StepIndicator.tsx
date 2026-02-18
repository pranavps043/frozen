"use client";
import React from "react";
import { StepIndicatorProps } from "../types/reward";

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 4,
}) => (
  <div className="flex justify-center gap-2 mb-9">
    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
      <div
        key={s}
        className={`h-2 rounded transition-all duration-400 ease-in-out ${
          currentStep >= s ? "w-7 bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" : "w-2 bg-white/15"
        }`}
      />
    ))}
  </div>
);
