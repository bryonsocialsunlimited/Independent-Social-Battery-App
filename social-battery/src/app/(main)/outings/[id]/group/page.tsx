import { notFound } from "next/navigation";
import Link from "next/link";
import { getOutingById, sampleGroup } from "@/lib/mock-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle, Users, ArrowLeft } from "lucide-react";

interface GroupPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params;
  const outing = getOutingById(id);
  if (!outing) notFound();

  const group = sampleGroup.outingId === id ? sampleGroup : null;
  if (!group) {
    return (
      <div>
        <Link href={`/outings/${id}`} className="inline-flex items-center gap-1 text-sm text-muted mb-4">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <PageHeader title="Your group" subtitle="Group assignment pending" />
        <Card>
          <p className="text-sm text-muted">
            We&apos;re still forming your group of 3–6 people. You&apos;ll see limited member info once confirmed.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Link href={`/outings/${id}`} className="inline-flex items-center gap-1 text-sm text-muted mb-4 hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to outing
      </Link>

      <PageHeader
        title="Your group"
        subtitle={outing.title}
      />

      <div className="flex items-center gap-2 mb-6">
        <Badge variant="success">Confirmed</Badge>
        <Badge>
          <Users className="h-3 w-3 mr-1 inline" />
          {group.members.length} of {group.maxSize} max
        </Badge>
      </div>

      <Card className="mb-6 border border-purple-500/20">
        <div className="flex gap-3">
          <MessageCircle className="h-5 w-5 text-purple-300 shrink-0" />
          <p className="text-xs text-muted leading-relaxed">
            Group chat opens 1 hour before the outing ({new Date(group.chatOpenAt).toLocaleString()})
            and closes at outing end. Only first names and approved public prompts are shown below.
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        {group.members.map((member) => (
          <Card key={member.id}>
            <div className="flex items-center gap-3 mb-3">
              {member.showPhoto ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 font-bold">
                  {member.firstName[0]}
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-bold text-muted">
                  {member.firstName[0]}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{member.firstName}</h3>
                <p className="text-xs text-muted">First name only · no last name shown</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted uppercase tracking-wider">Public prompts</p>
              {member.publicPrompts.slice(0, 3).map((prompt) => (
                <div key={prompt.promptKey} className="glass-panel rounded-xl p-3">
                  <p className="text-xs text-purple-300">{prompt.label}</p>
                  <p className="text-sm mt-0.5">{prompt.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
