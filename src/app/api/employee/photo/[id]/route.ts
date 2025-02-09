import { NextRequest, NextResponse } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { employeeController } from "@/server/controller";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

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

export async function POST(request: NextRequest, _: TContext) {

	try {
		const formData = await request.formData();

		const file = formData.get("file") as File;
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		await fs.writeFile(`./public/uploads/${ file.name }`, buffer);

		revalidatePath("/");

		return NextResponse.json({ status: "success" });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ status: "fail", error: e });
	}
	// return await ResponseJson(
	// 	async () => employeeController.updateOne(request, context),
	// 	"PUT",
	// 	"employee"
	// )
}

export async function DELETE(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => employeeController.deleteOne(request, context),
		"DELETE",
		"employee"
	)
}