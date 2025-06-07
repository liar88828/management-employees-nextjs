"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/config/prisma";
import path from "path";
import fs from "fs";
import { url_fastapi } from "@/config/nextPublicBaseUrl";

export type TypeFile = 'KTP' | 'Ijazah'
const allowedExtensions = [ 'jpg', 'jpeg', 'png' ];
// Validate file size (e.g., max 5 MB)
const maxSizeInMB = 3;
const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
export type ResponseUploadEncrypt = {
    message: string
    file_path: string
    full_path: string
    success: true
    detail: string
}
// {
//     message: 'File saved successfully',
//     file_path: 'public\\ktp.jpg.enc',
//     full_path: 'http://localhost:8000/images/ktp.jpg',
//     success: true
// }

export async function uploadFileState({ userId, from, typeFile, imageFile, userName }: {
    typeFile: TypeFile,
    userId: string,
    from: string,
    imageFile: File,
    userName: string,
}): Promise<{ success: boolean, message: string }> {
    try {
        const UserDb = await prisma.users.findUnique({
            where: { id: userId },
            select: { imgPass: true }
        })

        if (!UserDb) {
            // throw new Error('User Employee does not exist')
            return {
                message: 'Upload File User Employee does not exist',
                success: false
            }
        }

        // Validate file extension
        const fileExtension = imageFile.name.split('.').pop()?.toLowerCase();
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            return {
                message: `Invalid file type. Allowed types: ${ allowedExtensions.join(', ') }`,
                success: false
            };
        }

        if (imageFile.size > maxSizeInBytes) {
            return {
                message: `File size exceeds ${ maxSizeInMB } MB limit.`,
                success: false
            };
        }

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("name", userName);
        formData.append("user_id", userId);
        formData.append("type_image", typeFile);
        formData.append("password_image", UserDb.imgPass); // now safely set
        // formData.append("iv", toRandom({
        //     length: 8,
        //     includeAlphabets: true,
        //     includeDigits: true
        // }));

        // console.log(formData)
        const response = await fetch(`${ url_fastapi }/images/`, {
            method: "POST",
            body: formData,
        })
        const data: ResponseUploadEncrypt = await response.json()
        console.log(data, 'data')
        if (!data.success) {
            // throw new Error(`Error uploading file: ${ typeFile } : ${ data.detail }`)
            return {
                message: `Error uploading file: ${ typeFile } : ${ data.detail }`,
                success: false
            }
        }
        if (from === 'employee') {
            await prisma.employees.update({
                where: { userId: userId },
                data: {
                    photoKtp: typeFile === 'KTP' ? data.full_path : undefined,
                    photoIjazah: typeFile === 'Ijazah' ? data.full_path : undefined,
                }
            });
        }
        revalidatePath("/");
        return {
            message: `Success Upload ${ typeFile }`,
            success: true
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            // return errors.message
            return {
                message: `Fail Upload : ${ error.message }`,
                success: false
            }
        }
        return {
            message: `Fail Upload : ${ typeFile }`,
            success: false
        }
    }
}

export const saveImage = async (
    imageFile: File,
    pathImage: string,
) => {// Get the image file from the form prevData
    if (!imageFile) {
        throw new Error('Image is required')
    }

    // Save the image file locally (You can also upload it to a cloud storage service like AWS S3, Cloudinary, etc.)
    const filePath = path.join(process.cwd(), 'public', pathImage);

    // Ensure the 'uploads' directory exists
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    // Save the image file to the local filesystem
    const buffer = Buffer.from(await imageFile.arrayBuffer());
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
    }
    // else {
    //     throw new Error(`File ${ imagePath } not found.`);
    // }
};
export const updateImage = async (imageFile: File, imagePath: string, oldImagePath?: string | null) => {
    if (oldImagePath) {
        await deleteImage(oldImagePath)
    }
    return saveImage(imageFile, imagePath);
}
