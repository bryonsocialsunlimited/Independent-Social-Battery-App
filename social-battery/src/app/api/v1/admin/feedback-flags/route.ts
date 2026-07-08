import { apiSuccess } from "@/lib/api/response";
import { adminService } from "@/lib/services";

export async function GET() {
  return apiSuccess(adminService.getFeedbackFlags());
}
