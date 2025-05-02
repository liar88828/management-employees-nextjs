'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeRegistrationUserCreateClient } from "@/schema/employee.valid";
import { saveImage, setPathImage, updateImage } from "@/server/repository/image.repo";
import { employeeCreateSanitizeUser, employeeSanitizeUpdateUser } from "@/sanitize/employe.sanitize";
import { EmployeeUserClientLatter, TEmployeeDB } from "@/interface/entity/employee.model";
import { employeeFindById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { EmployeeCompletePhotoType, ROLE, STATUS_EMPLOYEE } from "@/interface/enum";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function employeeCreateUserAction(
    { img, ...data }: EmployeeRegistrationUserCreateClient,
    userId: string
) {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        const employeeData = employeeCreateSanitizeUser(data, userId, imagePath,)
        const response = await employeeRepository.createUserRepo(employeeData,)
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
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId,)
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

export async function employeeFindLatterLoader(
    name: string, position: string, complete: EmployeeCompletePhotoType
) {
    return prisma.employees.findMany({
        where: {
            User: {
                role: { not: ROLE.ADMIN, },
                name: { contains: name, }
            },
            status: {
                notIn: [
                    STATUS_EMPLOYEE.Active,
                    STATUS_EMPLOYEE.Create,
                    STATUS_EMPLOYEE.Resign,
                    STATUS_EMPLOYEE.Registration,
                    STATUS_EMPLOYEE.Registration_Reject,
                    STATUS_EMPLOYEE.Disabled,
                ]
            },
            sendEmail: 1,
            position: { contains: position },
            photoKtp: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photo3x4: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photoIjazah: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
        },
        include: {
            LetterEmployees: true,
            User: {
                omit: {
                    password: true,
                    otp: true,
                    otpExpired: true
                }
            }
        },
    })
    .then(item => {
        return item.map((i): EmployeeUserClientLatter | null => {
            if (!i) return null
            return { ...i, User: i.User }
        }).filter(i => i !== null)
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
