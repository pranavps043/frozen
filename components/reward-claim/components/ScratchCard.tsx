"use client";
import React from "react";
import { ScratchCardProps } from "../types/reward";
import { useScratch } from "../hooks/useScratch";

export const ScratchCard: React.FC<ScratchCardProps> = ({ reward, onScratched }: ScratchCardProps) => {
  const {
    canvasRef,
    scratchPercent,
    isScratched,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  } = useScratch({ onComplete: onScratched });

  if (!reward) return null;

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <div className="w-full h-[180px] bg-gradient-to-br from-[#1a0533] to-[#2d1065] rounded-[20px] flex flex-col items-center justify-center border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.4)]">
        <div className="text-5xl mb-2">{reward.emoji}</div>
        <div className="text-[#FFD700] font-serif text-lg font-bold text-center px-5">
          {reward.gift}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className={`absolute inset-0 w-full h-full rounded-[20px] cursor-crosshair touch-action-none ${isScratched ? "hidden" : "block"}`}
      />

      {!isScratched && (
        <p className="text-center mt-3 text-[#9CA3AF] text-[13px]">
          {scratchPercent > 0
            ? `${scratchPercent}% scratched — keep going!`
            : "Use your finger or mouse to scratch"}
        </p>
      )}
    </div>
  );
};
