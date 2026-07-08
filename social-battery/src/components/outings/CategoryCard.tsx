import Link from "next/link";
import type { OutingCategory } from "@/lib/types";
import { cn } from "@/lib/utils/cn";

interface CategoryCardProps {
  category: OutingCategory;
  outingCount?: number;
  selected?: boolean;
}

export function CategoryCard({ category, outingCount, selected }: CategoryCardProps) {
  return (
    <Link
      href={`/explore?category=${category.id}`}
      className={cn(
        "glass-panel rounded-2xl p-4 transition-all hover:bg-white/6 active:scale-[0.97] block",
        selected && "ring-1 ring-purple-500/50 bg-purple-500/10"
      )}
    >
      <span className="text-3xl">{category.icon}</span>
      <h3 className="mt-2 font-semibold">{category.name}</h3>
      <p className="mt-1 text-xs text-muted line-clamp-2">{category.description}</p>
      {outingCount !== undefined && (
        <p className="mt-2 text-xs text-purple-300">{outingCount} outings</p>
      )}
    </Link>
  );
}
