import { apiSuccess } from "@/lib/api/response";
import { rewardsService, usersService } from "@/lib/services";

export async function GET() {
  const user = usersService.getCurrentUser();
  return apiSuccess({
    tiers: rewardsService.getTiers(),
    redemptions: rewardsService.getRedemptions(),
    activity: rewardsService.getActivity(),
    currentTier: rewardsService.getCurrentTier(user.points),
    nextTier: rewardsService.getNextTier(user.points),
    points: user.points,
    credits: user.credits,
  });
}
