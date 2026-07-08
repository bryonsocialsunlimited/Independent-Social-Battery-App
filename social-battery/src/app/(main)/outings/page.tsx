"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { userBookings, getOutingById } from "@/lib/mock-data";
import { cn } from "@/lib/utils/cn";
import { Calendar, MapPin, MessageCircle, CheckCircle, Clock } from "lucide-react";

const tabs = [
  { key: "upcoming", label: "Upcoming" },
  { key: "pending_group", label: "Pending" },
  { key: "past", label: "Past" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function OutingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const filtered = userBookings.filter((b) => b.status === activeTab);

  return (
    <div>
      <PageHeader title="Outings" subtitle="Your outing hub" />

      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab.key
                ? "bg-purple-600/30 text-purple-200 ring-1 ring-purple-500/40"
                : "glass-panel text-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((booking) => {
            const outing = getOutingById(booking.outingId);
            if (!outing) return null;
            return (
              <Link key={booking.id} href={`/outings/${outing.id}`}>
                <Card className="hover:bg-white/6 transition-all active:scale-[0.98]">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={booking.groupStatus === "confirmed" ? "success" : "warning"}>
                      {booking.groupStatus === "confirmed" ? "Group confirmed" : "Pending group"}
                    </Badge>
                    <Badge>{booking.ticketStatus}</Badge>
                  </div>
                  <h3 className="font-semibold">{outing.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {outing.date} · {outing.startTime}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {outing.venue}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {booking.chatOpensIn && (
                      <span className="flex items-center gap-1 text-xs text-purple-300">
                        <MessageCircle className="h-3.5 w-3.5" />
                        Chat opens in {booking.chatOpensIn}
                      </span>
                    )}
                    {booking.checkedIn && (
                      <span className="flex items-center gap-1 text-xs text-emerald-300">
                        <CheckCircle className="h-3.5 w-3.5" /> Checked in
                      </span>
                    )}
                    {booking.status === "past" && !booking.feedbackComplete && (
                      <span className="flex items-center gap-1 text-xs text-amber-300">
                        <Clock className="h-3.5 w-3.5" /> Feedback pending
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })
        ) : (
          <p className="text-sm text-muted text-center py-12">
            No {activeTab.replace("_", " ")} outings.
          </p>
        )}
      </div>
    </div>
  );
}
