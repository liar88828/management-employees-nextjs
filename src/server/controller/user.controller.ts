import { InterfaceController } from "@/interface/server/InterfaceController"
import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import UserRepository from "@/server/repository/user.repo";
import { UserCreate } from "@/validation/user.valid";
import { authApi } from "@/server/lib/api";
import { zodUUID } from "@/validation/zod.valid";

export default class UserController
	implements InterfaceController {
	constructor(private userRepository: UserRepository) {
	}

	async getTestimonialAll(request: NextRequest, __: TContext): Promise<any> {
        await authApi(request, true)
		return this.userRepository.findAll({
			filter: {
				name: getParams(request, "name") ?? '',
			},
			pagination: {
                page: Number(getParams(request, "page") ?? '1'),
                limit: Number(getParams(request, "limit") ?? '100'),
			}
        })
	}

    async testimonialById(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request)
		const id = await getId(context)
		return this.userRepository.findById(
			// id
			zodUUID.parse(id)
		)
	}

	async testimonialCreate(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
		const json = await getJson(request)
        // console.log(`test :${ json }`)
		return this.userRepository.createOne(UserCreate.parse(json))
	}

	async testimonialUpdate(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
		const id = await getId(context)
		const json = await getJson(request)
		return this.userRepository.updateOne(
			UserCreate.parse(json),
			zodUUID.parse(id)
		)
	}

	async testimonialDelete(request: NextRequest, context: TContext) {
        await authApi(request, true)
		const id = await getId(context)
        // if (res) {
		// await fileSystem( res.img )
		// }
        return await this.userRepository.deleteOne(
            // UUIDSchema.parse(id)
            zodUUID.parse(id)
        )
	}
}
