const API_BASE = "/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.error ?? res.statusText);
  }

  return res.json() as Promise<T>;
}

export const api = {
  outings: {
    list: (params?: { cityId?: string; categoryId?: string }) => {
      const search = new URLSearchParams();
      if (params?.cityId) search.set("cityId", params.cityId);
      if (params?.categoryId) search.set("categoryId", params.categoryId);
      const qs = search.toString();
      return request<{ data: unknown[] }>(`/outings${qs ? `?${qs}` : ""}`);
    },
    get: (id: string) => request<{ data: unknown }>(`/outings/${id}`),
  },
  users: {
    me: () => request<{ data: unknown }>("/users/me"),
    bookings: () => request<{ data: unknown[] }>("/users/me/bookings"),
  },
  groups: {
    byOuting: (outingId: string) => request<{ data: unknown }>(`/groups?outingId=${outingId}`),
  },
  conversations: () => request<{ data: unknown[] }>("/conversations"),
  memberships: () => request<{ data: unknown[] }>("/memberships"),
  rewards: () => request<{ data: unknown }>("/rewards"),
  admin: {
    metrics: () => request<{ data: unknown[] }>("/admin/metrics"),
    feedbackFlags: () => request<{ data: unknown[] }>("/admin/feedback-flags"),
  },
};
