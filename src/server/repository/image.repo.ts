import path from "path";
import fs from "fs";

import { ErrorResponse } from "@/utils/ErrorResponse";

export const saveImage = async (formData: FormData, pathImage: string) => {// Get the image file from the form data
	const imgFile = formData.get('file') as File;

	if (!imgFile) {
		throw new Error('Image is required',);
	}

	const relativeUploadDir = `/uploads/${ new Date(Date.now())
	.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
	.replace(/\//g, "-") }`;

	// Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
	const filePath = path.join(process.cwd(), 'public', pathImage);

	// Ensure the 'uploads' directory exists
	if (!fs.existsSync(path.dirname(filePath))) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
	}

	// Save the image file to the local filesystem
	const buffer = Buffer.from(await imgFile.arrayBuffer());
	fs.writeFileSync(filePath, buffer);
	return pathImage
}

export const pathImage = async (formData: FormData) => {// Get the image file from the form data
	const imgFile = formData.get('file') as File;
	// console.log(imgFile)
	if (!imgFile) {
		throw new ErrorResponse('Image is required', 401);
	}

	// Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
	return `uploads/${ imgFile.name }`

}
