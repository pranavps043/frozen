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
import { claimReward, getRandomReward, getUserGameReward, getUserReward, verifyCode } from "./lib/reward-apis-client";
import { AllRewards } from "./components/steps/AllRewards";

export const RewardClaimApp: React.FC = () => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [step, setStep] = useState<Step>(1);
  const [reward, setReward] = useState<Reward | null>(null);
  const [claimedCode, setClaimedCode] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoadingScratch, setIsLoadingScratch] = useState(false);
  const [userRewards, setUserRewards] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthenticated = async (user: AuthUser) => {
    setAuthUser(user);
    localStorage.setItem("memberToken", user.token);
    localStorage.setItem("login_id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("start_level", user.game_level);
    localStorage.setItem("justLoggedIn", "yes");
    setIsLoading(true);
    const { data, error } = await getRandomReward(user.id);
    setIsLoading(false);

    if (data && data.status) {
      setReward(data.reward);
      setStep(3);
    }
    if (error) {
      setError(error);
    }

  };

  const handleCodeVerification = async (code: string) => {
    setIsLoading(true);
    const { data, error: apiError } = await verifyCode(code);
    setIsLoading(false);
    if (apiError || !data) {
      const errorMessage = typeof apiError === "object" && apiError !== null
        ? ((apiError as any).message || (apiError as any).error || JSON.stringify(apiError))
        : (apiError || "Invalid response");
      setError(errorMessage as string);
      return;
    }

    setClaimedCode(code);
    setReward(data.reward);
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
    setIsLoadingScratch(true);
    const { data: claimed_data, error: claimed_error } = await claimReward(authUser.id);
    if (claimed_data) {
      localStorage.setItem("memberClaimedReward", JSON.stringify(claimed_data.reward));
    }
    const { data: user_reward_data, error: user_reward_error } = await getUserReward(authUser.id);
    if (user_reward_data) {
      setUserRewards(user_reward_data);
      localStorage.setItem("memberAvailableRewards", JSON.stringify(user_reward_data));
    }

    setIsLoadingScratch(false);
    setStep(5);
  };

  const handleReset = () => {
    localStorage.removeItem("memberClaimedReward");
    localStorage.removeItem("memberAvailableRewards");
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

      <div className="lg:w-1/2 w-full bg-white/4 backdrop-blur-xl border border-white/10 rounded-[28px] px-6 lg:px-12 py-12 lg:py-12 shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10 box-border">

        {step === 1 && <StepCode
          handleCodeVerification={handleCodeVerification}
          error={error}
          isLoading={isLoading}
        />}

        {step === 2 && (
          <AuthGate onAuthenticated={handleAuthenticated} />
        )}

        {step >= 3 && authUser && (
          <>
            <div className="flex items-center justify-between mb-2">

            </div>

            {step === 3 && reward && (
              <StepScratch reward={reward} onScratchedAndClicked={handleScratchedClaimSubmit} onScratched={handleScratched} isLoading={isLoadingScratch} />
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
              <AllRewards user={authUser} userRewards={userRewards} onReset={handleReset} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
