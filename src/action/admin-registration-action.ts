'use server'
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { ROLE } from "@/interface/enum";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { adminRegistrationSchema, AdminRegistrationSchemaType } from "@/schema/admin-registration-schema";
import { EmployeeUserClient, ResponseAction } from "@/interface/model";

export async function adminRegistrationUpdateAction(defaultValue: AdminRegistrationSchemaType): Promise<ResponseAction> {
    try {
        const { success, error, data } = adminRegistrationSchema.safeParse(defaultValue)
        if (!success) {
            return {
                errors: error.formErrors.fieldErrors,
                message: "Validate False",
                success: false
            }
        }

        const findEmployeeId = await prisma.employees.findUnique({ where: { id: data.id } });
        if (!findEmployeeId) {
            return {
                message: 'Employee Data is Not Found ',
                success: false
            }
        }
        const registration = [ 'Reject', 'Registration' ].includes(data.status)
        await prisma.employees.update({
            where: { id: data.id },
            data: {
                statusEmployee: data.status,
                notes: data.notes,
                jobTitle: data.jobTitle,
                salary: Number(data.salary),
                registration: !registration
            }
        })
        revalidatePath('/')
        return {
            message: "Success Update Status Employee Data",
            success: true,
        }
    } catch (e) {
        return {
            success: false,
            message: 'Something Error'
        }
    }
}

export async function adminRegistrationPageLoader(
    search: string,
    status: string[],
    page: number,
    complete: string,
) {

    const isComplete = complete === 'Complete'
        ? { not: null }
        : complete === 'Not Completed'
            ? null : undefined

    // const globalPageSize = 3; // You can adjust the currentPage size
    const totalEmployees = await prisma.employees.count({
        where: {
            // userName: { contains: name },
            statusEmployee: { in: status },
            User: {
                role: ROLE.USER,
                name: { contains: search }
            },
            photoKtp: isComplete,
            photoIjazah: isComplete,
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            statusEmployee: { in: status },
            User: {
                role: ROLE.USER,
                name: { contains: search }
            },
            photoKtp: isComplete,
            photoIjazah: isComplete,

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
    })
    // : EmployeeUserClient[]
    .then((item): EmployeeUserClient[] => {
        return item
        // .map((i) => {
        //     if (i && i.User) return { ...i, User: i.User }
        //     return null
        // })
        // .filter((i) => i !== null)
    })

    const totalPages = Math.ceil(totalEmployees / globalPageSize);
    // console.log( totalPages,'totalPages')
    // console.log( totalEmployees,'totalEmployees')
    return { totalPages, employees }
}
