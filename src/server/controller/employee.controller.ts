import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getParams } from "@/utils/requestHelper"
import EmployeeRepository from "@/server/repository/employee.repo";
import { pathImage, saveImage } from "@/server/repository/image.repo";
import { employeeSanitize } from "@/sanitize/employe.sanitize";
import { employeeCreateServer } from "@/schema/employee.valid";
import { zodUUID } from "@/schema/zod.valid";
import { prisma } from "@/config/prisma";
import { TEmployeeDB } from "@/interface/entity/employee.model";

export default class EmployeeController
    implements InterfaceController {
    constructor(private employeeRepository: EmployeeRepository) {

    }

    async getTestimonialAll(request: NextRequest, __: TContext): Promise<any> {
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

    async testimonialById(request: NextRequest, context: TContext) {

        const id = await getId(context)
        return this.employeeRepository.findById({ employeeId: zodUUID.parse(id) })
    }


    async findPhotoById(request: NextRequest, context: TContext) {

        const id = await getId(context)
        return this.employeeRepository.findById({ employeeId: zodUUID.parse(id) })
    }


    async testimonialCreate(request: NextRequest, __: TContext) {

        // Parse the incoming form data
        const formData = await request.formData();

        // Save the image path to the database
        const filePath = await pathImage(formData, true)
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


    async testimonialUpdate(request: NextRequest, context: TContext) {

        // const json = await getJson(request)
        // const id = await getId(context)
        // return this.employeeRepository.updateOne(
        // 	employeeCreateZod.parse(json),
        // 	UUIDSchema.parse(id)
        // )
    }

    async testimonialDelete(request: NextRequest, context: TContext) {

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
        const data = employeeSanitize(formData, filePath, userId)
        const response = await this.employeeRepository.createOne(data)
        if (response) {
            await saveImage(formData, filePath)
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

