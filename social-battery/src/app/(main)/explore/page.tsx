"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { CitySelector } from "@/components/ui/CitySelector";
import { CategoryCard } from "@/components/outings/CategoryCard";
import { OutingCard } from "@/components/outings/OutingCard";
import { Button } from "@/components/ui/Button";
import { categories, outings, currentUser } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

function ExploreContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [cityId, setCityId] = useState(currentUser.cityId);

  const filteredOutings = outings.filter((o) => {
    if (o.status === "ended") return false;
    if (o.cityId !== cityId) return false;
    if (categoryFilter && o.categoryId !== categoryFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title="Explore" subtitle="Browse outings or get suggestions" />

      <CitySelector selectedCityId={cityId} onSelect={(c) => setCityId(c.id)} />

      <Button variant="secondary" className="w-full mt-4 gap-2">
        <Sparkles className="h-4 w-4" />
        Suggest outings for me
      </Button>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              outingCount={outings.filter((o) => o.categoryId === cat.id && o.cityId === cityId).length}
              selected={categoryFilter === cat.id}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          {categoryFilter ? "Filtered outings" : "All outings"}
        </h2>
        <div className="space-y-4">
          {filteredOutings.length > 0 ? (
            filteredOutings.map((outing) => (
              <OutingCard key={outing.id} outing={outing} />
            ))
          ) : (
            <p className="text-sm text-muted text-center py-8">
              No outings found for this filter.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="text-muted">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
