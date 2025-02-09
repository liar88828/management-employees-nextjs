"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/config/prisma";

export type TypeFile = 'KTP' | '3x4'

export async function uploadFile(
	{ id, from, typeFile }:
	{
		typeFile: TypeFile,
		id: string,
		from: string
	},
    formData: FormData) {
	// const file = formData.get("file") as File;
	// const arrayBuffer = await file.arrayBuffer();
	// const buffer = new Uint8Array(arrayBuffer);
	// const name = `/uploads/${ file.name }`
	// await fs.writeFile(`./public${ name }`, buffer);
	// console.log(typeFile);

	 	const response = await fetch("http://localhost:8000/images/save-image/", {
		method: "POST",
		body: formData,
	})
	const data = await response.json()
	console.log(data)

	if (from === 'employee') {

		if (typeFile === 'KTP') {
			await prisma.employees.update({ where: { id }, data: { photoKtp: data.full_path } })
		}
		if (typeFile === '3x4') {
			await prisma.employees.update({ where: { id }, data: { photo3x4: data.full_path} })
		}
	}
	revalidatePath("/");
}