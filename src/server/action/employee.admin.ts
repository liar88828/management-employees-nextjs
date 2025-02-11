'use server'
import { EmployeeCreateZodClient } from "@/validation/employee.valid";
import { pathImage, saveImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize } from "@/sanitize/employe.sanitize";
import { employeeRepository, testimonialRepository } from "@/server/controller";
import { TestimonialFormState } from "@/validation/testimonial.valid";
import { sanitizedTestimonialID, testimonialSanitize } from "@/sanitize/testimonial.sanitize";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/config/prisma";

export async function createEmployeeActionAdmin(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
    const formRaw = testimonialSanitize(formData);
    try {
        if (formRaw.method === 'POST') {
            await testimonialRepository.createOne(formRaw)
        } else if (formRaw.method === 'PUT' && formRaw.id) {
            await testimonialRepository.updateOne(formRaw, formRaw.id)
        }
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof ZodError) {
            return {
                message: 'Validation failed',
                prev: formRaw,
                errors: error.flatten().fieldErrors
            }
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
                prev: formRaw,
            }
        }

    }
}

export async function updateEmployeeActionAdmin(_prev: TestimonialFormState, formData: FormData): Promise<any> {
    const { id } = sanitizedTestimonialID(formData);
    try {
        await testimonialRepository.deleteOne(id)
        revalidatePath('/')
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
            }
        }

    }
}

export const employeeCreateAdmin = async ({ img, ...data }: EmployeeCreateZodClient) => {
    console.log('employeeCreateAdmin', data);
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));
    const filePath = await pathImage(formData)    // Save the image path to the database
    const employeeData = employeeSanitize(formData, filePath)
    const response = await employeeRepository.createUserRepo(employeeData)
    if (response) {
        await saveImage(formData, filePath)
    }
    return response

}

export async function employeeUpdateAdmin({ img, ...data }: EmployeeCreateZodClient, employeeId: string) {
    try {
        const typeImage = typeof img === 'object';
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitize(formData, filePath, data.userId, typeImage)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId)
        if (response && typeImage) {
            await updateImage(formData, filePath)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function onUpsertDataAdmin(
    method: "POST" | "PUT",
    data: EmployeeCreateZodClient,
    id?: string) {
    try {
        if (method === "POST") {
            data.status = "Pending"
            return employeeCreateAdmin(data)
        } else if (method === "PUT" && id) {
            return employeeUpdateAdmin(data, id)
        }
        throw new Error('Something went wrong');
    } catch (error) {
        if (error instanceof ZodError) {
            throw error.flatten().fieldErrors
        }

        if (error instanceof Error) {
            console.log(error.message);
            throw error.message;
        }
    }
}

export async function onConnectUserEmployee(userId: string, employeeId: string) {

    return prisma.$transaction(async (tx) => {
        // null last value
        const found = await tx.employees.findUnique({
            where: { userId },
            select: { userId: true }
        })
        if (found) {
            await tx.employees.update({
                    data: { userId: null },
                    where: { userId }
                }
            )
        }
        // fill new Value
        await tx.employees.update({
                data: { userId },
                where: { id: employeeId }
            }
        )
    })
}

export const removeUserEmployee = async (employeeId: string,) => {
    await prisma.employees.update({
        where: { id: employeeId },
        data: { userId: null }
    })
}


