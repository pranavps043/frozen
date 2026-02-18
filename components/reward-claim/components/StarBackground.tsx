"use client";
import React, { useMemo } from "react";

export const StarBackground: React.FC = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${1 + Math.random() * 2}px`,
        opacity: Math.random() * 0.6 + 0.1,
        duration: `${2 + Math.random() * 3}s`,
      })),
    []
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: "#fff",
            borderRadius: "50%",
            opacity: s.opacity,
            animation: `twinkle ${s.duration} infinite alternate`,
          }}
        />
      ))}
      <style>{`@keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.7; } }`}</style>
    </div>
  );
};
