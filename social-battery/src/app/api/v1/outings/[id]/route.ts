import { apiError, apiSuccess } from "@/lib/api/response";
import { outingsService } from "@/lib/services";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const outing = outingsService.getById(id);

  if (!outing) {
    return apiError("Outing not found", 404);
  }

  return apiSuccess(outing);
}
