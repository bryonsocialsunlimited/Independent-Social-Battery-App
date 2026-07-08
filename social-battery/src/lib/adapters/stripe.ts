/**
 * Stripe payment adapter interface — connect real Stripe Checkout later.
 */
export interface CheckoutSession {
  outingId: string;
  priceType: "one_off" | "category_pass" | "all_access";
  amount: number;
  discountCode?: string;
}

export interface PaymentAdapter {
  createCheckoutSession: (session: CheckoutSession) => Promise<{ url: string } | { error: string }>;
  validateBypassCode: (code: string) => boolean;
}

const BYPASS_CODES = ["SOCIALBETA", "ADMINZERO"];

export const mockPaymentAdapter: PaymentAdapter = {
  async createCheckoutSession(session) {
    if (session.discountCode && BYPASS_CODES.includes(session.discountCode.toUpperCase())) {
      console.log("[mock stripe] bypass code applied — $0 booking");
      return { url: "/outings?booked=true" };
    }
    console.log("[mock stripe] createCheckoutSession", session);
    return { url: "/outings?checkout=pending" };
  },
  validateBypassCode(code) {
    return BYPASS_CODES.includes(code.toUpperCase());
  },
};
