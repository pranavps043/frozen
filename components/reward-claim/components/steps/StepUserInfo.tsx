"use client";
import React, { useState } from "react";
import { StepUserInfoProps } from "../../types/reward";
import { Button } from "@/components/ui/button";
import { Input } from "../Input";

export const StepUserInfo: React.FC<StepUserInfoProps> = ({
  prefillName = "",
  prefillEmail = "",
  onSuccess,
}) => {
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSuccess({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="text-[52px] mb-3">✨</div>
        <h1 className="text-white text-[26px] font-bold mb-2 font-serif">
          Almost There!
        </h1>
        <p className="text-[#9CA3AF] text-sm m-0">
          Tell us who to send the reward to
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <Input
          label="Full Name"
          placeholder="Your full name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setError(""); }}
        />
        <Input
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setError(""); }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {error && (
        <p className="text-[#F87171] text-[13px] text-center mt-2">
          {error}
        </p>
      )}

      <div className="mt-5">
        <Button onClick={handleSubmit}>REVEAL MY REWARD →</Button>
      </div>
    </div>
  );
};
