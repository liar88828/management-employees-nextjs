'use server'
import { FormStateReturn } from "@/schema/departement.valid";
import { interviewSchema, InterviewSchemaType } from "@/schema/inbox";
import { prisma } from "@/config/prisma";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export async function interviewUpdateAction(state: FormStateReturn<InterviewSchemaType>, payload: FormData): Promise<FormStateReturn<InterviewSchemaType>> {
    const defaultValue = Object.fromEntries(payload);
    // console.log(defaultValue);
    const validateData = interviewSchema.safeParse(defaultValue)

    if (validateData.error) {
        console.log(validateData.error.formErrors.fieldErrors)
        return {
            value: defaultValue,
            errors: validateData.error.formErrors.fieldErrors,
            message: "Validate False",
            success: false
        }
    }
    const findEmployeeId = await prisma.employees.findUnique({ where: { id: validateData.data.id } });
    if (!findEmployeeId) {
        return {
            value: defaultValue,
            message: 'The Employee Data is Not Found ',
            success: false
        }
    }

    const registration = [ 'Registration_Reject', 'Interview_Reject' ].includes(validateData.data.status)

    await prisma.employees.update({
        where: { id: validateData.data.id },
        data: {
            status: validateData.data.status,
            notes: validateData.data.notes,
            jobTitle: validateData.data.jobTitle,
            salary: Number(validateData.data.salary),
            position: validateData.data.position,
            registration: !registration
        }
    })

    // revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}
export const employeeInterviewLoader = async (search: string, status: string, page: number, position: string) => {
    // console.log({ search, status, currentPage })
    // const globalPageSize = 3; // You can adjust the currentPage size

    const totalEmployees = await prisma.employees.count({
        where: {
            // name: { contains: search },
            status: status,
            registration: true,
            User: { name: { contains: search } },
            position: { contains: position },
        }
    });

    const employees = await prisma.employees.findMany({
        where: {
            // status: status,
            status: status,
            registration: true,
            User: { name: { contains: search } },
            position: { contains: position },

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
