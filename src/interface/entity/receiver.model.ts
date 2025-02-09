import { Customers } from "@prisma/client";

export type TCustomersDB = Customers
export type TReceiverCreate = Omit<TCustomersDB, 'id' | "created_at" | "updated_at">;
export type CustomerSearch = { name?: string, phone?: string, address?: string, };

// export type TProductUpdate = Omit<Products, "created_at" | "updated_at">;
