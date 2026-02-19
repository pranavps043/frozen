"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { Reward, ScratchCardProps } from "../types/reward";
import { useScratch } from "../hooks/useScratch";
import Button from "@/components/ui/button";

// Constants
const REVEAL_DELAY_MS = 2000;
const BONUS_CARD_TYPE_ID = 2;
const SCRATCH_THRESHOLD_PERCENT = 50; // Common threshold, adjust as needed

export const ScratchCard: React.FC<ScratchCardProps> = memo(({
  reward,
  onScratchedAndClicked,
  onScratched,
}) => {
  const handleScratchComplete = useCallback(() => {
    if (reward?.type_id !== BONUS_CARD_TYPE_ID) {
      onScratched();
    }
  }, [reward?.type_id, onScratched]);

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
  } = useScratch({
    onComplete: handleScratchComplete,
    threshold: SCRATCH_THRESHOLD_PERCENT,
  });

  if (!reward) return null;

  const isBonusCard = reward.type_id === BONUS_CARD_TYPE_ID;

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <div className="w-full h-[350px] bg-gradient-to-br from-[#1a0533] to-[#2d1065] rounded-[20px] flex flex-col items-center justify-center border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.4)]">
        <RewardContent
          reward={reward}
          onScratchedAndClicked={onScratchedAndClicked}
          isBonusCard={isBonusCard}
        />
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className={`absolute inset-0 w-full h-full rounded-[20px] cursor-crosshair touch-none z-10 transition-opacity duration-300 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        aria-label="Scratch here to reveal your reward"
        role="img"
      />

      {!isScratched && (
        <p className="text-center mt-3 text-[#9CA3AF] text-[13px] animate-pulse">
          {scratchPercent > 0
            ? `${scratchPercent}% revealed — keep scratching!`
            : "Scratch here with your finger or mouse"}
        </p>
      )}
    </div>
  );
});

ScratchCard.displayName = "ScratchCard";

// Sub-components
interface RewardContentProps {
  reward: Reward;
  onScratchedAndClicked: () => void;
  isBonusCard: boolean;
}

const RewardContent: React.FC<RewardContentProps> = memo(({
  reward,
  onScratchedAndClicked,
  isBonusCard,
}) => {
  const [visible, setVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-5">
      <img
        src={imageError ? "/assets/images/rewards/fallback-reward.webp" : "/assets/images/rewards/claimed-reward.webp"}
        className={`transition-all duration-500 ${isBonusCard ? "grayscale opacity-70" : ""}`}
        alt={isBonusCard ? "Bonus reward" : "Reward prize"}
        width={100}
        height={100}
        onError={() => setImageError(true)}
        loading="eager"
      />

      <p className={`font-serif text-lg font-bold py-5 text-center ${isBonusCard ? "text-slate-200" : "text-[#FFD700]"
        }`}>
        {isBonusCard ? reward.message : `You've Won: ${reward.message}`}
      </p>

      <Button
        onClick={onScratchedAndClicked}
        size="sm"
        variant={isBonusCard ? "secondary" : "primary"}
        className="animate-in fade-in zoom-in duration-300"
      >
        {isBonusCard ? "View Rewards" : "Claim Reward"}
      </Button>
    </div>
  );
});

