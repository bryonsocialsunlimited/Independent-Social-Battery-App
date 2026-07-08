"use client";

import { cities } from "@/lib/mock-data";
import type { City } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import { MapPin } from "lucide-react";

interface CitySelectorProps {
  selectedCityId: string;
  onSelect: (city: City) => void;
  compact?: boolean;
}

export function CitySelector({ selectedCityId, onSelect, compact }: CitySelectorProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto scrollbar-hide", compact ? "" : "pb-1")}>
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => city.status === "live" && onSelect(city)}
          disabled={city.status !== "live"}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
            selectedCityId === city.id
              ? "bg-purple-600/30 text-purple-200 ring-1 ring-purple-500/40"
              : city.status === "live"
                ? "glass-panel hover:bg-white/8"
                : "glass-panel opacity-50 cursor-not-allowed"
          )}
        >
          <MapPin className="h-3.5 w-3.5" />
          {city.name}
          {city.status === "waitlist" && (
            <span className="text-[10px] text-amber-400 ml-1">Waitlist</span>
          )}
        </button>
      ))}
    </div>
  );
}
