import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getParams } from "@/utils/requestHelper"
import { pathImage, saveImageFormData } from "@/server/repository/image.repo";
import { employeeSanitizeFormData } from "@/sanitize/employe.sanitize";
import { authApi } from "@/server/lib/api";
import { prisma } from "@/config/prisma";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import EmployeeRepository from "@/server/repository/employee.repo";
import { zodUUID } from "@/schema/zod.valid";
import { employeeCreateServer } from "@/schema/employee.valid";

export default class EmployeeController
    implements InterfaceController {
    constructor(private employeeRepository: EmployeeRepository) {

    }

    async employeeGetAll(request: NextRequest, __: TContext): Promise<any> {
        await authApi(request, true)
        return this.employeeRepository.findAll({
                filter: {
                    name: getParams(request, "name") ?? '',
                    status: getParams(request, "status") ?? '',
                },
                pagination: {
                    page: Number(getParams(request, "page") ?? '1'),
                    limit: Number(getParams(request, "limit") ?? '100'),
                }
            }
        )
    }

    async employeeById(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        return this.employeeRepository.findById({ employeeId: zodUUID.parse(id) })
    }

    async employeeFindPhotoById(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        return this.employeeRepository.findById({ employeeId: zodUUID.parse(id) })
    }

    async employeeCreate(request: NextRequest, __: TContext) {
        console.log('test')
        await authApi(request, true)

        // Parse the incoming form data
        const formData = await request.formData();

        // Save the image path to the database
        const filePath = await pathImage(formData, true)
        // console.log(filePath)
        const data = employeeSanitizeFormData(formData, filePath, '')
        const response = await this.employeeRepository.createOne(
            employeeCreateServer.parse(data)
        )
        if (response) {
            await saveImageFormData(formData, filePath)
        }
        return response
    }

    async employeeUpdate(request: NextRequest, context: TContext) {
        await authApi(request, true)
        // const json = await getJson(request)
        // const id = await getId(context)
        // return this.employeeRepository.updateOne(
        // 	employeeCreateZod.parse(json),
        // 	UUIDSchema.parse(id)
        // )
    }

    async employeeDelete(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        // if (res) {
        // 	await fileSystem(res.img)
        // }
        return await this.employeeRepository.deleteOne(zodUUID.parse(id))
    }

    // --- user
    async findByUserId(request: NextRequest, context: TContext) {
        const userId = await getId(context)
        return this.employeeRepository.findById({ userId: zodUUID.parse(userId) })
    }

    async createByUserId(request: NextRequest, context: TContext) {
        const userId = await getId(context)
        const formData = await request.formData();          // Parse the incoming form data
        const filePath = await pathImage(formData, true)    // Save the image path to the database
        const data = employeeSanitizeFormData(formData, filePath, userId)
        const response = await this.employeeRepository.createOne(data)
        if (response) {
            await saveImageFormData(formData, filePath)
        }
        return response
    }
}

export async function getEmployeeById({ userId, employeeId }: {
    userId?: string,
    employeeId?: string
}): Promise<TEmployeeDB | undefined> {
    return prisma.employees.findUnique({
        where: { userId, id: employeeId },
        include: {
            languages: true,
            skills: true,
            educations: true
        },
    })
    .then(data => {
        if (!data) return undefined;
        return data
    })
}