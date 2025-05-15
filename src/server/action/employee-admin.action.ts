'use server'
import { EmployeeCreateClientAdmin } from "@/schema/employee.valid";
import {
    employeeCreateSanitizeAdmin,
    employeeSanitizeFormData,
    employeeSanitizeUpdateAdmin
} from "@/app/admin/registration/employe.sanitize";
import { ZodError } from "zod";
import { prisma } from "@/config/prisma";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { EmployeeUserClient, TEmployeeDB } from "@/interface/entity/employee.model";
import { Users } from ".prisma/client";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import {
    pathImage,
    saveImage,
    saveImageFormData,
    setPathImage,
    updateImage,
    updateImageFormData
} from "@/server/action/upload.action";
import { createUserRepo, updateUserRepo } from "@/app/(user)/registration/registration-user.repo";

export async function employeeCreateFormDataAdminAction({ img, ...data }: EmployeeCreateClientAdmin) {
    // console.log('employeeCreateFormDataAdminAction', prevData);
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));

    const filePath = await pathImage(formData)    // Save the image path to the database
    const employeeData = employeeSanitizeFormData(formData, filePath)
    const response = await createUserRepo(employeeData,)
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
        const response = await updateUserRepo(employeeData, employeeId,)
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

export async function employeeOnConnectUser(userId: string, employeeId: string) {

    return prisma.$transaction(async (tx) => {
        // null last value
        const found = await tx.employees.findUnique({
            where: { userId },
            select: { userId: true }
        })
        if (found) {
            // await tx.employees.update({
            //         prevData: { userId: null },
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
//         prevData: { userId: null }
//     })
// }

export async function userFindAvailableLoader(employeesValid: ( EmployeeUserClient | null )[]): Promise<Users[]> {

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
export const employeesFindValidLoader = async () => await prisma.employees.findMany({
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

export const employeePageLoader = async (search: string, status: string, page: number) => {
    console.log({ search, status, page })
    // const globalPageSize = 3; // You can adjust the currentPage size

    const totalEmployees = await prisma.employees.count({
        where: {
            status: { contains: status },
            User: { name: { contains: search } }
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            status: { contains: status },
            User: { name: { contains: search } },
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
        const response = await createUserRepo(employeeData,)
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
export async function employeeUpdateAdminAction(
    { img, ...data }: EmployeeCreateClientAdmin,
    employeeId: string,
) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile, false)    // Save the image path to the database
        console.log('test')
        const employeeData = employeeSanitizeUpdateAdmin(data, imagePath,)
        const response = await updateUserRepo(employeeData, employeeId,)
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

export async function employeePositionsLoader(
    { search, position, page }: { search: string, position: string, page: number }
) {

    const totalEmployees = await prisma.employees.count({
        where: {
            // userName: { contains: search },
            User: { name: { contains: search } },
            // position: { contains: position },
            status: {
                notIn: [
                    STATUS_EMPLOYEE.Interview,
                    STATUS_EMPLOYEE.Registration,
                    STATUS_EMPLOYEE.Create,
                ]
            }
        }
    });

    const employees = await prisma.employees.findMany({
        skip: ( page - 1 ) * globalPageSize,
        take: globalPageSize,
        where: {
            // userName: { contains: userName },
            User: { name: { contains: search } },
            // position: { contains: position },
            status: {
                notIn: [
                    STATUS_EMPLOYEE.Interview,
                    STATUS_EMPLOYEE.Registration,
                    STATUS_EMPLOYEE.Create,
                ]
            }
        },
        include: {
            User: {
                omit: {
                    password: true, otp: true, otpExpired: true
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

    return { employees, totalPages }
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

// export async function employeeFindById({ userId, employeeId }: {
//     userId?: string,
//     employeeId?: string
// }): Promise<TEmployeeDB | undefined> {
//     return prisma.employees.findUnique({
//         where: { userId, id: employeeId },
//         include: {
//             User: {
//                 omit: {
//                     password: true,
//                     otp: true,
//                     otpExpired: true,
//                 }
//             },
//             // languages: true,
//             skills: true,
//             educations: true
//         }
//     }).then(item => {
//         if (!item) return undefined
//         return item
//     })
// }
