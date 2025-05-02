import { FormStateReturn } from "@/schema/departement.valid";
import { registrationSchema, RegistrationSchemaType } from "@/schema/inbox";
import { prisma } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { EmployeeCompletePhotoType } from "@/interface/enum";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export async function registerUpdateFormDataAdminAction(state: FormStateReturn<RegistrationSchemaType>, payload: FormData): Promise<FormStateReturn<RegistrationSchemaType>> {
    const defaultValue = Object.fromEntries(payload);
    // console.log(defaultValue);
    const validateData = registrationSchema.safeParse(defaultValue)

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
    await prisma.employees.update({
        where: { id: validateData.data.id },
        data: {
            status: validateData.data.status,
            notes: validateData.data.notes,
            jobTitle: validateData.data.jobTitle,
            salary: Number(validateData.data.salary),
            position: validateData.data.position,
        }
    })
    revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}
export const employeeRegistrationPaginationLoader = async (
    search: string,
    status: string[],
    page: number,
    complete: EmployeeCompletePhotoType,
) => {

    // console.log( search, status, page, complete )
    // const globalPageSize = 3; // You can adjust the page size
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
