import type { Group, GroupMember } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { AppCard, AppCardHeader } from "@/components/cards/AppCard";
import { MessageCircle, Users } from "lucide-react";

interface GroupCardProps {
  group: Group;
  outingTitle?: string;
  href?: string;
  compact?: boolean;
}

const statusLabels: Record<Group["status"], { label: string; variant: "success" | "warning" | "default" }> = {
  confirmed: { label: "Confirmed", variant: "success" },
  pending: { label: "Forming", variant: "warning" },
  below_minimum: { label: "Below minimum", variant: "warning" },
  merged: { label: "Merged", variant: "default" },
};

function MemberAvatar({ member }: { member: GroupMember }) {
  return (
    <div
      className={
        member.showPhoto
          ? "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-sm font-bold ring-2 ring-[var(--background)]"
          : "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-muted ring-2 ring-[var(--background)]"
      }
      title={member.firstName}
    >
      {member.firstName[0]}
    </div>
  );
}

export function GroupCard({ group, outingTitle, href, compact }: GroupCardProps) {
  const status = statusLabels[group.status];

  return (
    <AppCard variant="group" href={href}>
      <AppCardHeader
        title={outingTitle ?? "Your group"}
        subtitle={`${group.members.length} of ${group.maxSize} members`}
        action={<Badge variant={status.variant}>{status.label}</Badge>}
      />

      <div className="flex items-center mt-3 -space-x-2">
        {group.members.slice(0, compact ? 4 : 6).map((member) => (
          <MemberAvatar key={member.id} member={member} />
        ))}
        {group.members.length > (compact ? 4 : 6) && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-medium ring-2 ring-[var(--background)]">
            +{group.members.length - (compact ? 4 : 6)}
          </div>
        )}
      </div>

      {!compact && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <Users className="h-3.5 w-3.5" />
          <span>Min {group.minSize} to confirm</span>
          <span className="text-white/20">·</span>
          <MessageCircle className="h-3.5 w-3.5" />
          <span>
            Chat {new Date(group.chatOpenAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      )}
    </AppCard>
  );
}

interface GroupMemberCardProps {
  member: GroupMember;
}

export function GroupMemberCard({ member }: GroupMemberCardProps) {
  return (
    <AppCard variant="group" animate={false}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className={
            member.showPhoto
              ? "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 font-bold"
              : "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-bold text-muted"
          }
        >
          {member.firstName[0]}
        </div>
        <div>
          <h3 className="font-semibold">{member.firstName}</h3>
          <p className="text-xs text-muted">First name only · no last name shown</p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="section-label">Public prompts</p>
        {member.publicPrompts.slice(0, 3).map((prompt) => (
          <div key={prompt.promptKey} className="glass-panel rounded-xl p-3">
            <p className="text-xs text-purple-300">{prompt.label}</p>
            <p className="text-sm mt-0.5">{prompt.answer}</p>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
