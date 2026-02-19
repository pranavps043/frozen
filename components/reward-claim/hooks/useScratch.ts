"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { UseScratchReturn } from "../types/reward";

interface UseScratchOptions {
  threshold?: number; // % scratched to trigger onComplete
  brushRadius?: number;
  onComplete?: () => void;
}

export function useScratch({
  threshold = 55,
  brushRadius = 28,
  onComplete,
}: UseScratchOptions = {}): UseScratchReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratched, setIsScratched] = useState(false);

  // Draw the silver scratch layer on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#b5a90cff");
    grad.addColorStop(0.5, "#d1d500ff");
    grad.addColorStop(1, "#7a7a00ff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Checkerboard texture
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    for (let i = 0; i < canvas.width; i += 20) {
      for (let j = 0; j < canvas.height; j += 20) {
        if ((i + j) % 40 === 0) ctx.fillRect(i, j, 10, 10);
      }
    }

    ctx.fillStyle = "#8d5500ff";
    ctx.font = "bold 16px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH HERE ✦", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "13px Georgia, serif";
    ctx.fillText("Reveal your reward", canvas.width / 2, canvas.height / 2 + 15);
  }, []);

  const getPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    []
  );

  const doScratch = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || isScratched) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const pos = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, brushRadius, 0, Math.PI * 2);
      ctx.fill();

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      const pct = Math.round((cleared / (canvas.width * canvas.height)) * 100);
      setScratchPercent(pct);

      if (pct > threshold && !isScratched) {
        setIsScratched(true);
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          onComplete?.();
        }, 300);
      }
    },
    [isScratched, brushRadius, threshold, getPos, onComplete]
  );

  const handleMouseDown = useCallback(() => { isDrawing.current = true; }, []);
  const handleMouseUp = useCallback(() => { isDrawing.current = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => { doScratch(e); }, [doScratch]);
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => { isDrawing.current = true; doScratch(e); }, [doScratch]);
  const handleTouchEnd = useCallback(() => { isDrawing.current = false; }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => { doScratch(e); }, [doScratch]);

  return {
    canvasRef,
    scratchPercent,
    isScratched,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  };
}
