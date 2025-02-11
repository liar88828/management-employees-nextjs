'use server'
import { FormStateAuth } from "@/validation/auth.valid";
import { prisma } from "@/config/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { DepartmentFormSchema, DepartmentFormState } from "@/validation/departement.valid";
import { ErrorAction } from "@/utils/ErrorResponse";

export async function departmentCheck(id: number) {
    const departmentDB = await prisma.departements.findUnique({
        where: { id }
    })
    if (!departmentDB) {
        throw new ErrorAction("Department Not Exist")
    }

    return departmentDB
}

export async function profileManagementFindAll(state: DepartmentFormState, formData: FormData) {

}

export async function profileManagementFindById(state: FormStateAuth, formData: FormData) {

}

export async function departmentCreate(state: DepartmentFormState, formData: FormData): Promise<DepartmentFormState> {
    const position = formData.get('position') as string;

    try {
        // Validate form fields
        const validatedFields = DepartmentFormSchema.safeParse({
            position,
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const departmentDB = await prisma.departements.findUnique({
            where: { position }
        })
        if (departmentDB) {
            return {
                message: "Department already exists",
            }
        }
        await prisma.departements.create({
            data: { position: validatedFields.data.position }
        })

    } catch (e) {

        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An error occurred while creating your account.',
            // prev: { email, password }

        }
    }

}

export async function profileManagementUpdate(state: any, formData: FormData) {

}

export async function departmentDelete(departmentId: number): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        await departmentCheck(departmentId);
        await prisma.departements.delete({ where: { id: departmentId } })
        return {
            success: true,
            message: "Successfully deleted "
        };
    } catch (e) {
        if (e instanceof ErrorAction) {
            return {
                success: false,
                message: e.message,
            }
        }
        return {
            success: false,
            message: 'Something went wrong',
        }
    }

}
