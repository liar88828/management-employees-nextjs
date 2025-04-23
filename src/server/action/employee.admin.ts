'use server'
import { EmployeeCreateClientAdmin } from "@/schema/employee.valid";
import {
    pathImage,
    saveImage,
    saveImageFormData,
    setPathImage,
    updateImage,
    updateImageFormData
} from "@/server/repository/image.repo";
import {
    employeeCreateSanitizeAdmin,
    employeeSanitizeFormData,
    employeeSanitizeUpdateAdmin
} from "@/sanitize/employe.sanitize";
import { employeeRepository } from "@/server/controller";
import { ZodError } from "zod";
import { prisma } from "@/config/prisma";
import { checkDepartmentPosition } from "@/server/action/department";
import { EMPLOYEE_STATUS, EmployeeCompletePhotoType } from "@/interface/enum";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { Users } from ".prisma/client";
import { revalidatePath } from "next/cache";

export const employeeCreateFormDataAdmin = async ({ img, ...data }: EmployeeCreateClientAdmin,
) => {
    // console.log('employeeCreateFormDataAdmin', data);
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));

    const filePath = await pathImage(formData)    // Save the image path to the database
    const employeeData = employeeSanitizeFormData(formData, filePath)
    const response = await employeeRepository.createUserRepo(employeeData,)
    if (response) {
        await saveImageFormData(formData, filePath)
    }
    return response

}

export async function employeeUpdateFormDataAdmin({ img, ...data }: EmployeeCreateClientAdmin, employeeId: string) {
    try {
        const typeImage = typeof img === 'object';
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitizeFormData(formData, filePath, data.userId)

        // @ts-ignore
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId,)
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

export async function employeeOnUpsertAdmin(
    method: "POST" | "PUT",
    data: EmployeeCreateClientAdmin,
    id?: string) {
    try {
        await checkDepartmentPosition(data.department);
        if (method === "POST") {
            data.status = EMPLOYEE_STATUS.Registration
            return employeeCreateFormDataAdmin(data)
        } else if (method === "PUT" && id) {
            return employeeUpdateFormDataAdmin(data, id)
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

export async function employeeOnConnectUser(userId: string, employeeId: string) {

    return prisma.$transaction(async (tx) => {
        // null last value
        const found = await tx.employees.findUnique({
            where: { userId },
            select: { userId: true }
        })
        if (found) {
            // await tx.employees.update({
            //         data: { userId: null },
            //         where: { userId }
            //     }
            // )
        }
        // fill new Value
        await tx.employees.update({
                data: { userId },
                where: { id: employeeId }
            }
        )
    })
}

// export const removeUserEmployee = async (employeeId: string) => {
//     await prisma.employees.update({
//         where: { id: employeeId },
//         data: { userId: null }
//     })
// }

export const userFindAvailable = async (employeesValid: ( EmployeeUserClient | null )[]): Promise<Users[]> => {

    const employeeValid = employeesValid
    // .filter(item => item !== null)
    .map(item => {
        if (!item) return null
        return item.userId
    })
    .filter(item => item !== null)

    return prisma.users.findMany({
        where: {
            id: { notIn: employeeValid },
            role: "USER",
            // Employees: {
            //     userId: null
            // },
        },

    })

}

export const employeesFindNull = async () => await prisma.employees.findMany({
    where: {
        // userId: null,
        // User: { role: "USER" }
    },
    include: {
        User: {
            omit: {
                password: true,
                otp: true,
                otpExpired: true,
            }
        }
    }
})
.then(item => {
    return item.filter(item => item !== null)

})

// : Promise<TEmployeeDB[]>
export const employeesFindValid = async () => await prisma.employees.findMany({
    where: {
        // userId: { not: null },
        User: { role: "USER" },
    },
    include: {
        User: {
            omit: {
                password: true,
                otp: true,
                otpExpired: true,
            }
        }
    }
}).then(item => {
    return item.filter(item => item !== null)
})

export const employeePagination = async (search: string, status: string, page: number) => {
    console.log({ search, status, page })
    const pageSize = 3; // You can adjust the page size

    const totalEmployees = await prisma.employees.count({
        where: {
            // name: { contains: search },
            status: { contains: status },
            User: { name: { contains: search } }
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            // status: status,
            status: { contains: status },
            User: { name: { contains: search } },
        },
        skip: ( page - 1 ) * pageSize,
        take: pageSize,
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

    const totalPages = Math.ceil(totalEmployees / pageSize);

    return { totalPages, employees }
}

export const employeeRegistrationPagination = async (
    search: string,
    status: string[],
    page: number,
    complete: EmployeeCompletePhotoType,
) => {

    // console.log( search, status, page, complete )
    const pageSize = 3; // You can adjust the page size
    const totalEmployees = await prisma.employees.count({
        where: {
            // name: { contains: search },
            status: { in: status },
            User: { name: { contains: search } },

            photoKtp: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photo3x4: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photoIjazah: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            status: { in: status },
            User: { name: { contains: search } },

            photoKtp: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photo3x4: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photoIjazah: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            // photoIjazah: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : undefined,

        },
        skip: ( page - 1 ) * pageSize,
        take: pageSize,
        include: {
            User: {
                omit: {
                    password: true,
                    otp: true,
                    otpExpired: true,
                }
            }
        }
    })
    .then((item): EmployeeUserClient[] => {
        return item
        // .map((i) => {
        //     if (i && i.User) return { ...i, User: i.User }
        //     return null
        // })
        // .filter((i) => i !== null)
    })

    const totalPages = Math.ceil(totalEmployees / pageSize);
    // console.log( totalPages,'totalPages')
    // console.log( totalEmployees,'totalEmployees')
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
export async function employeeUpdateAdmin(
    { img, ...data }: EmployeeCreateClientAdmin,
    employeeId: string,
) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        // console.log('imageFile',imageFile)
        const employeeData = employeeSanitizeUpdateAdmin(data, imagePath, data?.userId)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId,)
        // console.log('isImage, response',isImage, response)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return response
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
export async function onUpsertDataAdmin(
    method: "POST" | "PUT",
    data: EmployeeCreateClientAdmin,
    idEmployee?: string,
) {
    // await checkDepartmentPosition(data.department);
    console.log(method, idEmployee)
    data.status = EMPLOYEE_STATUS.Registration
    if (method === "POST") {
        return employeeCreateAdmin(data,)
    } else if (method === "PUT" && idEmployee) {
        // console.log('Execute ')
        return employeeUpdateAdmin(data, idEmployee,)
    }
    throw new Error('Invalid data');
}

export async function changeUpdatePosition(idEmployee: string, position?: string) {
    if (position) {
        const data = await prisma.employees.update({
            where: { id: idEmployee },
            data: { status: position }
        })
        revalidatePath('/')
        return { success: true, data }
    } else {
        return { success: false }
    }
}
