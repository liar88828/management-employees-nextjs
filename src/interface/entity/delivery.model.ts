import { Deliverys } from "@prisma/client";
import { ParamsApi } from "@/interface/server/InterfaceRepository";

export type TDeliveryDB = Deliverys
export type TDeliveryCreate = Omit<Deliverys, 'id' | "created_at" | "updated_at">;
// export type TDeliveryUpdate = Omit<Deliverys, "created_at" | "updated_at">;
export type TDeliverySearch = {
	address?: string,
	type?: string,
	name?: string
};

export enum DELIVERY {
    KEY = 'delivery_query'
}

export type DeliveryParams = ParamsApi<TDeliverySearch>
