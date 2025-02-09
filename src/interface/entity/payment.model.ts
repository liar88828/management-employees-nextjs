import { Payments } from "@prisma/client";
import { ParamsApi } from "@/interface/server/InterfaceRepository";

export type TPaymentDB = Payments
export type TPaymentCreate = Omit<Payments, 'id' | "created_at" | 'updated_at'>;
// export type TPaymentUpdate = Omit<Payments, "created_at" | 'updated_at'>;
export type TPaymentSearch = {
	address?: string,
	type?: string,
	name?: string
};

export enum PAYMENT {
    KEY = 'payment_query',
}

export type PaymentParams = ParamsApi<TPaymentSearch>
