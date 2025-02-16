import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper";
import { employeeController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => employeeController.getTestimonialAll(request, context),
		"GET",
		"employee"
	)
}

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => employeeController.testimonialCreate(request, context),
		"POST",
		"employee"
	)
}
