import {
  adminMetrics,
  adminTabs,
  membershipPlans,
  feedbackFlags,
  getOpenFeedbackFlags,
} from "@/lib/mock-data";

export const adminService = {
  getMetrics: () => adminMetrics,
  getTabs: () => adminTabs,
  getMembershipPlans: () => membershipPlans,
  getFeedbackFlags: () => feedbackFlags,
  getOpenFeedbackFlags: () => getOpenFeedbackFlags(),
};
