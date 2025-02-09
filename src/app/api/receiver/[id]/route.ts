import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { receiverController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => receiverController.findById(request, context),
		"GET",
		"receiver"
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => receiverController.updateOne(request, context),
		"PUT",
		"receiver"
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => receiverController.deleteOne(request, context),
		"DELETE",
		"receiver"
	)
}
