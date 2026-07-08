import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  MembershipCard,
  RewardBalanceCard,
  RewardActivityCard,
  RewardRedemptionCard,
} from "@/components/cards";
import { AppCard } from "@/components/cards";
import { Badge } from "@/components/ui/Badge";
import { StaggerList, StaggerItem } from "@/components/motion/PageTransition";
import {
  currentUser,
  membershipPlans,
  rewardActivity,
  rewardRedemptions,
  getCurrentTier,
  getNextTier,
} from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import {
  Bell,
  ChevronRight,
  CreditCard,
  IdCard,
  Percent,
  Shield,
} from "lucide-react";

const menuItems = [
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: CreditCard, label: "Payment settings", href: "#" },
  {
    icon: IdCard,
    label: "ID verification",
    value: currentUser.idVerificationStatus,
    href: "#",
  },
  {
    icon: Percent,
    label: "Discounted access",
    value: currentUser.discountedAccessStatus.replace("_", " "),
    href: "#",
  },
  { icon: Shield, label: "Legal & support", href: "#" },
];

export default function ProfilePage() {
  const tier = getCurrentTier(currentUser.points);
  const nextTier = getNextTier(currentUser.points);

  return (
    <div>
      <PageHeader title="Profile" />

      <StaggerList className="space-y-6">
        <StaggerItem>
          <AppCard>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-2xl font-bold">
                {currentUser.firstName[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentUser.firstName}</h2>
                <p className="text-sm text-muted">{currentUser.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="success">ID verified</Badge>
                  <Badge>{currentUser.upcomingOutingsCount} upcoming</Badge>
                </div>
              </div>
            </div>
          </AppCard>
        </StaggerItem>

        <StaggerItem>
          <RewardBalanceCard
            points={currentUser.points}
            credits={currentUser.credits}
            tier={tier}
            nextTier={nextTier}
          />
        </StaggerItem>

        <StaggerItem>
          <section>
            <h3 className="section-label mb-3">Redeem points</h3>
            <div className="space-y-3">
              {rewardRedemptions.slice(0, 3).map((r) => (
                <RewardRedemptionCard key={r.id} redemption={r} />
              ))}
            </div>
          </section>
        </StaggerItem>

        <StaggerItem>
          <section>
            <h3 className="section-label mb-3">Recent activity</h3>
            <div className="space-y-2">
              {rewardActivity.slice(0, 4).map((a) => (
                <RewardActivityCard key={a.id} activity={a} />
              ))}
            </div>
          </section>
        </StaggerItem>

        <StaggerItem>
          <section>
            <h3 className="section-label mb-3">Memberships</h3>
            <div className="space-y-3">
              {membershipPlans.map((plan) => (
                <MembershipCard
                  key={plan.id}
                  name={plan.name}
                  description={plan.description}
                  monthlyPrice={plan.monthlyPrice}
                  features={plan.features}
                  savingsLabel={plan.savingsLabel}
                  popular={plan.popular}
                />
              ))}
            </div>
          </section>
        </StaggerItem>

        <StaggerItem>
          <section>
            <div className="space-y-2">
              {menuItems.map(({ icon: Icon, label, value, href }) => (
                <Link key={label} href={href}>
                  <AppCard variant="interactive" className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-purple-300" />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {value && (
                        <span className="text-xs text-muted capitalize">{value}</span>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </div>
                  </AppCard>
                </Link>
              ))}
            </div>
          </section>
        </StaggerItem>

        <StaggerItem>
          <Link
            href={routes.admin}
            className="block text-center text-xs text-muted hover:text-foreground"
          >
            Admin dashboard →
          </Link>
        </StaggerItem>
      </StaggerList>
    </div>
  );
}
