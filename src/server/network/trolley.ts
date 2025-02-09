import { toFetch } from "@/hook/toFetch"
import { ResponseAll } from "@/interface/server/param";
import { Counter, IdTrolley, TTrolleyCreate, TTrolleyDB, TTrolleyProductUser } from "@/interface/entity/trolley.model";

export const trolleyAll = () => {
    return toFetch<ResponseAll<TTrolleyProductUser>>('GET', { url: 'trolley' })
}

export const trolleyId = (id: TTrolleyDB['id']) => {
    return toFetch('GET', { url: `trolley/${ id }` })
}

export const pushTrolley = ({ id, qty = 1, price }: { id: TTrolleyDB['id'], qty: number, price: number }) => {
    const data: Omit<TTrolleyCreate, 'id_user'> = {
        id_product: id,
        qty_at_buy: qty,
        price_at_buy: price,
    }
    return toFetch('POST', { url: `trolley`, data })
}

export const removeTrolley = ({ idTrolley }: IdTrolley) => {
    return toFetch('DELETE', { url: `trolley/${ idTrolley }` })
}

export const trolleyIncrement = (data: Counter) => {
    return toFetch('POST', { url: `trolley/counter/${ data.idTrolley }` })
}

export const trolleyDecrement = (data: Counter) => {
    return toFetch('DELETE', { url: `trolley/counter/${ data.idTrolley }` })
}

export const trolleyCount = () => {
    return toFetch<number>('GET', { url: `trolley/counter` })
}
