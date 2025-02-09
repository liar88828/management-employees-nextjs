import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getParams } from "@/utils/requestHelper"
import EmployeeRepository from "@/server/repository/employee.repo";
import { pathImage, saveImage } from "@/server/repository/image.repo";
import { employeeSanitize } from "@/sanitize/employe.sanitize";
import { employeeCreateServer } from "@/validation/employee.valid";
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class EmployeeController
	implements InterfaceController {
	constructor(private employeeRepository: EmployeeRepository) {

	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
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

    async findById(request: NextRequest, context: TContext) {
        await authApi(request, true)
		const id = await getId(context)
		return this.employeeRepository.findById(UUIDSchema.parse(id))
	}

    async findPhotoById(request: NextRequest, context: TContext) {
        await authApi(request, true)
		const id = await getId(context)
		return this.employeeRepository.findById(UUIDSchema.parse(id))
	}


	async createOne(request: NextRequest, __: TContext) {
        await authApi(request, true)

			// Parse the incoming form data
			const formData = await request.formData();

		// Save the image path to the database
			const filePath = await pathImage(formData)
		// console.log(filePath)
        const data = employeeSanitize(formData, filePath)
		const response = await this.employeeRepository.createOne(
			employeeCreateServer.parse(data)
		)
			if (response) {
				await saveImage(formData, filePath)
			}
			return response
	}

	async updateOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
		// const json = await getJson(request)
		// const id = await getId(context)
		// return this.employeeRepository.updateOne(
		// 	employeeCreateZod.parse(json),
		// 	UUIDSchema.parse(id)
		// )
	}

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
		const id = await getId(context)
        // if (res) {
		// 	await fileSystem(res.img)
		// }
        return await this.employeeRepository.deleteOne(UUIDSchema.parse(id))
	}
}
