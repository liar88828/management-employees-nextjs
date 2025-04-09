import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { employeeController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.employeeById(request, context),
		"GET",
		"employee",
		201
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => employeeController.employeeUpdate(request, context),
		"PUT",
		"employee"
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.employeeDelete(request, context),
		"DELETE",
		"employee"
	)
}
