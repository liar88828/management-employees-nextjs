'use server'
import { FormStateAuth } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { DepartmentFormSchema, DepartmentFormState } from "@/schema/departement.valid";
import { redirect } from "next/navigation";
import { ErrorDatabase } from "@/utils/error/ErrorClass";
import { ActionResponse } from "@/interface/action";
import { revalidatePath } from "next/cache";

export type DepartmentUpdateActionType = { departmentId: number, position: string };

export async function departmentGetAllPage() {
    const departments = await prisma.departements.findMany()

    if (departments.length === 0) {
        redirect(`/admin/department`)
    }
    return departments
}

export async function profileManagementFindAll(state: DepartmentFormState, formData: FormData) {

}

export async function profileManagementFindById(state: FormStateAuth, formData: FormData) {

}

export async function profileManagementUpdate(state: any, formData: FormData) {

}

export async function checkDepartmentPosition(departmentPosition: string) {
    const department = await prisma.departements.findUnique({
        where: {
            position: departmentPosition
        }
    })
    if (!department) {
        throw new ErrorDatabase(`Department not found for ${ departmentPosition }`)
    }
    return department
}

export async function checkDepartmentId(id: number) {
    const department = await prisma.departements.findUnique({
        where: { id }
    })

    if (!department) {
        // throw new ErrorCheck("Department Not Exist", 'checkDepartmentId')
        throw new ErrorDatabase("checkDepartmentId : Department Not Exist",)
    }

    return department
}

export async function departmentCreateFormDataAction(state: DepartmentFormState, formData: FormData): Promise<DepartmentFormState> {
    const position = formData.get('position') as string;

    // try {
    // Validate form fields
    const validatedFields = DepartmentFormSchema.safeParse({
        position,
    })

    // // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            form: position,
            message: "Validation Failed.",
            success: false
        }
    }

    const departmentDB = await prisma.departements.findUnique({
        where: { position }
    })

    if (departmentDB) {
        return {
            message: "Department already exists",
            success: false
        }
    }

    await prisma.departements.create({
        data: { position: validatedFields.data.position }
    })
    revalidatePath('/')
    return {
        success: true,
        message: "Department created successfully",
    }

    // } catch (e) {
    //
    //     if (isRedirectError(e)) {
    //         throw e
    //     }
    //
    //     if (e instanceof z.ZodError) {
    //         return catchErrorZod(e, 'departmentCreateFormDataAction')
    //     }
    //
    //     if (e instanceof Error) {
    //         return {
    //             message: e.message,
    //             // prev: { email, password }
    //         }
    //     }
    //
    //     return {
    //         message: 'An errors occurred while creating your account.',
    //         // prev: { email, password }
    //
    //     }
    // }

}

export async function departmentDeleteAction(departmentId: number): Promise<ActionResponse> {
    try {
        await checkDepartmentId(departmentId);
        const data = await prisma.departements.delete({ where: { id: departmentId } })
        return {
            data,
            success: true,
            message: "Successfully deleted "
        };
    } catch (e) {
        // if (e instanceof ErrorCheck) {
        if (e instanceof Error) {
            return {
                success: false,
                message: e.message,
                data: null,
            }
        }

        return {
            data: null,
            success: false,
            message: 'departmentDeleteAction : Something went wrong',
        }
    }
}

export async function departmentUpdateAction({ departmentId, position }: DepartmentUpdateActionType): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        return prisma.$transaction(async (tx) => {

            const departmentDB = await tx.departements.findUnique({ where: { id: departmentId } })

            if (!departmentDB) {
                throw new Error("Department Not Exist")
            }

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
        if (e instanceof Error) {
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

export type DepartmentPosition = { id: number, position: string, count: number }

export async function departmentEmployeeLoader(): Promise<DepartmentPosition[]> {
    return prisma.$transaction(async (tx) => {
        const departments = await tx.departements.findMany()
        const employee = await tx.employees.groupBy({
            by: [ 'department' ],
            _count: true,
        })
        return departments.map(dept => ( {
            id: dept.id,
            position: dept.position,
            count: employee.find(emp => emp.department === dept.position)?._count ?? 0
        } ));
    });
}
