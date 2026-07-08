import { groups, getGroupByOutingId, getGroupById } from "@/lib/mock-data";

export const groupsService = {
  getAll: () => groups,
  getByOutingId: (outingId: string) => getGroupByOutingId(outingId),
  getById: (id: string) => getGroupById(id),
};
