'use server'

import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";
import { LatterEmployee, LatterForm } from "@/assets/latter";
import { getDateCalender, toDateClock, toDateDayName } from "@/utils/toDate";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LatterFormSchema, LatterFormState } from "@/validation/send.valid";
import { Latters } from "@prisma/client";

export async function getLatterOnlyAll(): Promise<Latters[]> {
    return prisma.latters.findMany()
}

export async function getLatterAll(): Promise<LatterEmployee[]> {
    return prisma.latters.findMany({
        include: {
            LatterEmployees: {
                include: {
                    Employees: true
                }
            }
        }
    })
    .then((data) => {
        return data.map(({ LatterEmployees, ...latter }) => ({
            ...latter,
            Employees: LatterEmployees.map(item => item.Employees),
            interviewDate: getDateCalender(latter.interviewDate),
            interviewDay: toDateDayName(latter.interviewDate),
            interviewTime: toDateClock(latter.interviewDate),
        }))
    })
}

export const getLatterMyId = async (id: string) => {

    return prisma.$transaction(async (tx) => {
        const company = await tx.companys.findFirst()
        .then(data => {
            if (!data) {
                redirect('/admin/company')
            }
            return data;
        })

        // ----------
        const latter = await tx.latters.findUnique({
            where: { id },
            include: { LatterEmployees: true }
        })
        .then((data): LatterForm => {
            if (!data) {
                redirect('/admin/send')
            }
            return {
                ...data,
                LatterEmployees: data.LatterEmployees,
                interviewDate: getDateCalender(data.interviewDate),
                interviewDay: toDateDayName(data.interviewDate),
                interviewTime: toDateClock(data.interviewDate),
            }
        })

        // ----------
        const employees = await tx.employees.findMany({
            where: {
                id: {
                    in: latter.LatterEmployees.map(item => item.employeesId)
                }
            }
        }).then(data => {
            if (!data) {
                redirect('/admin/send')
            }
            return data;
        })

        return { employees, latter, company }
    })

}

export async function latterEmployeeAction(state: LatterFormState, formData: FormData): Promise<LatterFormState> {

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
        const validatedFields = LatterFormSchema.safeParse(formObject)
        if (!validatedFields.success) {
            return {
                value: formValue,
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        await prisma.$transaction(async (tx) => {
            const { employeesId, ...data } = validatedFields.data

            const latterDB = await tx.latters.create({ data })

            await tx.latterEmployees.createMany({
                data: employeesId.map(item => ({
                    lattersId: latterDB.id,
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
