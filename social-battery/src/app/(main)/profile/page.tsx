import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { currentUser, membershipPlans } from "@/lib/mock-data";
import {
  CreditCard,
  Bell,
  Shield,
  Gift,
  Wallet,
  ChevronRight,
  IdCard,
  Percent,
} from "lucide-react";

const menuItems = [
  {
    icon: Gift,
    label: "Rewards & points",
    value: `${currentUser.points} pts`,
    href: "#",
  },
  {
    icon: Wallet,
    label: "Credits",
    value: `$${currentUser.credits}`,
    href: "#",
  },
  {
    icon: CreditCard,
    label: "Memberships",
    value: currentUser.membershipType === "none" ? "None" : currentUser.membershipLabel,
    href: "#",
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "#",
  },
  {
    icon: CreditCard,
    label: "Payment settings",
    href: "#",
  },
  {
    icon: IdCard,
    label: "ID verification",
    value: currentUser.idVerificationStatus,
    href: "#",
  },
  {
    icon: Percent,
    label: "Discounted access",
    value: currentUser.discountedAccessStatus.replace("_", " "),
    href: "#",
  },
  {
    icon: Shield,
    label: "Legal & support",
    href: "#",
  },
];

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" />

      {/* Avatar & stats */}
      <Card className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 text-2xl font-bold">
          {currentUser.firstName[0]}
        </div>
        <div>
          <h2 className="text-xl font-bold">{currentUser.firstName}</h2>
          <p className="text-sm text-muted">{currentUser.email}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="success">ID verified</Badge>
            <Badge>{currentUser.upcomingOutingsCount} upcoming</Badge>
          </div>
        </div>
      </Card>

      {/* Membership upsell */}
      <section className="mt-6">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">
          Memberships
        </h3>
        <div className="space-y-3">
          {membershipPlans.map((plan) => (
            <Card key={plan.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{plan.name}</p>
                <p className="text-xs text-muted">{plan.description}</p>
              </div>
              <p className="font-bold text-purple-300">${plan.monthlyPrice}/mo</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="mt-6">
        <div className="space-y-2">
          {menuItems.map(({ icon: Icon, label, value, href }) => (
            <Link key={label} href={href}>
              <Card className="flex items-center justify-between hover:bg-white/6 transition-all active:scale-[0.98] py-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-purple-300" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {value && (
                    <span className="text-xs text-muted capitalize">{value}</span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Link href="/admin" className="block mt-6 text-center text-xs text-muted hover:text-foreground">
        Admin dashboard →
      </Link>
    </div>
  );
}
