'use server'
import {
    EmployeeCreateClientAdmin,
    employeeCreateSanitizeAdmin,
    employeeSanitizeFormData,
    employeeSanitizeUpdateAdmin
} from "@/schema/employee.valid";

import { ZodError } from "zod";
import { prisma } from "@/config/prisma";
import { ROLE, STATUS_EMPLOYEE } from "@/interface/enum";
import { EmployeeUserClient, TEmployeeDB } from "@/interface/entity/employee.model";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import {
    pathImage,
    saveImage,
    saveImageFormData,
    setPathImage,
    updateImage,
    updateImageFormData
} from "@/server/action/upload.action";
import { registrationCreateRepo, registrationUpdateRepo } from "@/server/action/registration-database.action";
import { ResponseAction } from "@/interface/action";

export async function updateStatus(employee: TEmployeeDB, status?: string): Promise<ResponseAction> {
    const findEmployee = await prisma.employees.findUnique({
        where: { id: employee.id },
    })
// console.log(status)
    if (!findEmployee || !status) {
        return {
            success: false,
            message: "Failed to update status",
        }
    }

    const data = await prisma.employees.update({
        where: { id: employee.id },
        data: {
            status,
            registration: ![
                "Registration",
                "Reject",
            ].includes(status)

        }
    })

    return {
        response: data,
        success: true,
        message: 'Successfully updated status'

    }

}

export async function employeeCreateFormDataAdminAction({ img, ...data }: EmployeeCreateClientAdmin) {
    // console.log('employeeCreateFormDataAdminAction', prevData);
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));

    const filePath = await pathImage(formData)    // Save the image path to the database
    const employeeData = employeeSanitizeFormData(formData, filePath)
    const response = await registrationCreateRepo(employeeData,)
    if (response) {
        await saveImageFormData(formData, filePath)
    }
    return response

}

export async function employeeUpdateFormDataAdminAction(
    { img, ...data }: EmployeeCreateClientAdmin, employeeId: string) {
    try {
        const typeImage = typeof img === 'object';
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitizeFormData(formData, filePath, data.userId)

        // @ts-ignore
        const response = await registrationUpdateRepo(employeeData, employeeId,)
        if (response && typeImage) {
            await updateImageFormData(formData, filePath)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function employeeOnUpsertAdminAction(
    method: "POST" | "PUT",
    data: EmployeeCreateClientAdmin,
    id?: string) {
    try {
        // await checkPositionPosition(response.position);
        if (method === "POST") {
            data.status = STATUS_EMPLOYEE.Registration
            return employeeCreateFormDataAdminAction(data)
        } else if (method === "PUT" && id) {
            return employeeUpdateFormDataAdminAction(data, id)
        }
        throw new Error('Something went wrong');
    } catch (error) {
        if (error instanceof ZodError) {
            throw error.flatten().fieldErrors
        }
        if (error instanceof Error) {
            console.log(error.message);
            throw error.message;
        }
    }
}

export const employeePageLoader = async (name: string, status: string, page: number) => {
    // console.log({ name, status, page })
    // const globalPageSize = 3; // You can adjust the currentPage size

    const totalEmployees = await prisma.employees.count({
        where: {
            status: { contains: status },
            User: {
                name: { contains: name, },
                role: ROLE.USER,
            }
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            status: { contains: status },
            User: {
                name: { contains: name },
                role: ROLE.USER,
            },
        },
        skip: ( page - 1 ) * globalPageSize,
        take: globalPageSize,
        include: {
            User: {
                omit: {
                    password: true,
                    otp: true,
                    otpExpired: true,
                }
            }
        }
    }).then((item): EmployeeUserClient[] => {
        return item
        .map((i) => {
            if (i && i.User) return { ...i, User: i.User }
            return null
        })
        .filter((i) => i !== null)
    })

    const totalPages = Math.ceil(totalEmployees / globalPageSize);

    return { totalPages, employees }
}

export async function employeeCreateAdmin(
    { img, ...data }: EmployeeCreateClientAdmin,
) {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        const employeeData = employeeCreateSanitizeAdmin(data, data?.userId, imagePath,)
        const response = await registrationCreateRepo(employeeData,)
        // console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            // console.log('saveImage : ', pathImage)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}
export async function employeeUpdateAdminAction(
    { img, ...data }: EmployeeCreateClientAdmin,
    employeeId: string,
) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile, false)    // Save the image path to the database
        // console.log('test')
        const employeeData = employeeSanitizeUpdateAdmin(data, imagePath,)
        const response = await registrationUpdateRepo(employeeData, employeeId,)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return response
    } catch (error) {

        if (error instanceof ZodError) {

            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(errors.message);
            throw error.message;
        }
    }
}

export async function onUpsertDataAdminAction(
    method: "POST" | "PUT",
    data: EmployeeCreateClientAdmin,
    idEmployee?: string,
) {
    // await checkPositionPosition(prevData.positions);
    // console.log(method, idEmployee)

    data.status = STATUS_EMPLOYEE.Registration
    if (method === "POST") {
        return employeeCreateAdmin(data,)
    } else if (method === "PUT" && idEmployee) {
        // console.log('Execute ')
        return employeeUpdateAdminAction(data, idEmployee)
    }
    throw new Error('Invalid prevData');
}

export async function employeeFindById(
    { userId, employeeId }: { employeeId?: string, userId?: string }
): Promise<TEmployeeDB | null> {
    return prisma.employees.findUnique({
        where: { id: employeeId, userId: userId },
        include: {
            User: {
                omit: {
                    password: true,
                    otp: true,
                    otpExpired: true,
                }
            },
            // languages: true,
            Skills: true,
            Educations: true,
        },
    });
}
