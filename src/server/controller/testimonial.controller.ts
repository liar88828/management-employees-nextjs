import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getIdNum, getParamsNum } from "@/utils/requestHelper"
import TestimonialRepository from "@/server/repository/testimonial.repo";
import { authApi } from "@/server/lib/api";

export default class TestimonialController
    implements InterfaceController {
    constructor(private ceremonyRepository: TestimonialRepository) {
    }

    async findAll(request: NextRequest, __: TContext): Promise<any> {
        const limit = getParamsNum(request, "limit")
        return this.ceremonyRepository.findAll({
            pagination: { limit },
            filter: {}
        })
    }

    async findById(request: NextRequest, context: TContext) {
        await authApi(request)
        let id = await getIdNum(context)
        return this.ceremonyRepository.findById(id)
    }

    async createOne(request: NextRequest, __: TContext) {
        await authApi(request, true)
        let data = await request.json()
        return this.ceremonyRepository.createOne(data)
    }

    async updateOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
        let data = await request.json()
        let id = Number(await getId(context))
        return this.ceremonyRepository.updateOne(data, id)
    }

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
        let id = Number(await getId(context))
        return this.ceremonyRepository.deleteOne(id)
    }
}
