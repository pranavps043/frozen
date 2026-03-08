"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { Reward, ScratchCardProps } from "../types/reward";
import { useScratch } from "../hooks/useScratch";
import Button from "@/components/ui/button";

// Constants
const REVEAL_DELAY_MS = 2000;
const BONUS_CARD_TYPE_ID = 2;
const SCRATCH_THRESHOLD_PERCENT = 50;

interface ExtendedScratchCardProps extends ScratchCardProps {
  scratchLayerImage?: string;
}

export const ScratchCard: React.FC<ExtendedScratchCardProps> = memo(({
  reward,
  onScratchedAndClicked,
  onScratched,
  isLoading,
  scratchLayerImage = "/assets/images/rewards/scratch-card.webp",
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

  // Draw scratch layer image onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = scratchLayerImage;

    img.onload = () => {
      // Gold background to blend with rounded corners
      ctx.fillStyle = "#F5C400";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate cover-fit dimensions (like CSS object-fit: cover)
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const offsetX = (canvas.width - drawW) / 2;
      const offsetY = (canvas.height - drawH) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      // Subtle "Scratch to reveal" text overlay
      ctx.fillStyle = "rgba(180, 100, 0, 0.55)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "1px";
      ctx.fillText("✦  SCRATCH TO REVEAL  ✦", canvas.width / 2, canvas.height - 18);
    };

    img.onerror = () => {
      // Fallback gold gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#F5C400");
      gradient.addColorStop(1, "#D4A000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, [canvasRef, scratchLayerImage]);

  if (!reward) return null;

  const isBonusCard = reward.type_id === BONUS_CARD_TYPE_ID;

  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <div className="w-full h-[350px] bg-gradient-to-br from-[#1a0533] to-[#2d1065] rounded-[20px] flex flex-col items-center justify-center border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.4)]">
        <RewardContent
          reward={reward}
          onScratchedAndClicked={onScratchedAndClicked}
          isBonusCard={isBonusCard}
          isLoading={isLoading}
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
  isLoading: boolean;
}

const RewardContent: React.FC<RewardContentProps> = memo(({
  reward,
  onScratchedAndClicked,
  isBonusCard,
  isLoading,
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
        isLoading={isLoading}
        variant={isBonusCard ? "secondary" : "primary"}
        className="animate-in fade-in zoom-in duration-300"
      >
        {isBonusCard ? "View Rewards" : "Claim Reward"}
      </Button>
    </div>
  );
});

RewardContent.displayName = "RewardContent";