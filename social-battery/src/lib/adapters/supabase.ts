/**
 * Supabase adapter interface — replace mock implementations with real client later.
 */
export interface SupabaseAdapter {
  auth: {
    signUp: (data: SignUpData) => Promise<{ userId: string } | { error: string }>;
    signIn: (email: string, password: string) => Promise<{ userId: string } | { error: string }>;
    signOut: () => Promise<void>;
    getSession: () => Promise<{ userId: string } | null>;
  };
  // Future: profiles, outings, bookings, groups, messages, etc.
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  cityId: string;
  password: string;
}

/** Mock adapter for prototype — logs actions, returns success */
export const mockSupabaseAdapter: SupabaseAdapter = {
  auth: {
    async signUp(data) {
      console.log("[mock supabase] signUp", data.email);
      return { userId: "mock-user-id" };
    },
    async signIn(email) {
      console.log("[mock supabase] signIn", email);
      return { userId: "mock-user-id" };
    },
    async signOut() {
      console.log("[mock supabase] signOut");
    },
    async getSession() {
      return null;
    },
  },
};

// Future: import { createClient } from '@supabase/supabase-js'
// export function createSupabaseClient(): SupabaseClient { ... }
