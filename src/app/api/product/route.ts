import { NextRequest } from "next/server"
import { ResponseJson } from "@/utils/requestHelper"
import { TContext } from "@/interface/server/param"
import { productController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    // console.log('is fetching...')
    return await ResponseJson(
        async () => productController.findAll(request, context),
        "GET",
        "product"
    )
}

export async function POST(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => productController.createOne(request, context),
        "POST",
        "product"
    )
}
