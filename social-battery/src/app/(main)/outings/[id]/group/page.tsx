import { notFound } from "next/navigation";
import Link from "next/link";
import { getOutingById, getGroupByOutingId } from "@/lib/mock-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppCard, GroupMemberCard } from "@/components/cards";
import { Badge } from "@/components/ui/Badge";
import { StaggerList, StaggerItem } from "@/components/motion/PageTransition";
import { routes } from "@/lib/routes";
import { MessageCircle, Users, ArrowLeft } from "lucide-react";

interface GroupPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const outing = getOutingById(id);
  if (!outing) notFound();

  const group = getGroupByOutingId(id);

  if (!group) {
    return (
      <div>
        <Link
          href={routes.main.outingDetail(id)}
          className="inline-flex items-center gap-1 text-sm text-muted mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <PageHeader title="Your group" subtitle="Group assignment pending" />
        <AppCard>
          <p className="text-sm text-muted">
            We&apos;re still forming your group of 3–6 people. You&apos;ll see limited member info once confirmed.
          </p>
        </AppCard>
      </div>
    );
  }

  const statusLabel =
    group.status === "confirmed"
      ? { label: "Confirmed", variant: "success" as const }
      : group.status === "below_minimum"
        ? { label: "Below minimum", variant: "warning" as const }
        : { label: "Forming", variant: "warning" as const };

  return (
    <div>
      <Link
        href={routes.main.outingDetail(id)}
        className="inline-flex items-center gap-1 text-sm text-muted mb-4 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to outing
      </Link>

      <PageHeader title="Your group" subtitle={outing.title} />

      <div className="flex items-center gap-2 mb-6">
        <Badge variant={statusLabel.variant}>{statusLabel.label}</Badge>
        <Badge>
          <Users className="h-3 w-3 mr-1 inline" />
          {group.members.length} of {group.maxSize} max
        </Badge>
      </div>

      <AppCard className="mb-6 border border-purple-500/20">
        <div className="flex gap-3">
          <MessageCircle className="h-5 w-5 text-purple-300 shrink-0" />
          <p className="text-xs text-muted leading-relaxed">
            Group chat opens 1 hour before the outing (
            {new Date(group.chatOpenAt).toLocaleString()}) and closes at outing end. Only first
            names and approved public prompts are shown below.
          </p>
        </div>
      </AppCard>

      <StaggerList className="space-y-4">
        {group.members.map((member) => (
          <StaggerItem key={member.id}>
            <GroupMemberCard member={member} />
          </StaggerItem>
        ))}
      </StaggerList>
    </div>
  );
}
