import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { PaymentCreate } from "@/validation/payment.valid"
import { PaymentRepository } from "@/server/repository/payment.repo"
import { TContext } from "@/interface/server/param"
import { getId, getJson, getParams } from "@/utils/requestHelper"
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class PaymentController
	implements InterfaceController {
	constructor(private paymentRepository: PaymentRepository) {

	}

  async findAll(request: NextRequest, __: TContext): Promise<any> {
	  return this.paymentRepository.findAll({
		  filter: {
			  address: getParams(request, "address"),
			  type: getParams(request, "type"),
			  name: getParams(request, "name"),
		  },
          pagination: {
              page: Number(getParams(request, "page") ?? '1'),
              limit: Number(getParams(request, "limit") ?? '100'),
          }
	  })
  }

  async findById(_: NextRequest, context: TContext) {
    const id = await getId(context)
    return this.paymentRepository.findById(UUIDSchema.parse(id))
  }

  async createOne(request: NextRequest, _: TContext) {
      await authApi(request, true)
    const json = await getJson(request)
    return this.paymentRepository.createOne(PaymentCreate.parse(json))
  }

  async updateOne(request: NextRequest, context: TContext) {
      await authApi(request, true)
    const json = await getJson(request)
    const id = await getId(context)
    return this.paymentRepository.updateOne(
      PaymentCreate.parse(json),
      UUIDSchema.parse(id)
    )
  }

    async deleteOne(request: NextRequest, context: TContext) {
        await authApi(request, true)
    const id = await getId(context)
    return this.paymentRepository.deleteOne(UUIDSchema.parse(id))
  }
}
