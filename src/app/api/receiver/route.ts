import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { receiverController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => receiverController.findAll(request, context),
		"GET",
		"receiver"
	)
}

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => receiverController.createOne(request, context),
		"POST",
		"receiver"
	)
}
