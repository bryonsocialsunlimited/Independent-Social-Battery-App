import type { RewardActivity, RewardRedemption, RewardTier } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { AppCard, AppCardFooter, AppCardHeader } from "@/components/cards/AppCard";
import { Gift, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RewardBalanceCardProps {
  points: number;
  credits: number;
  tier: RewardTier;
  nextTier: RewardTier | null;
}

export function RewardBalanceCard({ points, credits, tier, nextTier }: RewardBalanceCardProps) {
  const progress = nextTier
    ? ((points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100
    : 100;

  return (
    <AppCard variant="reward" glow>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20">
            <Gift className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <p className="text-sm text-muted">Rewards balance</p>
            <p className="text-2xl font-bold">{points} pts</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Credits</p>
          <p className="text-xl font-bold text-emerald-300">${credits}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1 text-amber-300 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            {tier.name} tier · {tier.multiplier}× points
          </span>
          {nextTier && (
            <span className="text-muted">{nextTier.minPoints - points} to {nextTier.name}</span>
          )}
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </AppCard>
  );
}

interface RewardRedemptionCardProps {
  redemption: RewardRedemption;
}

export function RewardRedemptionCard({ redemption }: RewardRedemptionCardProps) {
  return (
    <AppCard
      variant="reward"
      className={cn(!redemption.available && "opacity-50")}
    >
      <AppCardHeader
        title={redemption.title}
        subtitle={redemption.description}
        action={
          <Badge variant={redemption.available ? "success" : "default"}>
            {redemption.pointsCost} pts
          </Badge>
        }
      />
    </AppCard>
  );
}

interface RewardActivityCardProps {
  activity: RewardActivity;
}

export function RewardActivityCard({ activity }: RewardActivityCardProps) {
  return (
    <AppCard variant="default" animate={false} className="py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <TrendingUp
            className={cn(
              "h-4 w-4 shrink-0",
              activity.type === "earned" ? "text-emerald-400" : "text-amber-400"
            )}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{activity.label}</p>
            <p className="text-xs text-muted">{activity.date}</p>
          </div>
        </div>
        <span
          className={cn(
            "text-sm font-bold shrink-0",
            activity.points > 0 ? "text-emerald-300" : "text-amber-300"
          )}
        >
          {activity.points > 0 ? "+" : ""}
          {activity.points || "—"}
        </span>
      </div>
    </AppCard>
  );
}

interface MembershipCardProps {
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  savingsLabel?: string;
  popular?: boolean;
}

export function MembershipCard({
  name,
  description,
  monthlyPrice,
  features,
  savingsLabel,
  popular,
}: MembershipCardProps) {
  return (
    <AppCard variant="pricing" className={cn(popular && "ring-1 ring-purple-500/40")}>
      <AppCardHeader
        title={name}
        subtitle={description}
        action={
          popular ? <Badge variant="live">Popular</Badge> : savingsLabel ? (
            <Badge variant="success">{savingsLabel}</Badge>
          ) : undefined
        }
      />
      <AppCardFooter>
        <span className="text-2xl font-bold text-purple-300">${monthlyPrice}</span>
        <span className="text-xs text-muted">/month</span>
      </AppCardFooter>
      <ul className="mt-3 space-y-1">
        {features.slice(0, 3).map((f) => (
          <li key={f} className="text-xs text-muted flex items-start gap-1.5">
            <span className="text-purple-400 mt-0.5">·</span>
            {f}
          </li>
        ))}
      </ul>
    </AppCard>
  );
}
