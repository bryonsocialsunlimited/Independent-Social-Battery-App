import { type NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api/response";
import { outingsService } from "@/lib/services";

export async function GET(request: NextRequest) {
  const cityId = request.nextUrl.searchParams.get("cityId");
  const categoryId = request.nextUrl.searchParams.get("categoryId");

  if (cityId) {
    return apiSuccess(outingsService.getByCity(cityId));
  }
  if (categoryId) {
    return apiSuccess(outingsService.getByCategory(categoryId));
  }

  return apiSuccess(outingsService.getAll());
}
