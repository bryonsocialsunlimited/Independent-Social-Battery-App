import type { AdminMetric, FeedbackFlag } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { AppCard, AppCardHeader } from "@/components/cards/AppCard";
import { AlertTriangle, Flag, User } from "lucide-react";

interface AdminAlertCardProps {
  metric: AdminMetric;
  onClick?: () => void;
}

export function AdminAlertCard({ metric, onClick }: AdminAlertCardProps) {
  return (
    <AppCard
      variant="admin"
      severity={metric.severity}
      onClick={onClick}
      className="cursor-pointer"
    >
      <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
      <p className="text-xs text-muted mt-1 leading-snug">{metric.label}</p>
      {metric.tab && (
        <Badge className="mt-2" variant={metric.severity === "critical" ? "warning" : "default"}>
          {metric.tab}
        </Badge>
      )}
    </AppCard>
  );
}

const flagTypeLabels: Record<FeedbackFlag["type"], string> = {
  low_rating: "Low rating",
  one_sided_friend: "One-sided friend",
  no_show: "No-show",
  safety_concern: "Safety concern",
  group_conflict: "Group conflict",
};

const priorityVariants: Record<FeedbackFlag["priority"], "warning" | "default" | "success"> = {
  high: "warning",
  medium: "default",
  low: "success",
};

interface FeedbackFlagCardProps {
  flag: FeedbackFlag;
}

export function FeedbackFlagCard({ flag }: FeedbackFlagCardProps) {
  return (
    <AppCard
      variant="admin"
      severity={flag.priority === "high" ? "critical" : flag.priority === "medium" ? "warning" : "info"}
    >
      <AppCardHeader
        title={flagTypeLabels[flag.type]}
        subtitle={flag.outingTitle}
        action={
          <Badge variant={priorityVariants[flag.priority]}>
            {flag.status}
          </Badge>
        }
      />
      <p className="text-sm text-muted mt-2 leading-relaxed">{flag.summary}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {flag.reportedUserName}
        </span>
        <span className="flex items-center gap-1">
          <Flag className="h-3 w-3" />
          by {flag.reporterUserName}
        </span>
        {flag.rating !== undefined && (
          <span className="flex items-center gap-1 text-amber-300">
            <AlertTriangle className="h-3 w-3" />
            {flag.rating}/5
          </span>
        )}
      </div>
    </AppCard>
  );
}
