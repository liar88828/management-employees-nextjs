import OrderRepository from "@/server/repository/order.repo"
import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { OrderProductTransaction } from "@/validation/orderProduct.valid"
import { ReceiverCreate } from "@/validation/receiver.valid"
import { TContext } from "@/interface/server/param"
import {
    IncomingStatusResponse,
    TOrderTransactionCreate,
    TOrderTransactionUpdate,
} from "@/interface/entity/transaction.model"
import { TStatusOrder } from "@/interface/Utils";
import { getId, getJson, getParams, getParamsThrow } from "@/utils/requestHelper"
import { orderCreateServer } from "@/validation/order.valid"
import { prisma } from "@/config/prisma";
import { z } from "zod";
import { STATUS } from "@/app/components/toStatus";
import { authApi } from "@/server/lib/api";
import { UUIDSchema } from "@/validation/zod.valid";

export default class OrderController
    implements InterfaceController {
    constructor(private orderRepository: OrderRepository) {
    }

    async findAll(request: NextRequest, context: TContext): Promise<any> {

        const year = getParams(request, 'year')
        if (year) {
            // console.log(year)
            return this.orderRepository.getMonthlyTotal(Number(year))
        } else {
            return this.orderRepository.findAll({
                filter: {
                    name: getParams(request, "name") ?? '',
                    status: getParams(request, "status") ?? '',
                },
                pagination: {
                    limit: Number(getParams(request, "limit") ?? '100'),
                    page: Number(getParams(request, "page") ?? '1'),

                }
            })
        }

    }

    async findOrderStatusUser(request: NextRequest, _: TContext): Promise<any> {
        const { sessionId: userId } = await authApi(request, true)
        const status = getParams(request, 'status',) ?? ''
        return this.orderRepository.findOrderStatus({ status, userId })
    }

    async createOne(request: NextRequest, _: TContext): Promise<any> {
        const json: TOrderTransactionCreate = await getJson(request)
        const data: TOrderTransactionCreate = {
            order: orderCreateServer.parse(json.order),
            orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
            orderReceiver: ReceiverCreate.parse(json.orderReceiver),
        }
        return this.orderRepository.createOne(data)
    }

    async updateOne(request: NextRequest, context: TContext): Promise<any> {
        const json = await getJson(request)
        const id = await getId(context)
        const data: TOrderTransactionUpdate = {
            order: orderCreateServer.parse(json.order),
            orderTrolley: OrderProductTransaction.parse(json.orderTrolley),
            orderReceiver: ReceiverCreate.parse(json.orderReceiver)
        }
        return this.orderRepository.updateOne(data, UUIDSchema.parse(id))

    }

    async deleteOne(request: NextRequest, context: TContext): Promise<any> {
        await authApi(request, true)
        const id = await getId(context)
        return this.orderRepository.deleteOne(UUIDSchema.parse(id))
    }

    async updateStatus(request: NextRequest, context: TContext) {
        await authApi(request, true)
        const id = await getId(context)
        const status = getParamsThrow(request, "status")
        return this.orderRepository.updateStatus(status, id)
    }

    async findById(request: NextRequest, context: TContext) {
        await authApi(request)
        const id = await getId(context)
        return this.orderRepository.findById(id)
    }

    async findHistoryUser(request: NextRequest, _context: TContext) {
        const session = await authApi(request)
        const status = getParams(request, "status") ?? ''
        const limit = getParams(request, "limit") ?? ''
        return this.orderRepository.findHistoryUser(
            status,
            session.sessionId,
            Number(limit)
        )
    }

    async findByMonth(request: NextRequest, _: TContext) {
        await authApi(request, true)
        const status = getParamsThrow(request, 'status') as TStatusOrder
        return this.orderRepository.findByMonth(status)

    }

    async findTopOrderTotal(request: NextRequest, _: TContext) {
        await authApi(request, true)
        return this.orderRepository.findTopOrderTotal()

    }

    async incomingFindCon(request: NextRequest, _: TContext): Promise<IncomingStatusResponse[]> {
        await authApi(request, true)
        const status = getParamsThrow(request, "status")
        const search = getParams(request, "search") ?? ''
        return prisma.orders.findMany({
            take: 10,
            where: {
                status: status,
                ...( search ? { id: { contains: search } } : {} ),
                // ...( search ? { Customers: { name: { contains: search } } } : {} )
            },
            include: {
                Customers: true,
                Trolleys: true
            },
            orderBy: {
                updated_at: 'desc'
            }
        })
    }

    async incomingAction(request: NextRequest, _: TContext) {
        await authApi(request, true)
        const validData = z.object({
            id: z.string().uuid(),
            status: z.string(),
        }).parse(await request.json());

        return prisma.orders.update({
            where: { id: validData.id },
            data: {
                status: validData.status,
            }
        })
    }

    async findOrderCountAdmin(request: NextRequest, _: TContext) {
        await authApi(request, true)
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
        const endOfYear = new Date(currentYear + 1, 0, 1); // January 1st of the next year
// console.log(endOfYear,'---------')
        const status = getParamsThrow(request, "status") as STATUS

        return prisma.orders.count({
            where: {
                status,
                updated_at: {
                    ...(status !== 'Complete' && { gte: startOfYear }), // Greater than or equal to start of the year
                    ...(status !== 'Complete' && { lt: endOfYear, }), // Less than the start of the next year
                }
            },
        },)
    }

}
