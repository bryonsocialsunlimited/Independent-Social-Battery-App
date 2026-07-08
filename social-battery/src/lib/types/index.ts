export type CityStatus = "live" | "waitlist" | "future";

export interface City {
  id: string;
  name: string;
  state: string;
  status: CityStatus;
}

export type OutingCategoryName =
  | "Movies"
  | "Comedy"
  | "Sports"
  | "Performing Arts";

export interface OutingCategory {
  id: string;
  name: OutingCategoryName;
  description: string;
  icon: string;
}

export interface OutingPricing {
  oneOff: number;
  categoryPass: number;
  allAccess: number;
  discounted?: number;
}

export interface OutingExtra {
  type: string;
  description: string;
  includedInPrice: boolean;
}

export type OutingStatus =
  | "draft"
  | "published"
  | "open"
  | "waitlist"
  | "grouping"
  | "confirmed"
  | "chat_open"
  | "in_progress"
  | "ended"
  | "feedback_open"
  | "closed"
  | "cancelled";

export interface Outing {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  cityId: string;
  venue: string;
  neighborhood: string;
  date: string;
  startTime: string;
  endTime: string;
  groupSizeMin: number;
  groupSizeMax: number;
  pricing: OutingPricing;
  included: string[];
  notIncluded: string[];
  extras: OutingExtra[];
  accessibilityNotes: string;
  cancellationRules: string;
  ticketDeliveryNote: string;
  spotsRemaining: number;
  status: OutingStatus;
  imageGradient: string;
}

export interface PublicPrompt {
  promptKey: string;
  label: string;
  answer: string;
}

export interface GroupMember {
  id: string;
  firstName: string;
  photoUrl?: string;
  showPhoto: boolean;
  publicPrompts: PublicPrompt[];
}

export type GroupStatus = "pending" | "confirmed" | "below_minimum" | "merged";

export interface Group {
  id: string;
  outingId: string;
  status: GroupStatus;
  members: GroupMember[];
  chatOpenAt: string;
  chatCloseAt: string;
  minSize: number;
  maxSize: number;
}

export type ConversationType = "group" | "dm";
export type ConversationStatus = "locked" | "active" | "read_only";

export interface Conversation {
  id: string;
  type: ConversationType;
  title: string;
  subtitle: string;
  status: ConversationStatus;
  lastMessage?: string;
  lastMessageAt?: string;
  outingId?: string;
  groupId?: string;
  opensAt?: string;
  closesAt?: string;
  unreadCount?: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  email: string;
  cityId: string;
  points: number;
  credits: number;
  membershipType: "none" | "category_pass" | "all_access";
  membershipLabel?: string;
  idVerificationStatus: "not_started" | "pending" | "approved" | "rejected";
  discountedAccessStatus:
    | "not_applied"
    | "pending"
    | "approved"
    | "rejected";
  upcomingOutingsCount: number;
  pastOutingsCount: number;
}

export interface UserBooking {
  id: string;
  outingId: string;
  status: "upcoming" | "pending_group" | "past";
  groupStatus: GroupStatus;
  ticketStatus: "confirmed" | "pending" | "delivered";
  checkedIn: boolean;
  feedbackComplete: boolean;
  chatOpensIn?: string;
}

export interface AdminMetric {
  id: string;
  label: string;
  value: number | string;
  severity: "critical" | "warning" | "info";
  tab?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
}
