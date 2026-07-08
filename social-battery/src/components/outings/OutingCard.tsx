import Link from "next/link";
import type { Outing } from "@/lib/types";
import { getCategoryById } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

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
    <Link href={`/outings/${outing.id}`} className="block group">
      <div className="glass-panel rounded-2xl overflow-hidden transition-all group-hover:bg-white/6 group-active:scale-[0.98]">
        <div
          className={cn(
            "h-28 bg-gradient-to-br",
            outing.imageGradient,
            compact && "h-20"
          )}
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{category?.icon} {category?.name}</Badge>
            {outing.spotsRemaining <= 4 && outing.spotsRemaining > 0 && (
              <Badge variant="warning">{outing.spotsRemaining} spots left</Badge>
            )}
            {outing.status === "waitlist" && <Badge variant="waitlist">Waitlist</Badge>}
          </div>
          <h3 className="font-semibold text-base leading-snug">{outing.title}</h3>
          <div className="mt-2 space-y-1 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(outing.date, outing.startTime)}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {outing.venue} · {outing.neighborhood}
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Groups of {outing.groupSizeMin}–{outing.groupSizeMax}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-purple-300">
              ${outing.pricing.oneOff}
            </span>
            <span className="text-xs text-muted">from</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
