import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { productController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => productController.findHistory(request, context),
        "GET",
        "product",
        201
    )
}
