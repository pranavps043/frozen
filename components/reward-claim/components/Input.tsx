"use client";
import React from "react";
import { InputProps } from "../types/reward";

export const Input: React.FC<InputProps> = ({ label, error, className = "", style, ...rest }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[#651243] text-[13px] tracking-wide font-josefin-sans">
          {label}
        </label>
      )}
      <input
        className={`w-full px-[18px] py-3.5 bg-[#DCADC9]/50 border rounded-xl   outline-none box-border font-serif transition-colors duration-200 text-[#651243] focus:border-[#651243]/60 border-2 ${error ? "border-[#F87171]" : "border-[#651243]"} ${className}`}
        style={style}
        {...rest}
      />
      {error && (
        <p className="text-[#F87171] text-xs m-0">{error}</p>
      )}
    </div>
  );
};
