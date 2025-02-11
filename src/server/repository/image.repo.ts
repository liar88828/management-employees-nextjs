'use server'
import path from "path";
import fs from "fs";
import { ErrorResponse } from "@/utils/ErrorResponse";

export const saveImage = async (formData: FormData, pathImage: string) => {// Get the image file from the form data
    const imgFile = formData.get('file') as File;
    if (!imgFile) {
        throw new Error('Image is required');
    }

    const relativeUploadDir = `/uploads/${new Date(Date.now())
        .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replace(/\//g, "-")}`;

    // Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
    const filePath = path.join(process.cwd(), 'public', pathImage);

    // Ensure the 'uploads' directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), {recursive: true});
    }

    // Save the image file to the local filesystem
    const buffer = Buffer.from(await imgFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return pathImage
}

export const deleteImage = async (imagePath: string) => {
    // Get the absolute file path
    const filePath = path.join(process.cwd(), 'public', imagePath);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlinkSync(filePath);
        console.log(`File ${ imagePath } deleted successfully.`);
    } else {
        throw new Error(`File ${ imagePath } not found.`);
    }
};

export const updateImage = async (formData: FormData, imagePath: string) => {
    await deleteImage(imagePath)
    return saveImage(formData, imagePath);
}




export const saveImageAction = async (imgFile: File, pathImage: string) => {// Get the image file from the form data

    if (!imgFile) {
        throw new Error('Image is required',);
    }

    const relativeUploadDir = `/uploads/${new Date(Date.now())
        .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        .replace(/\//g, "-")}`;

    // Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
    const filePath = path.join(process.cwd(), 'public', pathImage);

    // Ensure the 'uploads' directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), {recursive: true});
    }

    // Save the image file to the local filesystem
    const buffer = Buffer.from(await imgFile.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return pathImage
}

export const pathImage = async (formData: FormData, isThrow?: boolean) => {// Get the image file from the form data
    const imgFile = formData.get('file') as File;
    // console.log(imgFile)

    if (!imgFile && isThrow === true) {
        throw new ErrorResponse('Image is required', 401);
    }

    // Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
    return `/uploads/${imgFile.name}`

}

export const setPathImage = async (imgFile: File) => {// Get the image file from the form data
    if (!imgFile) {
        throw new ErrorResponse('Image is required', 401);
    }

    // Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
    return `/uploads/${imgFile.name}`

}
