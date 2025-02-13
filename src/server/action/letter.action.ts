'use server'
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";
import { LetterEmployee, LetterForm } from "@/assets/letter";
import { getDateCalender, toDateClock, toDateDayName } from "@/utils/toDate";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LetterFormSchema, LetterFormState } from "@/validation/send.valid";
import { Letters } from "@prisma/client";

export async function getLetterOnlyAll(): Promise<Letters[]> {
    return prisma.letters.findMany()
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
        return data.map(({ LetterEmployees, ...letter }) => ({
            ...letter,
            Employees: LetterEmployees.map(item => item.Employees),
            interviewDate: getDateCalender(letter.interviewDate),
            interviewDay: toDateDayName(letter.interviewDate),
            interviewTime: toDateClock(letter.interviewDate),
        }))
    })
}

export const getLetterMyId = async (id: string) => {

    return prisma.$transaction(async (tx) => {
        const company = await tx.companys.findFirst()
        .then(data => {
            if (!data) {
                redirect('/admin/company')
            }
            return data;
        })

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
            where: {
                id: {
                    in: letter.LetterEmployees.map(item => item.employeesId)
                }
            }
        }).then(data => {
            if (!data) {
                redirect('/admin/send')
            }
            return data;
        })

        return { employees, letter, company }
    })

}

export async function letterEmployeeAction(state: LetterFormState, formData: FormData): Promise<LetterFormState> {

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
            const { employeesId, ...data } = validatedFields.data
            const letterDB = await tx.letters.create({ data })

            await tx.letterEmployees.createMany({
                data: employeesId.map(item => ({
                    lettersId: letterDB.id,
                    employeesId: item
                }))
            })

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
