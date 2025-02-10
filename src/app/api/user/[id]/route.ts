import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { userController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.testimonialById(request, context),
		"GET",
		"user",
		201
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.testimonialDelete(request, context),
		"DELETE",
		"user"
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.testimonialUpdate(request, context),
		"PUT",
		"user"
	)
}
