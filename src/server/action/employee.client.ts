'use server'
import { redirect } from "next/navigation";
import { employeeRepository } from "@/server/controller";
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { saveImage, setPathImage, updateImage } from "@/server/repository/image.repo";
import { employeeSanitize, employeeSanitizeUpdate } from "@/sanitize/employe.sanitize";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { checkDepartmentPosition } from "@/server/action/department";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { prisma } from "@/config/prisma";
import { EMPLOYEE_STATUS } from "@/interface/enum";
import { ZodError } from "zod";

export const employeeCreateUser = async ({ img, ...data }: EmployeeCreateZodClient) => {
    try {
        const isImage = typeof img === 'object'
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        const employeeData = employeeSanitize(data, imagePath, data?.userId)
        const response = await employeeRepository.createUserRepo(employeeData)
        console.log('response : ', response)
        if (response && isImage && imagePath) {
            const pathImage = await saveImage(imageFile, imagePath)
            console.log('saveImage : ', pathImage)
        }
        return response
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export async function employeeUpdateUser(
    { img, ...data }: EmployeeCreateZodClient,
    employeeId: string) {
    try {
        const isImage = typeof img === 'object';
        const imageFile = img[0]
        const imagePath = await setPathImage(imageFile)    // Save the image path to the database
        // console.log('imageFile',imageFile)
        const employeeData = employeeSanitizeUpdate(data, imagePath, data?.userId)
        const response = await employeeRepository.updateUserRepo(employeeData, employeeId)
        // console.log('isImage, response',isImage, response)
        if (response && isImage && imagePath) {
            await updateImage(imageFile, imagePath)
        }
        return response
    } catch (error) {

        if (error instanceof ZodError) {
            // console.log(error.flatten().fieldErrors);
            // console.log('----');
            // console.log(error.flatten().fieldErrors);
            // error.flatten().fieldErrors.toString()
            // throw {
            //     error: error.flatten().fieldErrors,
            //     from: "VALIDATION",
            // }
            throw JSON.stringify(error.flatten().fieldErrors)
        }
        if (error instanceof Error) {
            // console.log(error.message);
            throw error.message;
        }
    }
}

export async function onUpsertDataUser(
    method: "POST" | "PUT",
    data: EmployeeCreateZodClient,
    idEmployee?: string
) {
    await checkDepartmentPosition(data.department);
    console.log(method, idEmployee)
    if (method === "POST") {
        data.status = EMPLOYEE_STATUS.Registration
        return employeeCreateUser(data)
    } else if (method === "PUT" && idEmployee) {
        // console.log('Execute ')
        return employeeUpdateUser(data, idEmployee)
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



