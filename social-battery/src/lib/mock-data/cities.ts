import type { City } from "@/lib/types";

export const cities: City[] = [
  { id: "boston", name: "Boston", state: "MA", status: "live" },
  { id: "worcester", name: "Worcester", state: "MA", status: "waitlist" },
  { id: "providence", name: "Providence", state: "RI", status: "waitlist" },
];

export function getCityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}

export function getLiveCities(): City[] {
  return cities.filter((c) => c.status === "live");
}

export function getWaitlistCities(): City[] {
  return cities.filter((c) => c.status === "waitlist");
}
