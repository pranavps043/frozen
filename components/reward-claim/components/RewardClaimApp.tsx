"use client";
import React, { useState } from "react";
import { Step, Reward, UserInfo, AuthUser } from "../types/reward";
import { StarBackground } from "../components/StarBackground";
import { Confetti } from "../components/Confetti";
import { AuthGate } from "../components/AuthGate";
import { StepCode } from "../components/steps/StepCode";
import { StepUserInfo } from "../components/steps/StepUserInfo";
import { StepScratch } from "../components/steps/StepScratch";
import { StepCongrats } from "../components/steps/StepCongrats";

export const RewardClaimApp: React.FC = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [reward, setReward] = useState<Reward | null>(null);
  const [claimedCode, setClaimedCode] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAuthenticated = (user: AuthUser) => setAuthUser(user);

  const handleCodeSuccess = (r: Reward, code: string) => {
    setReward(r);
    setClaimedCode(code);
    setStep(2);
  };

  const handleUserInfoSuccess = (info: UserInfo) => {
    setUserInfo(info);
    setStep(3);
  };

  const handleScratched = () => {
    setTimeout(() => {
      setStep(4);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }, 500);
  };

  const handleReset = () => {
    setStep(1);
    setReward(null);
    setClaimedCode("");
    setUserInfo({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0533] to-[#0a0014] flex items-center justify-center p-5 font-serif relative overflow-hidden">
      <StarBackground />
      {showConfetti && <Confetti />}

      <div className="w-full max-w-[440px] bg-white/4 backdrop-blur-xl border border-white/10 rounded-[28px] p-12 shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10 box-border">
        {!authUser ? (
          <AuthGate onAuthenticated={handleAuthenticated} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#A78BFA] text-[13px]">👤 {authUser.name}</span>
              <span
                onClick={() => setAuthUser(null)}
                className="text-[#6B7280] text-[12px] cursor-pointer underline"
              >
                Sign out
              </span>
            </div>


            {step === 1 && <StepCode onSuccess={handleCodeSuccess} />}

            {step === 2 && (
              <StepUserInfo
                prefillName={authUser.name}
                prefillEmail={authUser.email}
                onSuccess={handleUserInfoSuccess}
              />
            )}

            {step === 3 && reward && (
              <StepScratch reward={reward} onScratchedAndClicked={() => { }} onScratched={handleScratched} />
            )}

            {step === 4 && reward && (
              <StepCongrats
                reward={reward}
                name={userInfo.name}
                email={userInfo.email}
                code={claimedCode}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
