"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cities } from "@/lib/mock-data";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    cityId: "boston",
    password: "",
    agreed: false,
  });

  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gradient">Join Social Battery</h1>
        <p className="mt-2 text-sm text-muted">Create your account to start exploring outings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-muted mb-1.5 block">First name</label>
            <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-muted mb-1.5 block">Last name <span className="text-xs">(private)</span></label>
            <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
          </div>
        </div>
        <div>
          <label className="text-sm text-muted mb-1.5 block">Email</label>
          <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-muted mb-1.5 block">Phone</label>
          <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="For reminders" />
        </div>
        <div>
          <label className="text-sm text-muted mb-1.5 block">Date of birth</label>
          <Input type="date" value={form.dateOfBirth} onChange={(e) => update("dateOfBirth", e.target.value)} required />
          <p className="text-xs text-muted mt-1">Must be 21+ to join</p>
        </div>
        <div>
          <label className="text-sm text-muted mb-1.5 block">City</label>
          <select
            value={form.cityId}
            onChange={(e) => update("cityId", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none focus:border-purple-500/50"
          >
            {cities.map((c) => (
              <option key={c.id} value={c.id} disabled={c.status !== "live"}>
                {c.name}, {c.state} {c.status !== "live" ? "(Waitlist)" : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted mb-1.5 block">Password</label>
          <Input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
        </div>
        <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => update("agreed", e.target.checked)}
            className="mt-1 rounded"
            required
          />
          <span>
            I agree to the terms of service, privacy policy, and understand cancellation/no-show policies.
          </span>
        </label>
        <Button type="submit" size="lg" className="w-full mt-4" disabled={!form.agreed}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-400 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
