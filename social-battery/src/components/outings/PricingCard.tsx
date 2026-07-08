import type { OutingPricing } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PricingCardProps {
  pricing: OutingPricing;
  selected?: "one_off" | "category_pass" | "all_access";
  onSelect?: (type: "one_off" | "category_pass" | "all_access") => void;
}

const options = [
  { key: "one_off" as const, label: "One-off", priceKey: "oneOff" as const, desc: "Single outing purchase" },
  { key: "category_pass" as const, label: "Category Pass", priceKey: "categoryPass" as const, desc: "Member price · $16/mo" },
  { key: "all_access" as const, label: "All Access Pass", priceKey: "allAccess" as const, desc: "Best price · $60/mo" },
];

export function PricingCard({ pricing, selected, onSelect }: PricingCardProps) {
  const savings = pricing.oneOff - pricing.allAccess;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Pricing</h3>
        {savings > 0 && (
          <Badge variant="success">Save up to ${savings} with All Access</Badge>
        )}
      </div>
      {options.map((opt) => {
        const price = pricing[opt.priceKey];
        const isSelected = selected === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onSelect?.(opt.key)}
            className="w-full text-left"
          >
            <Card
              className={cn(
                "transition-all",
                isSelected && "ring-1 ring-purple-500/50 bg-purple-500/10"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{opt.label}</p>
                  <p className="text-xs text-muted mt-0.5">{opt.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-300">${price}</p>
                  {opt.key !== "one_off" && (
                    <p className="text-xs text-emerald-400">
                      Save ${pricing.oneOff - price}
                    </p>
                  )}
                </div>
              </div>
              {isSelected && (
                <div className="mt-2 flex items-center gap-1 text-xs text-purple-300">
                  <Check className="h-3.5 w-3.5" /> Selected
                </div>
              )}
            </Card>
          </button>
        );
      })}
      {pricing.discounted !== undefined && (
        <Card className="border border-emerald-500/20">
          <p className="text-sm">
            <span className="text-emerald-300 font-medium">Discounted access:</span>{" "}
            ${pricing.discounted} (approved applicants)
          </p>
        </Card>
      )}
    </div>
  );
}
