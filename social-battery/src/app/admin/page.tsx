"use client";

import { useState } from "react";
import Link from "next/link";
import { adminMetrics, adminTabs, feedbackFlags } from "@/lib/mock-data";
import { AdminAlertCard, FeedbackFlagCard } from "@/components/cards";
import { AppCard } from "@/components/cards";
import { Badge } from "@/components/ui/Badge";
import { StaggerList, StaggerItem } from "@/components/motion/PageTransition";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("Metrics");

  const critical = adminMetrics.filter((m) => m.severity === "critical");
  const warning = adminMetrics.filter((m) => m.severity === "warning");
  const info = adminMetrics.filter((m) => m.severity === "info");
  const openFlags = feedbackFlags.filter(
    (f) => f.status === "open" || f.status === "reviewing"
  );

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-4xl px-5 py-8">
        <Link
          href={routes.main.profile}
          className="inline-flex items-center gap-1 text-sm text-muted mb-6 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to app
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Badge variant="warning">Prototype</Badge>
        </div>
        <p className="text-sm text-muted mb-8">High-need metrics and action queues first</p>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-1">
          {adminTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeTab === tab
                  ? "tab-pill-active ring-1 ring-purple-500/40"
                  : "glass-panel text-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Metrics" && (
          <StaggerList className="space-y-8">
            <StaggerItem>
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h2 className="text-lg font-semibold text-red-300">Critical — act now</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {critical.map((metric) => (
                    <AdminAlertCard key={metric.id} metric={metric} />
                  ))}
                </div>
              </section>
            </StaggerItem>

            <StaggerItem>
              <section>
                <h2 className="text-lg font-semibold text-amber-300 mb-4">Warning</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {warning.map((metric) => (
                    <AdminAlertCard key={metric.id} metric={metric} />
                  ))}
                </div>
              </section>
            </StaggerItem>

            <StaggerItem>
              <section>
                <h2 className="text-lg font-semibold text-muted mb-4">Info & demand</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {info.map((metric) => (
                    <AdminAlertCard key={metric.id} metric={metric} />
                  ))}
                </div>
              </section>
            </StaggerItem>
          </StaggerList>
        )}

        {activeTab === "Feedback Flags" && (
          <StaggerList className="space-y-4">
            <StaggerItem>
              <p className="text-sm text-muted mb-4">
                {openFlags.length} open flags requiring review
              </p>
            </StaggerItem>
            {feedbackFlags.map((flag) => (
              <StaggerItem key={flag.id}>
                <FeedbackFlagCard flag={flag} />
              </StaggerItem>
            ))}
          </StaggerList>
        )}

        {activeTab !== "Metrics" && activeTab !== "Feedback Flags" && (
          <AppCard className="text-center py-16">
            <p className="text-muted">
              <span className="font-medium text-foreground">{activeTab}</span> management
              coming in Phase 6. Metrics are live on the Metrics tab; feedback flags on Feedback
              Flags.
            </p>
          </AppCard>
        )}
      </div>
    </div>
  );
}
