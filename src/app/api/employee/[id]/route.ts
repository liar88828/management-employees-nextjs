import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { employeeController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.findById(request, context),
		"GET",
		"employee",
		201
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => employeeController.updateOne(request, context),
		"PUT",
		"employee"
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.deleteOne(request, context),
		"DELETE",
		"employee"
	)
}
