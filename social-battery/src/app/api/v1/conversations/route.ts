import { apiSuccess } from "@/lib/api/response";
import { messagesService } from "@/lib/services";

export async function GET() {
  return apiSuccess(messagesService.getAll());
}
