import type { Group } from "@/lib/types";

export const groups: Group[] = [
  {
    id: "group-1",
    outingId: "outing-1",
    status: "confirmed",
    minSize: 3,
    maxSize: 6,
    chatOpenAt: "2026-07-12T18:00:00",
    chatCloseAt: "2026-07-12T22:30:00",
    members: [
      {
        id: "user-1",
        firstName: "Alex",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Product designer" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I once hiked all 48 NH peaks" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Dune: Part Two" },
        ],
      },
      {
        id: "user-2",
        firstName: "Jordan",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "sports", label: "Sports interests", answer: "Pick-up basketball & rowing" },
          { promptKey: "dream_job", label: "Dream job", answer: "Running a community bookstore" },
          { promptKey: "art_types", label: "Types of art you like", answer: "Street photography" },
        ],
      },
      {
        id: "user-3",
        firstName: "Sam",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "work_preference", label: "Computers, art, or people?", answer: "People — I'm a nurse" },
          { promptKey: "last_trip", label: "Last trip you went on", answer: "Portland, ME for a food weekend" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I speak three languages" },
        ],
      },
      {
        id: "user-4",
        firstName: "Riley",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Software engineer" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Everything Everywhere" },
          { promptKey: "sports", label: "Sports interests", answer: "Skiing in winter, tennis in summer" },
        ],
      },
    ],
  },
  {
    id: "group-2",
    outingId: "outing-9",
    status: "confirmed",
    minSize: 3,
    maxSize: 6,
    chatOpenAt: "2026-06-28T18:00:00",
    chatCloseAt: "2026-06-28T21:30:00",
    members: [
      {
        id: "user-1",
        firstName: "Alex",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Product designer" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I once hiked all 48 NH peaks" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Casablanca (revival)" },
        ],
      },
      {
        id: "user-2",
        firstName: "Jordan",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "sports", label: "Sports interests", answer: "Pick-up basketball & rowing" },
          { promptKey: "dream_job", label: "Dream job", answer: "Running a community bookstore" },
          { promptKey: "art_types", label: "Types of art you like", answer: "Film noir" },
        ],
      },
      {
        id: "user-5",
        firstName: "Morgan",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Grad student in urban planning" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I collect vintage movie posters" },
          { promptKey: "last_trip", label: "Last trip you went on", answer: "Montreal for jazz fest" },
        ],
      },
      {
        id: "user-6",
        firstName: "Casey",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "work_preference", label: "Computers, art, or people?", answer: "Art — gallery coordinator" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "The Godfather" },
          { promptKey: "sports", label: "Sports interests", answer: "Weekend cycling" },
        ],
      },
      {
        id: "user-7",
        firstName: "Taylor",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Marketing manager" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I host a monthly book club" },
          { promptKey: "last_trip", label: "Last trip you went on", answer: "Cape Cod beach weekend" },
        ],
      },
    ],
  },
  {
    id: "group-3",
    outingId: "outing-2",
    status: "pending",
    minSize: 3,
    maxSize: 6,
    chatOpenAt: "2026-07-15T19:00:00",
    chatCloseAt: "2026-07-15T23:00:00",
    members: [
      {
        id: "user-1",
        firstName: "Alex",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Product designer" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I once hiked all 48 NH peaks" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Dune: Part Two" },
        ],
      },
      {
        id: "user-8",
        firstName: "Drew",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Stand-up comedian (open mic nights)" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I've seen 200+ comedy shows" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Airplane!" },
        ],
      },
    ],
  },
  {
    id: "group-4",
    outingId: "outing-3",
    status: "below_minimum",
    minSize: 3,
    maxSize: 6,
    chatOpenAt: "2026-07-18T18:10:00",
    chatCloseAt: "2026-07-18T22:30:00",
    members: [
      {
        id: "user-9",
        firstName: "Jamie",
        showPhoto: true,
        publicPrompts: [
          { promptKey: "sports", label: "Sports interests", answer: "Red Sox season ticket holder" },
          { promptKey: "occupation", label: "Occupation", answer: "Physical therapist" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I've been to every MLB park" },
        ],
      },
      {
        id: "user-10",
        firstName: "Quinn",
        showPhoto: false,
        publicPrompts: [
          { promptKey: "occupation", label: "Occupation", answer: "Data analyst" },
          { promptKey: "last_movie", label: "Last movie you saw", answer: "Moneyball" },
          { promptKey: "fun_fact", label: "A fun fact", answer: "I play in a softball league" },
        ],
      },
    ],
  },
];

export const sampleGroup = groups[0];

export function getGroupByOutingId(outingId: string): Group | undefined {
  return groups.find((g) => g.outingId === outingId);
}

export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}
