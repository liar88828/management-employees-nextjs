import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import UserRepository from "@/server/repository/user.repo";
import { UserCreate } from "@/validation/user.valid";
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class UserController
	implements InterfaceController {
	constructor(private userRepository: UserRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
        await authApi(request, true)
		return this.userRepository.findAll({
			filter: {
				name: getParams(request, "name") ?? '',
				address: getParams(request, "address") ?? '',
			},
			pagination: {
                page: Number(getParams(request, "page") ?? '1'),
                limit: Number(getParams(request, "limit") ?? '100'),
			}
        })
	}

    async findById(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request)
		const id = await getId(context)
		return this.userRepository.findById(
			// id
			UUIDSchema.parse(id)
		)
	}

	async createOne(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
		const json = await getJson(request)
        // console.log(`test :${ json }`)
		return this.userRepository.createOne(UserCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
		const id = await getId(context)
		const json = await getJson(request)
		return this.userRepository.updateOne(
			UserCreate.parse(json),
			UUIDSchema.parse(id)
		)
	}

	async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
		const id = await getId(context)
        // if (res) {
		// await fileSystem( res.img )
		// }
        return await this.userRepository.deleteOne(
            // UUIDSchema.parse(id)
            UUIDSchema.parse(id)
        )
	}
}
