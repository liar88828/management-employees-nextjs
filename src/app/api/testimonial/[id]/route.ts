import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper";
import { ceremonyController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {

    return await ResponseJson(
        async () => ceremonyController.findById(request, context),
        "GET",
        "ceremony"
    )
}

export async function PUT(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => ceremonyController.updateOne(request, context),
        "PUT",
        "ceremony"
    )
}

export async function DELETE(request: NextRequest, context: TContext) {

    return await ResponseJson(
        async () => ceremonyController.deleteOne(request, context),
        "DELETE",
        "ceremony"
    )
}
