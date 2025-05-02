'use server'
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";
import { LetterEmployee, LetterForm } from "@/assets/letter";
import { getDateCalender, toDateClock, toDateDayName } from "@/utils/toDate";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LetterFormSchema, LetterFormSchemaType, LetterFormState } from "@/schema/send.valid";
import { EmployeeUserClient, EmployeeUserClientLatter } from "@/interface/entity/employee.model";
import { globalPageSize } from "@/config/nextPublicBaseUrl";
import { ActionResponse } from "@/interface/action";
import { EmployeeCompletePhotoType, ROLE, STATUS_EMPLOYEE } from "@/interface/enum";
import { revalidatePath } from "next/cache";

export async function getLetterAll(): Promise<LetterEmployee[]> {
    return prisma.letters.findMany({
        include: {
            LetterEmployees: {
                include: {
                    Employees: true
                }
            }
        }
    })
    .then((data) => {
        return data.map(({ LetterEmployees, ...letter }) => ( {
            ...letter,
            Employees: LetterEmployees.map(item => item.Employees),
            interviewDate: getDateCalender(letter.interviewDate),
            interviewDay: toDateDayName(letter.interviewDate),
            interviewTime: toDateClock(letter.interviewDate),
        } ))
    })
}

export async function _sendEmployeeFormDataAction(state: LetterFormState, formData: FormData): Promise<LetterFormState> {

    const formValue = Object.fromEntries(formData);
    // console.log(formValue);
    const formObject: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (key.startsWith("check")) {
            if (!formObject.employeesId) {
                formObject.employeesId = [];
            }
            formObject.employeesId.push(value);
        } else {
            formObject[key] = value;
        }
    });

    try {
        const validatedFields = LetterFormSchema.safeParse(formObject)
        if (!validatedFields.success) {
            return {
                value: formValue,
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        await prisma.$transaction(async (tx) => {
            // const { employeesId, ...data } = validatedFields.data
            // const letterDB = await tx.letters.create({ data })

            // await tx.letterEmployees.createMany({
            //     data: employeesId.map(item => ( {
            //         lettersId: letterDB.id,
            //         employeesId: item
            //     } ))
            // })

        })

        return {
            value: formValue,
            success: true,
            message: "Company created successfully."
        }
    } catch (e) {

        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                value: formValue,
                success: false,
                message: e.message,
            }
        }

        return {
            value: formValue,
            success: false,
            message: 'Something Error',
            // prev: { email, password }

        }
    }

}

export async function sendOnlyAllLoader({ page, search }: { page: number, search: string }) {

    const totalEmployees = await prisma.letters.count({
        where: { interviewLocation: { contains: search } },
        orderBy: { updatedAt: 'desc' }
    })

    const data = await prisma.letters.findMany({
        skip: ( page - 1 ) * globalPageSize,
        take: globalPageSize,
        where: { interviewLocation: { contains: search } },
        orderBy: { updatedAt: 'desc' }
    })

    const totalPages = Math.ceil(totalEmployees / globalPageSize);

    return {
        data,
        totalPages
    }
}

export async function sendDetailByIdLoader(id: string) {

    return prisma.$transaction(async (tx) => {

        // ----------
        const letter: LetterForm = await tx.letters.findUnique({
            where: { id },
            include: { LetterEmployees: true }
        })
        .then((data): LetterForm => {
            if (!data) {
                redirect('/admin/send')
            }
            return {
                ...data,
                LetterEmployees: data.LetterEmployees,
                interviewDate: getDateCalender(data.interviewDate),
                interviewDay: toDateDayName(data.interviewDate),
                interviewTime: toDateClock(data.interviewDate),
            }
        })

        // ----------
        const employees = await tx.employees.findMany({
            include: {
                User: {
                    omit: {
                        password: true,
                        otp: true,
                        otpExpired: true
                    }
                }
            },
            where: {
                id: {
                    in: letter.LetterEmployees.map(item => item.employeesId)
                }
            }
        })
        .then(item => {
            return item.map((i): EmployeeUserClient | null => {
                if (!i) return null
                if (!i.User) return null;
                return { ...i, User: i.User }
            }).filter(i => i !== null)
        })
        .then(data => {
            if (!data) {
                redirect('/admin/send')
            }
            return data;
        })

        // console.log({ employees, letter })
        // const CombineLatterEmployees: CombineLatterEmployees
        //     = {
        //     ...letter,
        //     LetterEmployees: letter.LetterEmployees.map((item) => {
        //             const employee = employees.find(emp => emp.id === item.employeesId);
        //             return {
        //                 ...item,
        //                 employee
        //             }
        //         }
        //     )
        // }

        return { employees, letter }
    })

}

