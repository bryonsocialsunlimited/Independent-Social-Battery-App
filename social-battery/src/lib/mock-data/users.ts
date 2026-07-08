import type { Group, UserProfile, UserBooking } from "@/lib/types";

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

export const sampleGroup: Group = {
  id: "group-1",
  outingId: "outing-1",
  status: "confirmed",
  minSize: 3,
  maxSize: 6,
  chatOpenAt: "2026-07-12T18:00:00",
  chatCloseAt: "2026-07-12T22:30:00",
  members: [
    {
      id: "user-1",
      firstName: "Alex",
      showPhoto: true,
      photoUrl: undefined,
      publicPrompts: [
        { promptKey: "occupation", label: "Occupation", answer: "Product designer" },
        { promptKey: "fun_fact", label: "A fun fact", answer: "I once hiked all 48 NH peaks" },
        { promptKey: "last_movie", label: "Last movie you saw", answer: "Dune: Part Two" },
      ],
    },
    {
      id: "user-2",
      firstName: "Jordan",
      showPhoto: false,
      publicPrompts: [
        { promptKey: "sports", label: "Sports interests", answer: "Pick-up basketball & rowing" },
        { promptKey: "dream_job", label: "Dream job", answer: "Running a community bookstore" },
        { promptKey: "art_types", label: "Types of art you like", answer: "Street photography" },
      ],
    },
    {
      id: "user-3",
      firstName: "Sam",
      showPhoto: true,
      publicPrompts: [
        { promptKey: "work_preference", label: "Computers, art, or people?", answer: "People — I'm a nurse" },
        { promptKey: "last_trip", label: "Last trip you went on", answer: "Portland, ME for a food weekend" },
        { promptKey: "fun_fact", label: "A fun fact", answer: "I speak three languages" },
      ],
    },
    {
      id: "user-4",
      firstName: "Riley",
      showPhoto: false,
      publicPrompts: [
        { promptKey: "occupation", label: "Occupation", answer: "Software engineer" },
        { promptKey: "last_movie", label: "Last movie you saw", answer: "Everything Everywhere" },
        { promptKey: "sports", label: "Sports interests", answer: "Skiing in winter, tennis in summer" },
      ],
    },
  ],
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
];
