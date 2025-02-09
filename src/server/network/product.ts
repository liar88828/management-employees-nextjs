import { ProductParams, TProductCreate, TProductDB, UpdateStock } from "@/interface/entity/product.model"
import { ResponseAll } from "@/interface/server/param";
import { toFetch } from "@/hook/toFetch"
import { toUrl } from "@/utils/toUrl";
import { THistoryOrder } from "@/interface/entity/transaction.model";

export const productAll = async ({ pagination, filter }: ProductParams) => {
    const url = toUrl('product', { ...pagination, ...filter })
    // console.log('is fetch')
    return await toFetch<ResponseAll<TProductDB>>('GET', {
        url,
        cacheData: { next: { revalidate: 60 * 2 } }
    })
}

export const productRecent = async () => {
    return toFetch<TProductDB[]>('GET', {
        url: "product/recent",
        cacheData: {
            next: {
                revalidate: 60 * 5
            }
        }
    })
}

export const productId = async (id: string) => {
    return toFetch<TProductDB>('GET', {
        url: `product/${ id }`,
    })
}

export const productHistory = async (id: string) => {
    return toFetch<THistoryOrder[]>('GET', {
        url: `product/history/${ id }`
    })
}

export const productNew = async ({ filter, pagination }: ProductParams) => {
    const newUrl = toUrl('product', { ...filter, ...pagination })
    return toFetch<ResponseAll<TProductDB>>('GET', {
        url: newUrl,
        cacheData: { next: { revalidate: 60 * 2 } }
    })
}

export const productCreate = async (data: TProductCreate) => {
    return toFetch('POST', { url: `product`, data })
}

export const productUpdate = async (data: TProductCreate, id: string) => {
    return toFetch('PUT', { url: `product/${ id }`, data })
}

export const productDelete = async (id: string) => {
    return toFetch('DELETE', { url: `product/${ id }` })
}

export const productUpdateStock = async (data: Omit<UpdateStock, 'id'>, id: string) => {
    return toFetch('PATCH', {
        url: `product/${ id }`, data
    })
}
