import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper";
import { ceremonyController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {

    return await ResponseJson(
        async () => ceremonyController.employeeById(request, context),
        "GET",
        "ceremony"
    )
}

export async function PUT(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => ceremonyController.employeeUpdate(request, context),
        "PUT",
        "ceremony"
    )
}

export async function DELETE(request: NextRequest, context: TContext) {

    return await ResponseJson(
        async () => ceremonyController.employeeDelete(request, context),
        "DELETE",
        "ceremony"
    )
}
