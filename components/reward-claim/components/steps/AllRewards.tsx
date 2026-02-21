"use client";
import React from "react";
import { AllRewardsProps } from "../../types/reward";
import { Clock } from "lucide-react";


const rewards = [
  {
    id: 1,
    title: "Free Coffee",
    description: "Valid for any regular size coffee.",
    image: "/assets/images/rewards/claimed-reward.webp",
  },
  {
    id: 2,
    title: "10% Discount",
    description: "Applies to all online orders only.",
    image: "/assets/images/rewards/claimed-reward.webp",
  },
  {
    id: 3,
    title: "Free Dessert",
    description: "Redeemable with any main course.",
    image: "/assets/images/rewards/claimed-reward.webp",
  },
];


export const AllRewards: React.FC<AllRewardsProps> = ({
  user,
  onReset,
}: AllRewardsProps) => {

  return (
    <div className="animate-fade-in text-center">
      <div className="text-center mb-8">
        <h1 className="text-[#FFC608] md:text-[42px] text-[32px]  font-bold mb-4 tracking-tight font-pacifico text-shadow-lg">
          My Frozen Rewards
        </h1>
        <p className="text-yellow-500 text-[26px] mb-4 tracking-tight font-josefin-sans text-shadow-md">
          Your golden treats are waiting  check which ones are still chilled and which have melted away
        </p>

      </div>

      <div className="flex flex-col md:flex-row bg-[#3b0643] py-5 rounded-3xl">
        <div className="w-full md:w-1/2 p-4">
          <ActiveClaimedReward />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <OtherRewards />
        </div>
      </div>


      <p className="text-yellow-500 text-[26px] mb-4 tracking-tight font-josefin-sans text-shadow-md pt-4">Each reward remains valid for 24 hours from the moment you claim it. Make sure to enjoy it before it melts!</p>

    </div>
  );
};



const ActiveClaimedReward = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h2 className="text-xl font-semibold">Claimed Rewards</h2>

      <img
        src="/assets/images/rewards/claimed-reward.webp"
        alt="Claimed reward"
        className="w-40 h-auto"
      />

      <h4 className="text-lg font-medium">rewardname</h4>

      <p className="max-w-md">
        You claimed this reward at TIME### today. Redeem it at any Frozen outlet or online checkout.
      </p>

      <span className="flex items-center gap-2 text-sm">
        <Clock />
        Time Left: 23h 59m remaining
      </span>
    </div>
  );
};


const OtherRewards = () => {
  return (
    <div className="space-y-6">

      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-center">
        Expired
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rewards.map((reward, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={reward.id}
              className={isFirst ? "md:col-span-2 flex justify-center" : ""}
            >
              <div
                className={
                  isFirst
                    ? "w-full md:w-1/2 p-2 text-center"
                    : "p-6 text-center"
                }
              >
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="mx-auto mb-4 w-32 h-auto grayscale"
                />

                <h4 className="font-semibold mb-2">
                  {reward.title}
                </h4>

                <p className="text-sm text-zinc-300/80">
                  {reward.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
