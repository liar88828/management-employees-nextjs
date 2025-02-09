import { TOrderCreate } from "@/interface/entity/order.model"
import { TCustomersDB, TReceiverCreate } from "@/interface/entity/receiver.model";
import { TOrderTrolleyTransactionServer, TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { Orders, Payments, Trolleys } from "@prisma/client";

export type OrderId = TOrderTransactionDB['id'];
export type OrderMonthTotal = { count: number, totalAll: number };

export type TOrderTransactionCreate = {
    order: TOrderCreate
    orderTrolley: TOrderTrolleyTransactionServer[]
    orderReceiver: TReceiverCreate & { id?: string }
}

export type TOrderTransactionDB = Orders & {
    Customers: TCustomersDB
    Deliverys: TDeliveryDB
    Payments: Payments
    Trolleys: TTrolleyProductUser[]
}

export type TOrderTopTotal = Orders & {
    Customers: TCustomersDB
    Trolleys: Trolleys[]
}

export type TOrderTransactionUpdate = {
    order: TOrderCreate
    orderTrolley: TOrderTrolleyTransactionServer[] // Assuming full replacement of products is required
    orderReceiver: TReceiverCreate
}

export type THistoryOrder = Omit<TOrderTransactionDB,
    "Deliverys" |
    "Payments" |
    "Customers" |
    "Trolleys"> & {
    Customers: {
        name: string
    }
}

export type HistoryUser = Orders & {
    Customers: TCustomersDB,
    Trolleys: Trolleys[]
}

export type IncomingStatusResponse = Orders & {
    Customers: TCustomersDB,
    Trolleys: Trolleys[]
}

// export type TOrderProductCreate = Omit<
//     TTrolleyDB,
//     "id" | "id_order" | "id_user" | "qty"
// >
// export type TTransactionUpdate = Omit<TTrolleyDB, "created_at" | "updated_at">;
