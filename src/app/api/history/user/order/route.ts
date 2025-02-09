import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { orderController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    return ResponseJson(
        async () => orderController.findHistoryUser(request, context),
        "GET",
        "order",
        200
    )
}
