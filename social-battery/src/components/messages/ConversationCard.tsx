import type { Conversation } from "@/lib/types";
import { AppCard } from "@/components/cards/AppCard";
import { Badge } from "@/components/ui/Badge";
import { Lock, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ConversationCardProps {
  conversation: Conversation;
}

export function ConversationCard({ conversation }: ConversationCardProps) {
  const { type, title, subtitle, status, lastMessage, unreadCount } = conversation;

  return (
    <AppCard variant="interactive">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            type === "group" ? "bg-purple-500/20" : "bg-cyan-500/20"
          )}
        >
          {type === "group" ? (
            <Users className="h-5 w-5 text-purple-300" />
          ) : (
            <MessageCircle className="h-5 w-5 text-cyan-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium truncate">{title}</h3>
            {unreadCount && unreadCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-0.5">{subtitle}</p>
          {lastMessage && (
            <p className="text-sm text-muted mt-1.5 truncate">{lastMessage}</p>
          )}
          <div className="mt-2">
            {status === "locked" && (
              <Badge variant="warning">
                <Lock className="h-3 w-3 mr-1 inline" />
                Chat locked
              </Badge>
            )}
            {status === "active" && <Badge variant="live">Active</Badge>}
            {status === "read_only" && <Badge>Read-only</Badge>}
          </div>
        </div>
      </div>
    </AppCard>
  );
}
