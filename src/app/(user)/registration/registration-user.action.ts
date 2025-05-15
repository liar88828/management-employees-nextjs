'use server'
import { redirect } from "next/navigation";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { prisma } from "@/config/prisma";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { employeeFindById } from "@/server/action/employee-admin.action";
import { saveImage, setPathImage, updateImage } from "@/server/action/upload.action";
import { ResponseAction } from "@/interface/action";
import {
    employeeCreateSanitizeUser,
    employeeSanitizeUpdateUser,
    RegistrationUserCreateClient
} from "@/app/(user)/registration/registration-user-sanitizer";
import { registrationCreateRepo, registrationUpdateRepo } from "@/server/action/registration-database.action";

export async function employeeCreateUserAction(
    {
        img,
        ...data
    }: RegistrationUserCreateClient,
    userId: string
):
    Promise<ResponseAction<RegistrationUserCreateClient, any
    >> {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile, false)    // Save the image path to the database
        const employeeData = employeeCreateSanitizeUser(data, userId, imagePath)
        const response = await registrationCreateRepo(employeeData)
        // console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            console.log('saveImage : ', pathImage)
        }
        return {
            prevData: data,
            success: true,
            response: response,
            message: 'Successfully created',
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message
        }
        return {
            response: null,
            message: 'Failed Create Data',
            prevData: data,
            success: false,
            errors: error,
        }
    }
}

export async function employeeUpdateUserAction(
    { img, ...data }: RegistrationUserCreateClient,
    employeeId: string,
    userId: string
): Promise<ResponseAction<RegistrationUserCreateClient,
    any>> {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile, false)    // Save the image path to the database
        const employeeData = employeeSanitizeUpdateUser(data, userId, imagePath,)
        const response = await registrationUpdateRepo(employeeData, employeeId,)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return {
            response: response,
            success: true,
            prevData: data,
            message: "Successfully updated"
        }
    } catch (error) {

        if (error instanceof ZodError) {
            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(errors.message);
            throw error.message;
        }
        return {
            response: null,
            errors: error,
            success: false,
            message: 'Failed update employee',
            prevData: data,
        }
    }
}

export async function onUpsertDataUserAction(
    method: "POST" | "PUT",
    data: RegistrationUserCreateClient,
    userId: string,
    idEmployee?: string,
): Promise<{
    message: string,
    success: boolean,
    response?: unknown,
}> {
    try {
        if (method === "POST") {
            console.log('Execute Post')
            return employeeCreateUserAction(data, userId)
        } else if (method === "PUT" && idEmployee) {
            console.log('Execute Put')
            return employeeUpdateUserAction(data, idEmployee, userId)
        }
        return {
            response: null,
            message: 'Something wrong',
            success: false
        }
    } catch (e) {
        // console.log(e.message)
        return {
            response: null,
            message: 'Something wrong',
            success: false
        }
    }
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
            Skills: true,
            Educations: true
        },
    })

}

export async function registrationFinishedAction({ userId }: { userId: string }) {
    const employeeDB = await prisma.employees.findUnique({
        where: { userId },
        select: {
            photoKtp: true,
            photoIjazah: true,
        }
    })
    if (!employeeDB) {
        redirect('/registration?error=Please complete the employee&type=form')
    }
    if (!employeeDB.photoKtp) {
        redirect('/registration?error=Please complete the photo Ktp&type=photoKtp')
    }
    if (!employeeDB.photoIjazah) {
        redirect('/registration?error=Please complete the photo Ijazah&type=photoIjazah')
    }
    const data = await prisma.employees.update({
        where: { userId },
        data: { registration: true }
    })
    revalidatePath("/home");

}

export async function registrationFinishedState({ userId }: { userId: string }): Promise<{
    message: string,
    success: boolean,
}> {
    const employeeDB = await prisma.employees.findUnique({
        where: { userId },
        select: {
            photoKtp: true,
            photoIjazah: true,
        }
    })
    if (!employeeDB) {
        return {
            message: 'Please Complete the Form',
            success: false,
        }
    }

    if (!employeeDB.photoKtp) {
        return {
            message: 'Please Complete the Photo KTP is Required',
            success: false,
        }
    }

    if (!employeeDB.photoIjazah) {
        return {
            message: 'Please Complete the Photo Ijazah is Required',
            success: false,
        }
    }

    const data = await prisma.employees.update({
        where: { userId },
        data: { registration: true }
    })
    revalidatePath("/");

    return {
        message: 'Success Registration',
        success: true,
    }
}
