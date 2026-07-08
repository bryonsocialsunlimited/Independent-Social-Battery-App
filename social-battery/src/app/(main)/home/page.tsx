"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CitySelector } from "@/components/ui/CitySelector";
import { OutingCard } from "@/components/cards";
import { GroupCard } from "@/components/cards";
import { RewardBalanceCard } from "@/components/cards";
import { AppCard } from "@/components/cards";
import { Button } from "@/components/ui/Button";
import { StaggerList, StaggerItem } from "@/components/motion/PageTransition";
import {
  currentUser,
  getRecommendedOutings,
  getGroupByOutingId,
  getCurrentTier,
  getNextTier,
} from "@/lib/mock-data";
import { routes } from "@/lib/routes";
import { Compass, UserCircle } from "lucide-react";

export default function HomePage() {
  const [cityId, setCityId] = useState(currentUser.cityId);
  const recommended = getRecommendedOutings(cityId);
  const nextBooking = recommended[0];
  const nextGroup = nextBooking ? getGroupByOutingId(nextBooking.id) : undefined;
  const tier = getCurrentTier(currentUser.points);
  const nextTier = getNextTier(currentUser.points);

  return (
    <div>
      <PageHeader
        title={`Hey, ${currentUser.firstName} 👋`}
        subtitle="Ready for your next outing?"
      />

      <CitySelector selectedCityId={cityId} onSelect={(c) => setCityId(c.id)} />

      <StaggerList className="mt-6 space-y-6">
        <StaggerItem>
          <RewardBalanceCard
            points={currentUser.points}
            credits={currentUser.credits}
            tier={tier}
            nextTier={nextTier}
          />
        </StaggerItem>

        {nextBooking && (
          <StaggerItem>
            <section>
              <h2 className="text-lg font-semibold mb-3">Your next outing</h2>
              <OutingCard outing={nextBooking} compact />
              {nextGroup && (
                <div className="mt-3">
                  <GroupCard
                    group={nextGroup}
                    outingTitle={nextBooking.title}
                    href={routes.main.outingGroup(nextBooking.id)}
                    compact
                  />
                </div>
              )}
              <Link href={routes.main.outingGroup(nextBooking.id)} className="block mt-2">
                <Button variant="secondary" size="sm" className="w-full">
                  View your group
                </Button>
              </Link>
            </section>
          </StaggerItem>
        )}

        <StaggerItem>
          <section className="grid grid-cols-3 gap-3">
            {[
              { href: routes.main.explore, icon: Compass, label: "Explore" },
              { href: routes.auth.onboarding, icon: UserCircle, label: "Profile" },
              { href: routes.main.outings, icon: Compass, label: "Outings" },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={label} href={href}>
                <AppCard variant="interactive" className="flex flex-col items-center gap-2 py-4 text-center">
                  <Icon className="h-5 w-5 text-purple-300" />
                  <span className="text-xs font-medium">{label}</span>
                </AppCard>
              </Link>
            ))}
          </section>
        </StaggerItem>

        <StaggerItem>
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Recommended for you</h2>
              <Link href={routes.main.explore} className="text-sm text-purple-400">
                See all
              </Link>
            </div>
            <div className="space-y-4">
              {recommended.slice(1).map((outing) => (
                <OutingCard key={outing.id} outing={outing} />
              ))}
            </div>
          </section>
        </StaggerItem>
      </StaggerList>
    </div>
  );
}
