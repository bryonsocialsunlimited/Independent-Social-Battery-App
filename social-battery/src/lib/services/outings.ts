import {
  outings,
  getOutingById,
  getOutingsByCity,
  getOutingsByCategory,
  getRecommendedOutings,
} from "@/lib/mock-data";

export const outingsService = {
  getAll: () => outings,
  getById: (id: string) => getOutingById(id),
  getByCity: (cityId: string) => getOutingsByCity(cityId),
  getByCategory: (categoryId: string) => getOutingsByCategory(categoryId),
  getRecommended: (cityId: string, limit?: number) => getRecommendedOutings(cityId, limit),
};
