import { TProductDB } from "@/interface/entity/product.model";
import { Trolleys, Users } from "@prisma/client";

export type TTrolleyDB = Trolleys
export type TOrderTrolleyTransaction = Omit<TTrolleyDB, "id_order">
export type TOrderTrolleyTransactionServer = Omit<TTrolleyDB, "id_order" | 'price_at_buy'>
export type TTrolleyCreate = Omit<TTrolleyDB, "id" | "id_order">
export type TTrolleyUpdate = Omit<TTrolleyDB, "id" | "id_order" | "id_user">
export type TTrolleyCount = Omit<TTrolleyDB, "id" | "id_order" | "id_user" | 'qty_at_buy' | 'price_at_buy'>

export type TrolleyId = Pick<TTrolleyDB, "id">
export type TTrolleyProductUser = TOrderTrolleyTransaction & { Product: TProductDB }

export type TrolleyParams = { idUser: Users['id'] };
export type IdTrolley = { idTrolley: TTrolleyDB['id'] };
export type Counter = {
    idTrolley: TTrolleyDB['id'],
};

export enum TROLLEY {
    KEY = "trolley_query",
    COUNT = "count",
    selected = "selected",
    counter = "counter",
    order = 'order'
}