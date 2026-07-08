import {
  currentUser,
  userBookings,
  mockUsers,
  getUserById,
} from "@/lib/mock-data";

export const usersService = {
  getCurrentUser: () => currentUser,
  getBookings: () => userBookings,
  getById: (id: string) => getUserById(id),
  getAll: () => mockUsers,
};
