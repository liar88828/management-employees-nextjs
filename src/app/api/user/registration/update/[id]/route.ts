import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { employeesController } from "@/server/controller";
import { authApi } from "@/server/lib/api";

export async function GET(request: NextRequest, context: TContext) {
    console.log('test ')
    return ResponseJson(
        async () => employeesController.findByUserId(request, context),
        "GET",
        "employee",
        201
    )
}

export async function POST(request: NextRequest, context: TContext) {
    await authApi(request)
    return ResponseJson(
        async () => employeesController.createByUserId(request, context),
        "GET",
        "employee",
        201
    )
}

export async function PUT(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => employeesController.employeeUpdate(request, context),
        "PUT",
        "employee"
    )
}

export async function DELETE(request: NextRequest, context: TContext) {
    return ResponseJson(
        async () => employeesController.employeeDelete(request, context),
        "DELETE",
        "employee"
    )
}
