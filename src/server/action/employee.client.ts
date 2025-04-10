'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { pathImage, saveImage, setPathImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize, employeeSanitizeFormData } from "@/sanitize/employe.sanitize";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { checkDepartmentPosition } from "@/server/action/department";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { EMPLOYEE_STATUS } from "@/interface/enum";

export const employeeCreateUser = async ({ img, ...data }: EmployeeCreateZodClient) => {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const filePath = await setPathImage(imageFile)    // Save the image path to the database
        // console.log("filePath", filePath)
        const employeeData = employeeSanitize(data, isImage ? filePath : undefined, data?.userId)
        const response = await employeeRepository.createUserRepo(employeeData)
        console.log('response : ', response)
        if (response && isImage) {
            const pathImage = await saveImage(imageFile, filePath)
            console.log('saveImage : ', pathImage)
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
        const employeeData = employeeSanitizeFormData(formData, isImage ? filePath : undefined, data?.userId)
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



