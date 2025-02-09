import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { userController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.findById(request, context),
		"GET",
		"user",
		201
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.deleteOne(request, context),
		"DELETE",
		"user"
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.updateOne(request, context),
		"PUT",
		"user"
	)
}
