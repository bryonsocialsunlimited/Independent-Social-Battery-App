import type { AdminMetric, MembershipPlan } from "@/lib/types";

export const adminMetrics: AdminMetric[] = [
  { id: "m1", label: "Groups below 3", value: 2, severity: "critical", tab: "Groups" },
  { id: "m2", label: "Outings at fill risk", value: 3, severity: "critical", tab: "Outings" },
  { id: "m3", label: "Starting in 24 hours", value: 4, severity: "warning", tab: "Outings" },
  { id: "m4", label: "Active chat windows", value: 1, severity: "info", tab: "Groups" },
  { id: "m5", label: "Low feedback flags", value: 5, severity: "warning", tab: "Feedback Flags" },
  { id: "m6", label: "One-sided friend flags", value: 3, severity: "warning", tab: "Feedback Flags" },
  { id: "m7", label: "ID reviews pending", value: 7, severity: "critical", tab: "ID Verification" },
  { id: "m8", label: "Discount apps pending", value: 4, severity: "warning", tab: "Discounted Access" },
  { id: "m9", label: "No-shows pending review", value: 2, severity: "warning", tab: "Payments/Credits" },
  { id: "m10", label: "Cancellations needing credit", value: 6, severity: "warning", tab: "Payments/Credits" },
  { id: "m11", label: "Payment failures", value: 1, severity: "critical", tab: "Payments/Credits" },
  { id: "m12", label: "Credit liability total", value: "$1,240", severity: "info", tab: "Payments/Credits" },
  { id: "m13", label: "Boston demand score", value: 87, severity: "info", tab: "City Demand" },
  { id: "m14", label: "Top category demand", value: "Comedy", severity: "info", tab: "City Demand" },
];

export const adminTabs = [
  "Metrics",
  "Outings",
  "Users",
  "Groups",
  "Feedback Flags",
  "ID Verification",
  "Discounted Access",
  "Payments/Credits",
  "Rewards",
  "City Demand",
  "Settings",
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: "category-pass",
    name: "Category Pass",
    monthlyPrice: 16,
    description: "Member pricing on one category of outings",
  },
  {
    id: "all-access",
    name: "All Access Pass",
    monthlyPrice: 60,
    description: "Best pricing on all outings plus rewards multipliers",
  },
];
