import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { userController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.getTestimonialAll(request, context),
		"GET",
		"user"
	)
}

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => userController.testimonialCreate(request, context),
		"POST",
		"user"
	)
}
