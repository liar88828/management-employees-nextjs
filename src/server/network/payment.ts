/* eslint-disable react-hooks/rules-of-hooks */

import { toFetch } from "@/hook/toFetch";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { PaymentParams, TPaymentCreate, TPaymentDB } from "@/interface/entity/payment.model";
import { ResponseAll } from "@/interface/server/param";
import { toUrl } from "@/utils/toUrl";
import { prisma } from "@/config/prisma";
import { THistoryOrder } from "@/interface/entity/transaction.model";

export const paymentAll = async ({ pagination, filter }: PaymentParams) => {
    const url = toUrl('payment', { ...pagination, ...filter })
    const response = await toFetch<ResponseAll<TPaymentDB>>('GET', { url })
    // console.log(response)
    return response
};

export const paymentId = async (id: string) => {
    return toFetch<TPaymentDB>('GET', {
        url: `payment/${ id }`
    })
};

export const paymentHistory = async (id: string) => {
    const data: THistoryOrder[] = await prisma.orders.findMany({
        include: {
            Customers: {
                select: {
                    name: true
                }
            }
        },
        take: 10,
        where: {
            id_payment: id
        }
    })

    return {
        data
    }
}

export const paymentCreate = async (data: TPaymentCreate) => {
    return toFetch<TDeliveryDB>('POST', { url: 'payment', data })
};

export const paymentUpdate = async (data: TPaymentCreate, id: string) => {
    return toFetch<TDeliveryDB>('POST', { url: `payment/${ id }`, data })
};

export const paymentDelete = async (id: string) => {
    return toFetch<TDeliveryDB>('DELETE', { url: `payment/${ id }` })
};
