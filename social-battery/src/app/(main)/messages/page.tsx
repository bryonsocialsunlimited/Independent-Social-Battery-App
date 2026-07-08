import { PageHeader } from "@/components/layout/PageHeader";
import { ConversationCard } from "@/components/messages/ConversationCard";
import { Card } from "@/components/ui/Card";
import { getActiveConversations, getPastConversations } from "@/lib/mock-data";
import { Lock, Heart } from "lucide-react";

export default function MessagesPage() {
  const active = getActiveConversations();
  const past = getPastConversations();

  return (
    <div>
      <PageHeader title="Messages" subtitle="Group chats & friend DMs" />

      {/* Rules callout */}
      <Card className="mb-6 border border-purple-500/20">
        <div className="flex gap-3">
          <Lock className="h-5 w-5 text-purple-300 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Messaging rules</p>
            <p className="text-muted mt-1 text-xs leading-relaxed">
              Group chat opens 1 hour before your outing and closes at end time.
              Direct messages unlock only after mutual &quot;become friends&quot; post-outing.
            </p>
          </div>
        </div>
      </Card>

      <section>
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
          Active & upcoming
        </h2>
        <div className="space-y-3">
          {active.map((conv) => (
            <ConversationCard key={conv.id} conversation={conv} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
          Past conversations
        </h2>
        <div className="space-y-3">
          {past.map((conv) => (
            <ConversationCard key={conv.id} conversation={conv} />
          ))}
        </div>
      </section>

      {/* DM placeholder */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
          Friend DMs
        </h2>
        <Card className="border border-cyan-500/20">
          <div className="flex gap-3 items-start">
            <Heart className="h-5 w-5 text-cyan-300 shrink-0" />
            <div>
              <p className="font-medium text-sm">Post-friendship DMs</p>
              <p className="text-xs text-muted mt-1">
                After an outing, choose &quot;become friends&quot; with group members.
                When both choose yes, direct messaging unlocks here.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
