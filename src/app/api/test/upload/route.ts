import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export type ResponseEnc = {
	message: string,
	file_path: string,
	full_path: string,
};

export async function POST(req: Request) {
	try {
		const formData = await req.formData();

		const file = formData.get("file") as File;
		const response = await fetch("http://localhost:8000/images/save-image/", {
			method: "POST",
			body: formData,
		})
		const json = await response.json()
        // console.log(json)
		// const arrayBuffer = await file.arrayBuffer();
		// const buffer = new Uint8Array(arrayBuffer);
		// await fs.writeFile(`./public/uploads/${file.name}`, buffer);
		//
		revalidatePath("/");

		return NextResponse.json({
				status: "success",
				data: json as ResponseEnc
			}
		)
			;
	} catch
		(e) {
		console.error(e);
		return NextResponse.json({ status: "fail", error: e });
	}
}