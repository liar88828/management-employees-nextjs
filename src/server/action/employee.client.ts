'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { saveImage, setPathImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize, employeeSanitizeUpdate } from "@/sanitize/employe.sanitize";
import { EmployeeUserClient, TEmployeeDB } from "@/interface/entity/employee.model";
import { checkDepartmentPosition } from "@/server/action/department";
import { employeeFindById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { EMPLOYEE_STATUS, EmployeeCompletePhotoType } from "@/interface/enum";
import { ZodError } from "zod";
import { UserClient } from "@/interface/entity/user.model";

export const employeeCreateUser = async (
    { img, ...data }: EmployeeCreateZodClient,
) => {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        const employeeData = employeeSanitize(data, imagePath, data?.userId)
        const response = await employeeRepository.createUserRepo(employeeData,)
        console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            console.log('saveImage : ', pathImage)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function employeeUpdateUser(
    { img, ...data }: EmployeeCreateZodClient,
    employeeId: string,
) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        // console.log('imageFile',imageFile)
        const employeeData = employeeSanitizeUpdate(data, imagePath, data?.userId)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId,)
        // console.log('isImage, response',isImage, response)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return response
    } catch (error) {

        if (error instanceof ZodError) {
            // console.log(error.flatten().fieldErrors);
            // console.log('----');
            // console.log(error.flatten().fieldErrors);
            // error.flatten().fieldErrors.toString()
            // throw {
            //     error: error.flatten().fieldErrors,
            //     from: "VALIDATION",
            // }
            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(error.message);
            throw error.message;
        }
    }
}

export async function onUpsertDataUser(
    method: "POST" | "PUT",
    data: EmployeeCreateZodClient,
    idEmployee?: string,
) {
    await checkDepartmentPosition(data.department);
    console.log(method, idEmployee)
    data.status = EMPLOYEE_STATUS.Registration
    if (method === "POST") {
        return employeeCreateUser(data,)
    } else if (method === "PUT" && idEmployee) {
        // console.log('Execute ')
        return employeeUpdateUser(data, idEmployee,)
    }
    throw new Error('Invalid data');
}

export async function getEmployeeByUserIdRedirect(userId: string): Promise<TEmployeeDB> {
    return employeeFindById({ userId }).then(data => {
        if (!data) redirect('/home')
        return data
    })
}

export async function getEmployeeByUserIdForIDCard(userId: string) {
    return prisma.employees.findUnique({
        where: { userId, status: EMPLOYEE_STATUS.Active },
        include: {
            languages: true,
            skills: true,
            educations: true
        },
    })

}

export const employeeFindLatter = async (
    name: string, department: string, complete: EmployeeCompletePhotoType
) => await prisma.employees.findMany({
    where: {
        User: { name: { contains: name } },
        department: { contains: department },

        photoKtp: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
        photo3x4: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
        photoIjazah: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
    },
    include: {
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
    return item.map((i): EmployeeUserClient | null => {
        if (!i) return null
        return { ...i, User: i.User }
    }).filter(i => i !== null)
})
