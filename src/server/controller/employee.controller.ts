import {InterfaceController} from "@/interface/server/InterfaceController"
import {NextRequest} from "next/server"
import {TContext} from "@/interface/server/param"
import {getId, getParams} from "@/utils/requestHelper"
import EmployeeRepository from "@/server/repository/employee.repo";
import {pathImage, saveImage} from "@/server/repository/image.repo";
import {employeeSanitize} from "@/sanitize/employe.sanitize";
import {employeeCreateServer} from "@/validation/employee.valid";
import {authApi} from "@/server/lib/api";
import {zodUUID} from "@/validation/zod.valid";
import {prisma} from "@/config/prisma";
import {TEmployeeDB} from "@/interface/entity/employee.model";

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
        return this.employeeRepository.findById(zodUUID.parse(id))
    }


    async employeeFindPhotoById(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        return this.employeeRepository.findById(zodUUID.parse(id))
    }


    async employeeCreate(request: NextRequest, __: TContext) {
        console.log('test')
        await authApi(request, true)

        // Parse the incoming form data
        const formData = await request.formData();

        // Save the image path to the database
        const filePath = await pathImage(formData)
        // console.log(filePath)
        const data = employeeSanitize(formData, filePath, '')
        const response = await this.employeeRepository.createOne(
            employeeCreateServer.parse(data)
        )
        if (response) {
            await saveImage(formData, filePath)
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
        await authApi(request)
        const userId = await getId(context)
        return this.employeeRepository.findByUserId(zodUUID.parse(userId))
    }

    async createByUserId(request: NextRequest, context: TContext) {
        const userId = await getId(context)
        const formData = await request.formData();          // Parse the incoming form data
        const filePath = await pathImage(formData)    // Save the image path to the database
        const data = employeeSanitize(formData, filePath, userId)
        const response = await this.employeeRepository.createOne(data)
        if (response) {
            await saveImage(formData, filePath)
        }
        return response
    }

}


export async function getEmployeeByUserId(userId: string): Promise<TEmployeeDB | undefined> {
    return prisma.employees.findUnique({
        where: {
            userId
        },
        include: {
            languages: true,
            skills: true,
        },
    })
        .then(data => {
            if (!data) return undefined;
            return data
        })
}