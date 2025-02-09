import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { paymentController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    // console.log('is fetching...');

    return await ResponseJson(
        async () => paymentController.findAll(request, context),
        "GET",
        "product"
    )
}

export async function POST(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => paymentController.createOne(request, context),
        "POST",
        "product"
    )
}
