import { type NextRequest } from "next/server";
import { apiError, apiSuccess } from "@/lib/api/response";
import { groupsService } from "@/lib/services";

export async function GET(request: NextRequest) {
  const outingId = request.nextUrl.searchParams.get("outingId");

  if (!outingId) {
    return apiError("outingId query parameter required");
  }

  const group = groupsService.getByOutingId(outingId);

  if (!group) {
    return apiError("Group not found", 404);
  }

  return apiSuccess(group);
}
