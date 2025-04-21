import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper";
import { employeesController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => employeesController.employeeGetAll(request, context),
        "GET",
        "employee"
    )
}

export async function POST(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => employeesController.employeeCreate(request, context),
        "POST",
        "employee"
    )
}
