import TrolleyRepository from "@/server/repository/trolley.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { OrderProductCreate, OrderProductUpdate, } from "@/validation/orderProduct.valid"
import { TContext } from "@/interface/server/param"
import { TTrolleyCreate } from "@/interface/entity/trolley.model";
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class TrolleyController implements InterfaceController {
	constructor(private trolleyRepository: TrolleyRepository) {
	}

	async findAll(request: NextRequest, __: TContext): Promise<any> {
        const session = await authApi(request)
        return this.trolleyRepository.findAll({
            pagination: {
                page: Number(getParams(request, "page") ?? '1'),
                limit: Number(getParams(request, "limit") ?? '10'),
            },
            filter: { id_user: session.sessionId }
        })
	}

    async findById(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request)
		const id = await getId(context)
		return this.trolleyRepository.findById(UUIDSchema.parse(id))
	}

    async createOne(request: NextRequest, _context: TContext): Promise<any> {
        const session = await authApi(request)
        const json: TTrolleyCreate = await getJson(request)
        json.id_user = session.sessionId
		return this.trolleyRepository.createOne(OrderProductCreate.parse(json))
	}

	async updateOne(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request)
		const id = await getId(context)
		const json = await getJson(request)
		return this.trolleyRepository.updateOne(OrderProductUpdate.parse(json), id)
	}

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request)
		const id = await getId(context)
		return this.trolleyRepository.deleteOne(UUIDSchema.parse(id))
	}

    async increment(request: NextRequest, context: TContext) {
        await authApi(request)
		const id = await getId(context)
		return this.trolleyRepository.increment(id)
	}

    async decrement(request: NextRequest, context: TContext) {
        await authApi(request)
		const id = await getId(context)
		return this.trolleyRepository.decrement(id)
	}

    async count(request: NextRequest, _context: TContext) {
        const session = await authApi(request)
        return this.trolleyRepository.count(session.sessionId)
	}
}
