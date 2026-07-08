import type { Conversation } from "@/lib/types";

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    type: "group",
    title: "Indie Film Night + Dessert",
    subtitle: "Group of 4 · Opens in 2 days",
    status: "locked",
    lastMessage: "Group chat opens 1 hour before the outing.",
    outingId: "outing-1",
    groupId: "group-1",
    opensAt: "2026-07-12T18:00:00",
    closesAt: "2026-07-12T22:30:00",
  },
  {
    id: "conv-2",
    type: "group",
    title: "Classic Film Revival",
    subtitle: "Group of 5 · Ended",
    status: "read_only",
    lastMessage: "Great meeting everyone! 🎬",
    lastMessageAt: "2026-06-28T21:45:00",
    outingId: "outing-9",
    groupId: "group-2",
    opensAt: "2026-06-28T18:00:00",
    closesAt: "2026-06-28T21:30:00",
  },
  {
    id: "conv-3",
    type: "group",
    title: "Comedy Cellar Showcase",
    subtitle: "Group forming · Chat locked",
    status: "locked",
    lastMessage: "Waiting for your group to be confirmed.",
    outingId: "outing-2",
    groupId: "group-3",
    opensAt: "2026-07-15T19:00:00",
    closesAt: "2026-07-15T23:00:00",
  },
  {
    id: "conv-4",
    type: "dm",
    title: "Jordan",
    subtitle: "Friends since Classic Film Revival",
    status: "active",
    lastMessage: "We should catch another outing soon!",
    lastMessageAt: "2026-07-01T14:20:00",
    unreadCount: 1,
  },
];

export function getActiveConversations(): Conversation[] {
  return conversations.filter((c) => c.status === "active" || c.status === "locked");
}

export function getPastConversations(): Conversation[] {
  return conversations.filter((c) => c.status === "read_only");
}
