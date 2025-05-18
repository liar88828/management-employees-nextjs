'use server'
import { FormStateReturn } from "@/schema/departement.valid";
import { registrationSchema, RegistrationSchemaType } from "@/schema/inbox";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { ROLE } from "@/interface/enum";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export async function registerUpdateFormDataAdminAction(state: FormStateReturn<RegistrationSchemaType>, payload: FormData): Promise<FormStateReturn<RegistrationSchemaType>> {
    const defaultValue = Object.fromEntries(payload);
    try {
        const { success, error, data } = registrationSchema.safeParse(defaultValue)
        if (!success) {
            return {
                value: defaultValue,
                errors: error.formErrors.fieldErrors,
                message: "Validate False",
                success: false
            }
        }

        const findEmployeeId = await prisma.employees.findUnique({ where: { id: data.id } });
        if (!findEmployeeId) {
            return {
                value: defaultValue,
                message: 'Employee Data is Not Found ',
                success: false
            }
        }
        const registration = [ 'Reject', 'Registration' ].includes(data.status)
        await prisma.employees.update({
            where: { id: data.id },
            data: {
                status: data.status,
                notes: data.notes,
                jobTitle: data.jobTitle,
                salary: Number(data.salary),
                // position: response.position,
                registration: !registration
            }
        })
        revalidatePath('/')
        return {
            message: "Success Update Status Employee Data",
            success: true,
            value: defaultValue,
        }
    } catch (e) {
        return {
            value: defaultValue,
            success: false,
            message: 'Something Error'
        }
    }
}

export async function employeeRegistrationPaginationLoader(
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
            status: { in: status },
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
            status: { in: status },
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
