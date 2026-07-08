import type { Outing } from "@/lib/types";
import { getCategoryById } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import {
  AppCard,
  AppCardFooter,
  AppCardMedia,
  AppCardMetaRow,
} from "@/components/cards/AppCard";
import { Calendar, MapPin, Users } from "lucide-react";

interface OutingCardProps {
  outing: Outing;
  compact?: boolean;
}

function formatDate(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T${timeStr}`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function OutingCard({ outing, compact }: OutingCardProps) {
  const category = getCategoryById(outing.categoryId);

  return (
    <AppCard variant="outing" href={`/outings/${outing.id}`}>
      <AppCardMedia gradient={outing.imageGradient} compact={compact}>
        <div className="absolute bottom-2 left-3 flex flex-wrap gap-1.5">
          <Badge className="backdrop-blur-sm bg-black/30">
            {category?.icon} {category?.name}
          </Badge>
          {outing.spotsRemaining <= 4 && outing.spotsRemaining > 0 && (
            <Badge variant="warning">{outing.spotsRemaining} spots left</Badge>
          )}
          {outing.status === "waitlist" && <Badge variant="waitlist">Waitlist</Badge>}
        </div>
      </AppCardMedia>
      <h3 className="font-semibold text-base leading-snug">{outing.title}</h3>
      <div className="mt-2 space-y-1">
        <AppCardMetaRow icon={<Calendar className="h-3.5 w-3.5" />}>
          {formatDate(outing.date, outing.startTime)}
        </AppCardMetaRow>
        <AppCardMetaRow icon={<MapPin className="h-3.5 w-3.5" />}>
          {outing.venue} · {outing.neighborhood}
        </AppCardMetaRow>
        <AppCardMetaRow icon={<Users className="h-3.5 w-3.5" />}>
          Groups of {outing.groupSizeMin}–{outing.groupSizeMax}
        </AppCardMetaRow>
      </div>
      <AppCardFooter>
        <span className="text-lg font-bold text-purple-300">${outing.pricing.oneOff}</span>
        <span className="text-xs text-muted">from · All Access ${outing.pricing.allAccess}</span>
      </AppCardFooter>
    </AppCard>
  );
}