export async function sendEmployeeStoreAction(latter: LetterFormSchemaType, idEmployees: string[]): Promise<ActionResponse> {
    try {
        if (idEmployees.length === 0) {
            return {
                message: 'Please Select The Employees',
                success: false,
                data: null,
                errors: 'Store'
            }

        }

        const data = await prisma.$transaction(async (tx) => {
            const letterDB = await tx.letters.create({
                data: {
                    interviewDate: latter.interviewDate,
                    dressCode: latter.dressCode,
                    signerName: latter.signerName,
                    interviewLocation: latter.interviewLocation,
                }
            })

            return tx.letterEmployees.createMany({
                data: idEmployees.map(item => ( {
                    lettersId: letterDB.id,
                    employeesId: item
                } ))
            })
        })

        return {
            data,
            success: true,
            message: "Employee created successfully."
        }
    } catch (e) {
        let message = 'Something Error';
        if (e instanceof Error) {
            message = e.message
        }
        return {
            data: null,
            success: false,
            message: "Employee created failed.",
            errors: message,
        }
    }

}
export async function sendEmployeeFindLoader(
    name: string, position: string, complete: EmployeeCompletePhotoType
) {
    // console.log(name, position,complete);
    return prisma.employees.findMany({
        where: {
            User: {
                role: { not: ROLE.ADMIN, },
                name: { contains: name, }
            },
            status: {
                notIn: [
                    STATUS_EMPLOYEE.Active,
                    STATUS_EMPLOYEE.Create,
                    STATUS_EMPLOYEE.Resign,
                    STATUS_EMPLOYEE.Registration,
                    STATUS_EMPLOYEE.Registration_Reject,
                    STATUS_EMPLOYEE.Disabled,
                ]
            },
            // sendEmail: 1,
            position: { contains: position },
            photoKtp: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photo3x4: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
            photoIjazah: complete === 'Complete' ? { not: null } : complete === 'Not Completed' ? null : undefined,
        },
        include: {
            LetterEmployees: true,
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
        return item.map((i): EmployeeUserClientLatter | null => {
            if (!i) return null
            return { ...i, User: i.User }
        }).filter(i => i !== null)
    })
}
export async function sendDetailEmployeeDeleteAction(
    idLatter: string,
    idEmployee: string
) {

    await prisma.$transaction(async (tx) => {
        // const countLatterEmployee = await tx.letterEmployees.count({
        //     where: {
        //         lettersId: idLatter,
        //         employeesId: idEmployee
        //     }
        // })

        const latterEmployeeDB = await tx.letterEmployees.findFirst({
            where: {
                lettersId: idLatter,
                employeesId: idEmployee
            }
        })

        if (!latterEmployeeDB) {
            redirect(`/admin/send/${ idLatter }`)
        }

        const latterEmployee = await tx.letterEmployees.delete({
            where: { id: latterEmployeeDB.id }
        })

        // if (countLatterEmployee === 1) {
        //     await tx.letters.delete({
        //         where: {
        //             id: latterEmployee.lettersId
        //         }
        //     })
        // }
    })
    revalidatePath('/')
}

export async function sendDetailDeleteAction(idLetter: string) {

    await prisma.$transaction(async (tx) => {

        // const latterDB = await tx.letterEmployees.count({
        //     where: {
        //         lettersId:idLetter
        //     }
        // })

        await tx.letterEmployees.deleteMany({
            where: { lettersId: idLetter }
        })
        await tx.letters.delete({
            where: { id: idLetter }
        })

    })
}
