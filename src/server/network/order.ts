import { OrderParams, ResponseCreateOrderTransaction, ResponseMonthData } from "@/interface/entity/order.model";
import { ResponseAll } from "@/interface/server/param";
import { STATUS } from "@/app/components/toStatus";
import { TStatusOrder } from "@/interface/Utils";
import { toFetch } from "@/hook/toFetch";
import { toUrl } from "@/utils/toUrl";
import {
    HistoryUser,
    IncomingStatusResponse,
    OrderMonthTotal,
    TOrderTopTotal,
    TOrderTransactionCreate,
    TOrderTransactionDB
} from "@/interface/entity/transaction.model";

export const orderCreate = (data: TOrderTransactionCreate) => toFetch<ResponseCreateOrderTransaction>('POST', {
    url: 'order',
    data
})

export const orderUpdate = (data: TOrderTransactionCreate, id: string) => toFetch<ResponseCreateOrderTransaction>('PUT', {
    url: `order/${ id }`, data
})

export const orderAll = ({ filter, pagination }: OrderParams) => {
    const url = toUrl('order', { ...filter, ...pagination })
    // console.log('is fetch...')
    return toFetch<ResponseAll<TOrderTransactionDB>>('GET', { url })
}

export const orderId = (id: string) => toFetch<TOrderTransactionDB>('GET', {
    url: `order/${ id }`, cacheData: {
        next: {
            revalidate: 5,
            tags: [ 'incoming', id ]
        }
    }
})

export const orderDelete = (id: string) => toFetch('DELETE', {
    url: `order/${ id }`
})

export const orderMonthTotal = (status: TStatusOrder) => {
    return toFetch<OrderMonthTotal>('GET', {
        url: `order/month?status=${ status }`,
        cacheData: {
            next: {
                revalidate: 60 * 10
            }
        }
    })
}

export const findTopOrderTotal = () => {
    return toFetch<TOrderTopTotal[]>('GET', {
        url: `order/top`,
        cacheData: {
            next: {
                revalidate: 60 * 10
            }
        }
    })
}

export const getEarningOld = async (year: number) => {
    return toFetch<ResponseMonthData>('GET', {
        url: `order?year=${ year - 1 }`,
        cacheData: {
            next: {
                revalidate: 60 * 60 * 24
            }
        }
    })
}

export const getEarningNew = async (year: number) => {
    return toFetch<ResponseMonthData>('GET', {
        url: `order?year=${ year }`,
        cacheData: {
            next: {
                revalidate: 60 * 60
            }
        }
    })
}

export const findHistoryUser = async (status: string) => {
    const url = toUrl("history/user/order", { status: status, limit: 10 })
    return toFetch<HistoryUser[]>("GET", {
        url,
        cacheData: {
            next: { revalidate: 5 }
        }
    })
}

export const incomingFindNet = async (status: TStatusOrder, search: string) => {
    return toFetch<IncomingStatusResponse[]>
    ('GET', {
            url: `order/incoming?status=${ status }&search=${ search }`,
            cacheData: {
                // cache: "reload",
                next: {
                    tags: [ 'incoming', status, search ],
                    revalidate: 60 * 10,
                }
            }
        }
    )
}

export const incomingActionFetch = (data: { id: string, status: string }) => {
    return toFetch('POST', {
        url: 'order/incoming',
        data
    })
}

export const incomingFindCount = async (status: STATUS) => {
    return toFetch<number>("GET", {
        url: `order/count/admin?status=${ status }`,
        cacheData: {
            next: {
                revalidate: 60 * 10,
                tags: [ 'incoming', status ]
            }
        }
    })
}
