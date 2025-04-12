'use server'
import { FormStateAuth } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { DepartmentFormSchema, DepartmentFormState } from "@/schema/departement.valid";
import { ErrorAction } from "@/utils/ErrorClass";
import { redirect } from "next/navigation";

export async function departmentGetAllPage() {
    const departments = await prisma.departements.findMany()

    if (departments.length === 0) {
        redirect(`/admin/department`)
    }
    return departments
}

export async function checkDepartmentPosition(departmentPosition: string) {
    const department = await prisma.departements.findUnique({
        where: {
            position: departmentPosition
        }
    })
    if (!department) {
        throw new Error(`Department not found for ${ departmentPosition }`)
    }
}



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

export type DepartmentUpdateActionType = { departmentId: number, position: string };

export async function departmentUpdate({ departmentId, position }: DepartmentUpdateActionType): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        return prisma.$transaction(async (tx) => {

            const departmentDB = await tx.departements.findUnique({ where: { id: departmentId } })
            .then(data => {
                if (!data) {
                    throw new ErrorAction("Department Not Exist")
                }
                return data
            })

            await tx.departements.update({
                where: { id: departmentId },
                data: { position }
            })

            await tx.employees.updateMany({
                where: { department: departmentDB.position },
                data: { department: position }
            })

            return {
                success: true,
                message: "Successfully deleted "
            };
        })

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
