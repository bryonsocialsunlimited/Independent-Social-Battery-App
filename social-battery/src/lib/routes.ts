/**
 * Central route map for UI navigation and future API integration.
 * Pages import paths from here to keep routing consistent.
 */
export const routes = {
  landing: "/",
  auth: {
    login: "/login",
    signup: "/signup",
    onboarding: "/onboarding",
  },
  main: {
    home: "/home",
    explore: "/explore",
    outings: "/outings",
    outingDetail: (id: string) => `/outings/${id}`,
    outingGroup: (id: string) => `/outings/${id}/group`,
    messages: "/messages",
    profile: "/profile",
  },
  admin: "/admin",
} as const;

export const apiRoutes = {
  outings: "/api/v1/outings",
  outing: (id: string) => `/api/v1/outings/${id}`,
  usersMe: "/api/v1/users/me",
  userBookings: "/api/v1/users/me/bookings",
  groups: "/api/v1/groups",
  conversations: "/api/v1/conversations",
  memberships: "/api/v1/memberships",
  rewards: "/api/v1/rewards",
  adminMetrics: "/api/v1/admin/metrics",
  adminFeedbackFlags: "/api/v1/admin/feedback-flags",
} as const;
