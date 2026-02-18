import { ValidCodesMap } from "./reward";

export const VALID_CODES: ValidCodesMap = {
  SUMMER: { gift: "25% OFF Your Next Order", emoji: "🎁", color: "#FF6B35" },
  WELCOME10: { gift: "10% OFF + Free Shipping", emoji: "🚀", color: "#7C3AED" },
  VIP50: { gift: "50% OFF Exclusive Deal", emoji: "👑", color: "#F59E0B" },
  LUCKY100: { gift: "$100 Gift Card", emoji: "💰", color: "#10B981" },
};

export const SAMPLE_CODES = Object.keys(VALID_CODES);

export const TOTAL_STEPS = 4;
