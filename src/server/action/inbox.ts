'use server'
import { prisma } from "@/config/prisma";
import { FormStateReturn } from "@/schema/departement.valid";
import { inboxSchema, InboxValidateType } from "@/schema/inbox";

export async function interviewUpdate(state: FormStateReturn<InboxValidateType>, payload: FormData): Promise<FormStateReturn<InboxValidateType>> {
    const defaultValue = Object.fromEntries(payload);
    // console.log(defaultValue);
    const validateData = inboxSchema.safeParse(defaultValue)

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
        }
    })
    // revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}

export async function registerUpdate(state: FormStateReturn<InboxValidateType>, payload: FormData): Promise<FormStateReturn<InboxValidateType>> {
    const defaultValue = Object.fromEntries(payload);
    // console.log(defaultValue);
    const validateData = inboxSchema.safeParse(defaultValue)

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
        }
    })
    // revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}
