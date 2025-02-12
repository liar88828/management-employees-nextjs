'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeCreateZodClient } from "@/validation/employee.valid";
import { pathImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize } from "@/sanitize/employe.sanitize";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { getEmployeeByUserId } from "@/server/controller/employee.controller";
import { checkDepartmentPosition } from "@/server/action/department";

export const employeeCreateUser = async ({ img, ...data }: EmployeeCreateZodClient) => {
    try {
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData)    // Save the image path to the database
        const employeeData = employeeSanitize(formData, filePath, data?.userId)
        const response = await employeeRepository.createUserRepo(employeeData)
        if (response) {
            await updateImage(formData, filePath)
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
        const typeImage = typeof img === 'object';
        const formData = new FormData();
        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));
        const filePath = await pathImage(formData, false)    // Save the image path to the database
        const employeeData = employeeSanitize(formData, filePath, data?.userId, typeImage)
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

export async function onUpsertDataUser(
    method: "POST" | "PUT",
    data: EmployeeCreateZodClient,
    id?: string) {
    await checkDepartmentPosition(data.department);
    if (method === "POST") {
        data.userId
        // data.employmentType = 'Full-Time'
        data.status = 'Pending'
        return employeeCreateUser(data)
    } else if (method === "PUT" && id) {
        return employeeUpdateUser(data, id)
    }
    throw new Error('Invalid data');
}

export async function getEmployeeByUserIdRedirect(userId: string): Promise<TEmployeeDB> {
    return getEmployeeByUserId(userId).then(data => {
        if (!data) redirect('/home')
        return data
    })
}