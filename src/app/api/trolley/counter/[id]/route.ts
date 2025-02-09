import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { trolleyController } from "@/server/controller";

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.increment(request, context),
		"POST",
		"trolley"
	)
}

export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.decrement(request, context),
		"DELETE",
		"trolley"
	)
}
