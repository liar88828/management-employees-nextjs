'use server'
import { prisma } from "@/config/prisma";
import { FormStateReturn } from "@/schema/departement.valid";
import { interviewSchema, InterviewSchemaType, registrationSchema, RegistrationSchemaType } from "@/schema/inbox";
import { revalidatePath } from "next/cache";

export async function interviewUpdate(state: FormStateReturn<InterviewSchemaType>, payload: FormData): Promise<FormStateReturn<InterviewSchemaType>> {
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
    await prisma.employees.update({
        where: { id: validateData.data.id },
        data: {
            status: validateData.data.status,
            notes: validateData.data.notes,
            jobTitle: validateData.data.jobTitle,
            salary: Number(validateData.data.salary),
            department: validateData.data.department
        }
    })
    // revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}

export async function registerUpdateFormDataAdmin(state: FormStateReturn<RegistrationSchemaType>, payload: FormData): Promise<FormStateReturn<RegistrationSchemaType>> {
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
            department: validateData.data.department,
        }
    })
    revalidatePath('/')
    return {
        message: "Success Update Data",
        success: true,
        value: defaultValue
    }
}
