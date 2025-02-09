import type { TCustomersDB, TReceiverCreate } from "@/interface/entity/receiver.model";
import { ProductParams } from "@/interface/entity/product.model";
import { ResponseAll } from "@/interface/server/param";
import { toFetch } from "@/hook/toFetch";
import { toUrl } from "@/utils/toUrl";

export const receiverAll = async ({ pagination: { limit } }: ProductParams) => {
    const url = toUrl("receiver", { limit })
    return toFetch<ResponseAll<TCustomersDB>>('GET', {
        url,
        cacheData: {
            next: {
                revalidate: 60 * 2
            }
        }
    })
};

export const receiverId = async (id: string) => {
    return toFetch<TCustomersDB>('GET', {
        url: `receiver/${ id }`
    })
};

export const receiverUser = async () => {
    return toFetch<TCustomersDB>('GET', {
        url: `receiver/user`
    })
};

export const receiverCreate = async (data: TReceiverCreate) => {
    return toFetch<TCustomersDB>('POST', { url: 'receiver', data })
};

export const receiverUpdate = async (data: TReceiverCreate, id: string) => {
    return toFetch<TCustomersDB>('POST', {
        url: `receiver/${ id }`, data
    })
};

export const receiverDelete = async (id: string) => {
    return toFetch<TCustomersDB>('DELETE', {
        url: `receiver/${ id }`
    })
};
