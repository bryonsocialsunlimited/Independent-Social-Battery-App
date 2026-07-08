"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { CitySelector } from "@/components/ui/CitySelector";
import { OutingCard } from "@/components/outings/OutingCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { currentUser, getRecommendedOutings } from "@/lib/mock-data";
import { Compass, Gift, UserCircle } from "lucide-react";

export default function HomePage() {
  const [cityId, setCityId] = useState(currentUser.cityId);
  const recommended = getRecommendedOutings(cityId);
  const nextBooking = recommended[0];

  return (
    <div>
      <PageHeader
        title={`Hey, ${currentUser.firstName} 👋`}
        subtitle="Ready for your next outing?"
      />

      <CitySelector selectedCityId={cityId} onSelect={(c) => setCityId(c.id)} />

      {/* Points snapshot */}
      <Card className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Gift className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <p className="text-sm text-muted">Rewards</p>
            <p className="text-lg font-bold">{currentUser.points} pts</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted">Credits</p>
          <p className="text-lg font-bold text-emerald-300">${currentUser.credits}</p>
        </div>
      </Card>

      {/* Next outing */}
      {nextBooking && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Your next outing</h2>
          <OutingCard outing={nextBooking} compact />
          <Link href={`/outings/${nextBooking.id}/group`} className="block mt-2">
            <Button variant="secondary" size="sm" className="w-full">
              View your group
            </Button>
          </Link>
        </section>
      )}

      {/* Quick CTAs */}
      <section className="mt-8 grid grid-cols-3 gap-3">
        {[
          { href: "/explore", icon: Compass, label: "Explore" },
          { href: "/onboarding", icon: UserCircle, label: "Profile" },
          { href: "/outings", icon: Compass, label: "Outings" },
        ].map(({ href, icon: Icon, label }) => (
          <Link key={label} href={href}>
            <Card className="flex flex-col items-center gap-2 py-4 text-center hover:bg-white/6">
              <Icon className="h-5 w-5 text-purple-300" />
              <span className="text-xs font-medium">{label}</span>
            </Card>
          </Link>
        ))}
      </section>

      {/* Recommended */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recommended for you</h2>
          <Link href="/explore" className="text-sm text-purple-400">See all</Link>
        </div>
        <div className="space-y-4">
          {recommended.slice(1).map((outing) => (
            <OutingCard key={outing.id} outing={outing} />
          ))}
        </div>
      </section>
    </div>
  );
}
