"use client";
import React, { useState } from "react";
import { Step, Reward, UserInfo, AuthUser } from "./types/reward";
import { StarBackground } from "./components/StarBackground";
import { Confetti } from "./components/Confetti";
import { AuthGate } from "./components/AuthGate";
import { StepCode } from "./components/steps/StepCode";
import { StepUserInfo } from "./components/steps/StepUserInfo";
import { StepScratch } from "./components/steps/StepScratch";
import { StepCongrats } from "./components/steps/StepCongrats";
import { getRandomReward, getUserGameReward } from "./lib/reward-apis";
import { AllRewards } from "./components/steps/AllRewards";

export const RewardClaimApp: React.FC = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [reward, setReward] = useState<Reward | null>(null);
  const [claimedCode, setClaimedCode] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAuthenticated = async (user: AuthUser) => {
    setAuthUser(user);
    localStorage.setItem("memberToken", user.token);
    localStorage.setItem("login_id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("start_level", user.game_level);
    localStorage.setItem("justLoggedIn", "yes");
    const { data, error } = await getRandomReward(user);

    if (data.status) {
      setReward(data.reward);
      setStep(3);
    }
  };

  const handleCodeSuccess = (r: Reward, code: string) => {
    setReward(r);
    setClaimedCode(code);
    setStep(2);
  };

  const handleUserInfoSuccess = (info: UserInfo) => {
    setUserInfo(info);
    setStep(4);
  };

  const handleScratched = () => {
    setShowConfetti(true);
  };

  const handleScratchedClaimSubmit = async () => {
    if (!authUser) return;
    const { data, error } = await getUserGameReward(authUser);
    console.log(data, error);
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setReward(null);
    setClaimedCode("");
    setUserInfo({ name: "", email: "" });
    setAuthUser(null);
  };



  return (
    <div className="min-h-screen flex items-center justify-center p-5 font-serif relative overflow-hidden">
      <StarBackground />
      {showConfetti && <Confetti />}

      <div className="lg:w-1/2 w-full bg-white/4 backdrop-blur-xl border border-white/10 rounded-[28px] p-12 shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10 box-border">

        {/* {step === 1 && <AuthGate onAuthenticated={handleAuthenticated} />} */}
        {step === 1 && <StepCode onSuccess={handleCodeSuccess} />}

        {step === 2 && (
          <AuthGate onAuthenticated={handleAuthenticated} />
        )}

        {step >= 3 && authUser && (
          <>
            <div className="flex items-center justify-between mb-2">
              {/* <span className="text-[#A78BFA] text-[13px]">👤 {authUser.name}</span> */}
              {/* <span
                onClick={handleReset}
                className="text-[#6B7280] text-[12px] cursor-pointer underline"
              >
                Start Over
              </span> */}
            </div>


            {/* {step === 3 && (
              <StepUserInfo
                prefillName={authUser.name}
                prefillEmail={authUser.email}
                onSuccess={handleUserInfoSuccess}
              />
            )} */}

            {step === 3 && reward && (
              <StepScratch reward={reward} onScratchedAndClicked={handleScratchedClaimSubmit} onScratched={handleScratched} />
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

            {step === 5 && reward && (
              <AllRewards user={authUser} onReset={handleReset} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
