"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getOutingById, getCategoryById } from "@/lib/mock-data";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingCard } from "@/components/cards";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { mockPaymentAdapter } from "@/lib/adapters/stripe";
import { Calendar, MapPin, Users, Check, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function OutingDetailPage() {
  const params = useParams();
  const outing = getOutingById(params.id as string);
  const [priceType, setPriceType] = useState<"one_off" | "category_pass" | "all_access">("one_off");
  const [discountCode, setDiscountCode] = useState("");
  const [booking, setBooking] = useState(false);

  if (!outing) notFound();

  const category = getCategoryById(outing.categoryId);

  const handleBook = async () => {
    setBooking(true);
    await mockPaymentAdapter.createCheckoutSession({
      outingId: outing.id,
      priceType,
      amount: outing.pricing[priceType === "one_off" ? "oneOff" : priceType === "category_pass" ? "categoryPass" : "allAccess"],
      discountCode: discountCode || undefined,
    });
    setBooking(false);
    alert(
      mockPaymentAdapter.validateBypassCode(discountCode)
        ? "Booking confirmed with bypass code — $0 due!"
        : "Checkout flow placeholder — Stripe integration coming soon."
    );
  };

  return (
    <div>
      <Link href="/explore" className="inline-flex items-center gap-1 text-sm text-muted mb-4 hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className={cn("h-40 -mx-5 mb-6 bg-gradient-to-br", outing.imageGradient)} />

      <PageHeader title={outing.title} />

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge>{category?.icon} {category?.name}</Badge>
        <Badge variant="live">Boston</Badge>
        <Badge>Groups of {outing.groupSizeMin}–{outing.groupSizeMax}</Badge>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-6">{outing.description}</p>

      <div className="space-y-2 text-sm mb-6">
        <div className="flex items-center gap-2 text-muted">
          <Calendar className="h-4 w-4" />
          {outing.date} · {outing.startTime} – {outing.endTime}
        </div>
        <div className="flex items-center gap-2 text-muted">
          <MapPin className="h-4 w-4" />
          {outing.venue} · {outing.neighborhood}
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Users className="h-4 w-4" />
          {outing.spotsRemaining} spots remaining
        </div>
      </div>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">What&apos;s included</h3>
        <ul className="space-y-1">
          {outing.included.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted">
              <Check className="h-4 w-4 text-emerald-400" /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Not included</h3>
        <ul className="space-y-1">
          {outing.notIncluded.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted">
              <X className="h-4 w-4 text-red-400" /> {item}
            </li>
          ))}
        </ul>
      </section>

      {outing.extras.length > 0 && (
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Extras</h3>
          {outing.extras.map((extra, i) => (
            <Card key={i} className="mb-2">
              <p className="text-sm font-medium capitalize">{extra.type}</p>
              <p className="text-xs text-muted">{extra.description}</p>
              <Badge className="mt-2" variant={extra.includedInPrice ? "success" : "default"}>
                {extra.includedInPrice ? "Included" : "Separate cost"}
              </Badge>
            </Card>
          ))}
        </section>
      )}

      <Card className="mb-6 text-sm text-muted">
        <p><strong className="text-foreground">Accessibility:</strong> {outing.accessibilityNotes}</p>
        <p className="mt-2"><strong className="text-foreground">Cancellation:</strong> {outing.cancellationRules}</p>
        <p className="mt-2"><strong className="text-foreground">Tickets:</strong> {outing.ticketDeliveryNote}</p>
      </Card>

      <PricingCard pricing={outing.pricing} selected={priceType} onSelect={setPriceType} />

      <div className="mt-4">
        <label className="text-sm text-muted mb-1.5 block">Discount / beta code</label>
        <Input
          placeholder="Enter code (try SOCIALBETA)"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
      </div>

      <Button size="lg" className="w-full mt-6" onClick={handleBook} disabled={booking}>
        {booking ? "Processing..." : "Book this outing"}
      </Button>
    </div>
  );
}
