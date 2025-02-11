import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { employeeController } from "@/server/controller";
import { getSession } from "@/server/lib/db";

export async function GET(request: NextRequest, context: TContext) {

	return ResponseJson(
		async () => employeeController.testimonialById(request, context),
		"GET",
		"employee",
		201
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => employeeController.testimonialUpdate(request, context),
		"PUT",
		"employee"
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.testimonialDelete(request, context),
		"DELETE",
		"employee"
	)
}
