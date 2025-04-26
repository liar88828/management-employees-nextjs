'use server'
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";
import { LetterEmployee, LetterForm } from "@/assets/letter";
import { getDateCalender, toDateClock, toDateDayName } from "@/utils/toDate";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LetterFormSchema, LetterFormSchemaType, LetterFormState } from "@/schema/send.valid";
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { globalPageSize } from "@/config/nextPublicBaseUrl";

export async function getLetterOnlyAll({ page, search }: { page: number, search: string }) {

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

export const getLetterMyId = async (id: string) => {

    return prisma.$transaction(async (tx) => {

        // ----------
        const letter = await tx.letters.findUnique({
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

        return { employees, letter }
    })

}

export async function letterEmployeeActionFormData(state: LetterFormState, formData: FormData): Promise<LetterFormState> {

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

export async function letterEmployeeActionState(
    latter: LetterFormSchemaType,
    idEmployees: string[]
) {

    try {
        await prisma.$transaction(async (tx) => {
            const letterDB = await tx.letters.create({
                data: {
                    interviewDate: latter.interviewDate,
                    dressCode: latter.dressCode,
                    signerName: latter.signerName,
                    interviewLocation: latter.interviewLocation,
                }
            })

            await tx.letterEmployees.createMany({
                data: idEmployees.map(item => ( {
                    lettersId: letterDB.id,
                    employeesId: item
                } ))
            })
        })
        return true
    } catch (e) {
        return false
    }

}
