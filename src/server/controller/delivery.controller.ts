import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import DeliveryRepository from "@/server/repository/delivery.repo"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { DeliveryCreate } from "@/validation/delivery.valid"
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class DeliveryController
    implements InterfaceController {
    constructor(private deliveryRepository: DeliveryRepository) {
    }

    async findAll(request: NextRequest, __: TContext): Promise<any> {
        return this.deliveryRepository.findAll({
            filter: {
                address: getParams(request, "address"),
                type: getParams(request, "type"),
                name: getParams(request, "name"),
            },
            pagination: {}
        })
    }

    async findById(_: NextRequest, context: TContext) {
        const id = await getId(context)
        return this.deliveryRepository.findById(UUIDSchema.parse(id))
    }

    async createOne(request: NextRequest, __: TContext) {
        await authApi(request, true)
        const json = await request.json()
        return this.deliveryRepository.createOne(DeliveryCreate.parse(json))
    }

    async updateOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const json = await getJson(request)
        const id = await getId(context)
        return this.deliveryRepository.updateOne(
            DeliveryCreate.parse(json),
            UUIDSchema.parse(id)
        )
    }

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        // if (res) {
        // 	await fileSystem(res.img)
        // }
        return await this.deliveryRepository.deleteOne(UUIDSchema.parse(id))
    }
}
