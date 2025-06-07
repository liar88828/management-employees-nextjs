'use server'

import { prisma } from "@/config/prisma";
import { ROLE } from "@/interface/enum";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { EmployeeUserClient, ResponseAction, TEmployeeDB } from "@/interface/model";

export async function updateStatus(employee: TEmployeeDB, status?: string): Promise<ResponseAction> {
    const findEmployee = await prisma.employees.findUnique({
        where: { id: employee.id },
    })
// console.log(statusEmployee)
    if (!findEmployee || !status) {
        return {
            success: false,
            message: "Failed to update statusEmployee",
        }
    }

    const data = await prisma.employees.update({
        where: { id: employee.id },
        data: {
            statusEmployee: status,
            registration: ![
                "Registration",
                "Reject",
            ].includes(status)

        }
    })

    return {
        response: data,
        success: true,
        message: 'Successfully updated statusEmployee'

    }

}

export const adminEmployeePageLoader = async (name: string, status: string, page: number) => {
    // console.log({ name, statusEmployee, page })
    // const globalPageSize = 3; // You can adjust the currentPage size

    const totalEmployees = await prisma.employees.count({
        where: {
            statusEmployee: { contains: status },
            User: {
                name: { contains: name },
                role: ROLE.USER,
            }
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            statusEmployee: { contains: status },
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
export async function adminEmployeeDetailLoader(
    { employeeId }: { employeeId: string }
): Promise<TEmployeeDB | null> {
    return prisma.employees.findUnique({
        where: { id: employeeId },
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
