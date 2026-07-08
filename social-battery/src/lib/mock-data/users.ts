import type { Group, MockUser, UserProfile, UserBooking } from "@/lib/types";

export const mockUsers: MockUser[] = [
  { id: "user-1", firstName: "Alex", cityId: "boston", membershipType: "none", points: 240, outingsAttended: 3 },
  { id: "user-2", firstName: "Jordan", cityId: "boston", membershipType: "category_pass", points: 180, outingsAttended: 2 },
  { id: "user-3", firstName: "Sam", cityId: "boston", membershipType: "all_access", points: 520, outingsAttended: 6 },
  { id: "user-4", firstName: "Riley", cityId: "boston", membershipType: "none", points: 95, outingsAttended: 1 },
  { id: "user-5", firstName: "Morgan", cityId: "boston", membershipType: "category_pass", points: 310, outingsAttended: 4 },
  { id: "user-6", firstName: "Casey", cityId: "boston", membershipType: "none", points: 140, outingsAttended: 2 },
  { id: "user-7", firstName: "Taylor", cityId: "boston", membershipType: "all_access", points: 890, outingsAttended: 8 },
  { id: "user-8", firstName: "Drew", cityId: "boston", membershipType: "none", points: 60, outingsAttended: 1 },
];

export const currentUser: UserProfile = {
  id: "user-1",
  firstName: "Alex",
  email: "alex@example.com",
  cityId: "boston",
  points: 240,
  credits: 15,
  membershipType: "none",
  idVerificationStatus: "approved",
  discountedAccessStatus: "not_applied",
  upcomingOutingsCount: 2,
  pastOutingsCount: 3,
};

export const userBookings: UserBooking[] = [
  {
    id: "booking-1",
    outingId: "outing-1",
    status: "upcoming",
    groupStatus: "confirmed",
    ticketStatus: "confirmed",
    checkedIn: false,
    feedbackComplete: false,
    chatOpensIn: "2 days",
  },
  {
    id: "booking-2",
    outingId: "outing-2",
    status: "pending_group",
    groupStatus: "pending",
    ticketStatus: "confirmed",
    checkedIn: false,
    feedbackComplete: false,
  },
  {
    id: "booking-3",
    outingId: "outing-9",
    status: "past",
    groupStatus: "confirmed",
    ticketStatus: "delivered",
    checkedIn: true,
    feedbackComplete: true,
  },
  {
    id: "booking-4",
    outingId: "outing-10",
    status: "upcoming",
    groupStatus: "confirmed",
    ticketStatus: "confirmed",
    checkedIn: false,
    feedbackComplete: false,
    chatOpensIn: "5 hours",
  },
  {
    id: "booking-5",
    outingId: "outing-4",
    status: "past",
    groupStatus: "confirmed",
    ticketStatus: "delivered",
    checkedIn: true,
    feedbackComplete: false,
  },
];

export function getUserById(id: string): MockUser | undefined {
  return mockUsers.find((u) => u.id === id);
}

// Re-export sampleGroup from groups for backward compatibility
export { sampleGroup } from "./groups";
