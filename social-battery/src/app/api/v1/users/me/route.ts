import { apiSuccess } from "@/lib/api/response";
import { usersService } from "@/lib/services";

export async function GET() {
  return apiSuccess(usersService.getCurrentUser());
}
