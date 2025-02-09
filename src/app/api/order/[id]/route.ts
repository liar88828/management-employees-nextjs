import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import {ResponseJson} from "@/utils/requestHelper";
import {orderController} from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => orderController.findById(request, context),
		'GET',
		'order'
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => orderController.deleteOne(request, context),
		'DELETE',
		'order'
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => orderController.updateOne(request, context),
		'PUT',
		'order'
	)
}

export async function PATCH(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => orderController.updateStatus(request, context), "PATCH",
		'order')
}
