import type { OutingCategory } from "@/lib/types";

export const categories: OutingCategory[] = [
  {
    id: "movies",
    name: "Movies",
    description: "Curated screenings with post-show social time",
    icon: "🎬",
  },
  {
    id: "comedy",
    name: "Comedy",
    description: "Stand-up nights and laugh-filled group outings",
    icon: "🎤",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Live games and shared fan energy",
    icon: "⚾",
  },
  {
    id: "performing-arts",
    name: "Performing Arts",
    description: "Theater, musicals, orchestral performances & more",
    icon: "🎭",
  },
];

export function getCategoryById(id: string): OutingCategory | undefined {
  return categories.find((c) => c.id === id);
}
