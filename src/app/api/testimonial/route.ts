import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper";
import { ceremonyController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {

    return await ResponseJson(
        async () => ceremonyController.findAll(request, context),
        "GET",
        "ceremony"
    )
}

export async function POST(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => ceremonyController.createOne(request, context),
        "POST",
        "ceremony"
    )
}
