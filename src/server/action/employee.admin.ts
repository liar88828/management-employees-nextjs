'use server'
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { pathImage, saveImageFormData, updateImageFormData } from "@/server/repository/image.repo";
import { employeeSanitizeFormData } from "@/sanitize/employe.sanitize";
import { employeeRepository } from "@/server/controller";
import { ZodError } from "zod";
import { prisma } from "@/config/prisma";
import { checkDepartmentPosition } from "@/server/action/department";
import { EMPLOYEE_STATUS, EmployeeCompletePhotoType } from "@/interface/enum";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { Users } from ".prisma/client";

export const employeeCreateAdmin = async ({ img, ...data }: EmployeeCreateZodClient,
) => {
    // console.log('employeeCreateAdmin', data);
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

export async function employeeUpdateAdmin({ img, ...data }: EmployeeCreateZodClient, employeeId: string) {
    try {
        const typeImage = typeof img === 'object';
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitizeFormData(formData, filePath, data.userId)
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
    data: EmployeeCreateZodClient,
    id?: string) {
    try {
        await checkDepartmentPosition(data.department);
        if (method === "POST") {
            data.status = EMPLOYEE_STATUS.Registration
            return employeeCreateAdmin(data)
        } else if (method === "PUT" && id) {
            return employeeUpdateAdmin(data, id)
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
    const pageSize = 3; // You can adjust the page size

    const totalEmployees = await prisma.employees.count({
        where: {
            // name: { contains: search },
            status: status,
            User: { name: { contains: search } }
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            status: status,
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
    status: string,
    page: number,
    complete: EmployeeCompletePhotoType,
) => {
    console.log(search, status, page, complete)
    const pageSize = 3; // You can adjust the page size
    const totalEmployees = await prisma.employees.count({
        where: {
            // name: { contains: search },
            status: status,
            User: { name: { contains: search } },

            photoKtp: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
            photo3x4: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
            photoIjazah: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            status: status,
            User: { name: { contains: search } },
            photoKtp: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
            photo3x4: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,
            photoIjazah: complete === 'SelectAll' ? undefined : complete === 'Complete' ? { not: null } : null,

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

    return { totalPages, employees }
}
