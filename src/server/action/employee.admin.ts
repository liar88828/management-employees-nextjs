'use server'
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { pathImage, saveImageFormData, updateImageFormData } from "@/server/repository/image.repo";
import { employeeSanitizeFormData } from "@/sanitize/employe.sanitize";
import { employeeRepository } from "@/server/controller";
import { ZodError } from "zod";
import { prisma } from "@/config/prisma";
import { checkDepartmentPosition } from "@/server/action/department";
import { EMPLOYEE_STATUS } from "@/interface/enum";

export const employeeCreateAdmin = async ({ img, ...data }: EmployeeCreateZodClient) => {
    // console.log('employeeCreateAdmin', data);
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));

    const filePath = await pathImage(formData)    // Save the image path to the database
    const employeeData = employeeSanitizeFormData(formData, filePath)
    const response = await employeeRepository.createUserRepo(employeeData)
    if (response) {
        await saveImageFormData(formData, filePath)
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
        const employeeData = employeeSanitizeFormData(formData, filePath, data.userId)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId)
        if (response && typeImage) {
            await updateImageFormData(formData, filePath)
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
        await checkDepartmentPosition(data.department);
        if (method === "POST") {
            data.status = EMPLOYEE_STATUS.Registration
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


