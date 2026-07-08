import {
  conversations,
  getActiveConversations,
  getPastConversations,
} from "@/lib/mock-data";
import {
  rewardTiers,
  rewardRedemptions,
  rewardActivity,
  getCurrentTier,
  getNextTier,
} from "@/lib/mock-data";

export const messagesService = {
  getAll: () => conversations,
  getActive: () => getActiveConversations(),
  getPast: () => getPastConversations(),
};

export const rewardsService = {
  getTiers: () => rewardTiers,
  getRedemptions: () => rewardRedemptions,
  getActivity: () => rewardActivity,
  getCurrentTier: (points: number) => getCurrentTier(points),
  getNextTier: (points: number) => getNextTier(points),
};
