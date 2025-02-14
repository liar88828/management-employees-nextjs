'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { pathImage, saveImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize } from "@/sanitize/employe.sanitize";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { checkDepartmentPosition } from "@/server/action/department";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { EMPLOYEE_STATUS } from "@/interface/enum";

export const employeeCreateUser = async ({ img, ...data }: EmployeeCreateZodClient) => {
    try {
        const isImage = typeof img === 'object'
        // console.log('isImage', isImage)
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData)    // Save the image path to the database
        const employeeData = employeeSanitize(formData, isImage ? filePath : undefined, data?.userId)
        const response = await employeeRepository.createUserRepo(employeeData)
        if (response && isImage) {
            await saveImage(formData, filePath)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function employeeUpdateUser({ img, ...data }: EmployeeCreateZodClient, employeeId: string) {
    try {
        const isImage = typeof img === 'object';
        // console.log(isImage, 'typeImage')
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitize(formData, isImage ? filePath : undefined, data?.userId)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId)
        console.log(isImage, response)
        if (response && isImage) {
            await updateImage(formData, filePath)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function onUpsertDataUser(
    method: "POST" | "PUT",
    data: EmployeeCreateZodClient,
    id?: string) {
    await checkDepartmentPosition(data.department);
    if (method === "POST") {
        data.status = EMPLOYEE_STATUS.Pending
        return employeeCreateUser(data)
    } else if (method === "PUT" && id) {
        return employeeUpdateUser(data, id)
    }
    throw new Error('Invalid data');
}

export async function getEmployeeByUserIdRedirect(userId: string): Promise<TEmployeeDB> {
    return getEmployeeById({ userId }).then(data => {
        if (!data) redirect('/home')
        return data
    })
}

export async function getEmployeeByUserIdForIDCard(userId: string) {
    return prisma.employees.findUnique({
        where: { userId, status: EMPLOYEE_STATUS.Active },
        include: {
            languages: true,
            skills: true,
            educations: true
        },
    })

}



