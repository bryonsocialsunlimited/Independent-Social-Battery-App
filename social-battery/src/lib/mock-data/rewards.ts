import type { RewardActivity, RewardRedemption, RewardTier } from "@/lib/types";

export const rewardTiers: RewardTier[] = [
  {
    id: "spark",
    name: "Spark",
    minPoints: 0,
    multiplier: 1,
    perks: ["Earn points on every outing", "Birthday bonus credits"],
  },
  {
    id: "glow",
    name: "Glow",
    minPoints: 200,
    multiplier: 1.25,
    perks: ["25% points bonus", "Early access to new outings", "$5 monthly credit"],
  },
  {
    id: "radiant",
    name: "Radiant",
    minPoints: 500,
    multiplier: 1.5,
    perks: ["50% points bonus", "Priority waitlist", "$10 monthly credit", "Guest pass once/quarter"],
  },
  {
    id: "luminous",
    name: "Luminous",
    minPoints: 1000,
    multiplier: 2,
    perks: ["2× points on all outings", "VIP support line", "$20 monthly credit", "Free category upgrade"],
  },
];

export const rewardRedemptions: RewardRedemption[] = [
  {
    id: "redeem-1",
    title: "$10 outing credit",
    pointsCost: 100,
    description: "Apply toward any upcoming outing",
    category: "credit",
    available: true,
  },
  {
    id: "redeem-2",
    title: "$25 outing credit",
    pointsCost: 220,
    description: "Best value credit bundle",
    category: "credit",
    available: true,
  },
  {
    id: "redeem-3",
    title: "Category Pass trial (1 month)",
    pointsCost: 350,
    description: "Try member pricing on one category",
    category: "upgrade",
    available: true,
  },
  {
    id: "redeem-4",
    title: "Priority waitlist bump",
    pointsCost: 75,
    description: "Move up one spot on any waitlisted outing",
    category: "perk",
    available: true,
  },
  {
    id: "redeem-5",
    title: "Guest pass",
    pointsCost: 500,
    description: "Bring a friend to one outing (subject to group rules)",
    category: "perk",
    available: false,
  },
];

export const rewardActivity: RewardActivity[] = [
  {
    id: "act-1",
    label: "Classic Film Revival — outing complete",
    points: 50,
    date: "2026-06-29",
    type: "earned",
  },
  {
    id: "act-2",
    label: "Feedback submitted bonus",
    points: 25,
    date: "2026-06-29",
    type: "earned",
  },
  {
    id: "act-3",
    label: "Friend connection with Jordan",
    points: 30,
    date: "2026-07-01",
    type: "earned",
  },
  {
    id: "act-4",
    label: "Redeemed $10 outing credit",
    points: -100,
    date: "2026-07-03",
    type: "redeemed",
  },
  {
    id: "act-5",
    label: "Glow tier unlocked",
    points: 0,
    date: "2026-07-05",
    type: "earned",
  },
  {
    id: "act-6",
    label: "Speakeasy Comedy — booking confirmed",
    points: 15,
    date: "2026-07-06",
    type: "earned",
  },
];

export function getCurrentTier(points: number): RewardTier {
  return [...rewardTiers].reverse().find((t) => points >= t.minPoints) ?? rewardTiers[0];
}

export function getNextTier(points: number): RewardTier | null {
  return rewardTiers.find((t) => t.minPoints > points) ?? null;
}
