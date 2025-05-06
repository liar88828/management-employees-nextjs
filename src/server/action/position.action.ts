'use server'
import { FormStateLogin } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { PositionFormSchema, PositionFormState } from "@/schema/departement.valid";
import { redirect } from "next/navigation";
import { ErrorDatabase } from "@/utils/error/ErrorClass";
import { ActionResponse } from "@/interface/action";
import { revalidatePath } from "next/cache";
import { globalPageSize } from "@/config/nextPublicBaseUrl";

export type PositionUpdateActionType = { positionId: number, position: string };

export async function positionGetAllPage() {
    const positions = await prisma.positions.findMany()

    if (positions.length === 0) {
        redirect(`/admin/position`)
    }
    return positions
}

export async function profileManagementFindAll(state: PositionFormState, formData: FormData) {

}

export async function profileManagementFindById(state: FormStateLogin, formData: FormData) {

}

export async function profileManagementUpdate(state: any, formData: FormData) {

}

export async function checkPositionPosition(positionPosition: string) {
    const position = await prisma.positions.findUnique({
        where: {
            position: positionPosition
        }
    })
    if (!position) {
        throw new ErrorDatabase(`Position not found for ${ positionPosition }`)
    }
    return position
}

export async function checkPositionId(id: number) {
    const position = await prisma.positions.findUnique({
        where: { id }
    })

    if (!position) {
        // throw new ErrorCheck("Position Not Exist", 'checkPositionId')
        throw new ErrorDatabase("checkPositionId : Position Not Exist",)
    }

    return position
}

export async function positionCreateFormDataAction(state: PositionFormState, formData: FormData): Promise<PositionFormState> {
    const position = formData.get('position') as string;

    // try {
    // Validate form fields
    const validatedFields = PositionFormSchema.safeParse({
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

    const positionDB = await prisma.positions.findUnique({
        where: { position }
    })

    if (positionDB) {
        return {
            message: "Position already exists",
            success: false
        }
    }

    await prisma.positions.create({
        data: { position: validatedFields.data.position }
    })
    revalidatePath('/')
    return {
        success: true,
        message: "Position created successfully",
    }

    // } catch (e) {
    //
    //     if (isRedirectError(e)) {
    //         throw e
    //     }
    //
    //     if (e instanceof z.ZodError) {
    //         return catchErrorZod(e, 'positionCreateFormDataAction')
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

export async function positionDeleteAction(positionId: number): Promise<ActionResponse> {
    try {
        await checkPositionId(positionId);
        const data = await prisma.positions.delete({ where: { id: positionId } })
        return {
            prevData: data,
            success: true,
            message: "Successfully deleted "
        };
    } catch (e) {
        // if (e instanceof ErrorCheck) {
        if (e instanceof Error) {
            return {
                success: false,
                message: e.message,
                prevData: null,
            }
        }

        return {
            prevData: null,
            success: false,
            message: 'positionDeleteAction : Something went wrong',
        }
    }
}

export async function positionUpdateAction({ positionId, position }: PositionUpdateActionType): Promise<{
    success: boolean,
    message: string,
}> {
    try {
        return prisma.$transaction(async (tx) => {

            const positionDB = await tx.positions.findUnique({ where: { id: positionId } })

            if (!positionDB) {
                throw new Error("Position Not Exist")
            }

            await tx.positions.update({
                where: { id: positionId },
                data: { position }
            })

            await tx.employees.updateMany({
                where: { position: positionDB.position },
                data: { position: position }
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

export type PositionPosition = { id: number, position: string, count: number }

export async function positionEmployeeLoader(page: number): Promise<{
    totalPages: number,
    data: PositionPosition[]
}> {
    return prisma.$transaction(async (tx) => {

        const positionCount = await tx.positions.count()

        const positions = await tx.positions.findMany({
                skip: ( page - 1 ) * globalPageSize,
                take: globalPageSize,
            }
        )

        const employee = await tx.employees.groupBy({
            by: [ 'position' ],
            _count: true,
        })
        const totalPages = Math.ceil(positionCount / globalPageSize);

        return {
            data: positions.map(dept => ( {
                id: dept.id,
                position: dept.position,
                count: employee.find(emp => emp.position === dept.position)?._count ?? 0
            } )),

            totalPages
        };
    });
}
