'use server'
import { redirect } from "next/navigation";
import { EmployeeRegistrationUserCreateClient } from "@/schema/employee.valid";
import { employeeCreateSanitizeUser, employeeSanitizeUpdateUser } from "@/sanitize/employe.sanitize";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { prisma } from "@/config/prisma";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { createUserRepo, employeeFindById, updateUserRepo } from "@/server/action/employee-admin.action";
import { saveImage, setPathImage, updateImage } from "@/server/action/upload.action";

export async function employeeCreateUserAction(
    { img, ...data }: EmployeeRegistrationUserCreateClient,
    userId: string
) {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        const employeeData = employeeCreateSanitizeUser(data, userId, imagePath,)
        const response = await createUserRepo(employeeData,)
        console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            console.log('saveImage : ', pathImage)
        }
        return {
            data: response,
            success: true
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message
        }
    }
}

export async function employeeUpdateUserAction(
    { img, ...data }: EmployeeRegistrationUserCreateClient,
    employeeId: string,
    userId: string
) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        // console.log('imageFile',imageFile)
        const employeeData = employeeSanitizeUpdateUser(data, userId, imagePath,)
        const response = await updateUserRepo(employeeData, employeeId,)
        // console.log('isImage, response',isImage, response)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return {
            data: response,
            success: true
        }
    } catch (error) {

        if (error instanceof ZodError) {
            // console.log(errors.flatten().fieldErrors);
            // console.log('----');
            // console.log(errors.flatten().fieldErrors);
            // errors.flatten().fieldErrors.toString()
            // throw {
            //     errors: errors.flatten().fieldErrors,
            //     from: "VALIDATION",
            // }
            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(errors.message);
            throw error.message;
        }
    }
}

export async function onUpsertDataUserAction(
    method: "POST" | "PUT",
    data: EmployeeRegistrationUserCreateClient,
    userId: string,
    idEmployee?: string,
) {
    // await checkPositionPosition(data.positions);
    // console.log(method, idEmployee)
    if (method === "POST") {
        console.log('Execute Post')
        return employeeCreateUserAction(data, userId)
    } else if (method === "PUT" && idEmployee) {
        console.log('Execute Put')
        return employeeUpdateUserAction(data, idEmployee, userId)
    }
    throw new Error('Invalid data');
}

export async function etEmployeeByUserIdRedirect(userId: string): Promise<TEmployeeDB> {
    return employeeFindById({ userId }).then(data => {
        if (!data) redirect('/home')
        return data
    })
}

export async function employeeByUserIdForIDCardLoader(userId: string) {
    return prisma.employees.findUnique({
        where: { userId, status: STATUS_EMPLOYEE.Active },
        include: {
            skills: true,
            educations: true
        },
    })

}

export async function registrationFinishedAction({ userId }: { userId: string })
// : Promise<ActionResponse|void>
{
    const employeeDB = await prisma.employees.findUnique({
        where: { userId },
        select: {
            photoKtp: true,
            photoIjazah: true,
            photo3x4: true,
        }
    })
    if (!employeeDB) {
        redirect('/registration?error=Please complete the employee&type=form')
    }
    if (!employeeDB.photoKtp) {
        redirect('/registration?error=Please complete the photo Ktp&type=ktp')
    }
    if (!employeeDB.photoIjazah) {
        redirect('/registration?error=Please complete the photo Ijazah&type=ijazah')
    }
    if (!employeeDB.photo3x4) {
        redirect('/registration?error=Please complete the photo 3x4&type=3x4')
    }
    const data = await prisma.employees.update({
        where: { userId },
        data: { registration: true }
    })
    revalidatePath("/");

    // return {
    //     data,
    //     success: true,
    //     message: "Success Update Data"
    // }
}
