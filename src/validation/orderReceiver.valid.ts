import { z } from "zod"
import { Customers } from "@prisma/client";
import { zodAddress, zodPhone } from "@/validation/zod.valid";

type TCustomerCreate = Omit<Customers, "id">

export const CustomerCreate: z.ZodType<TCustomerCreate> = z.object({
    address: zodAddress,
    name: z.string(),
    phone: zodPhone,

})

export type CustomerCreateType = z.infer<typeof CustomerCreate>

// export  const TransactionUpdate: z.ZodType<TTransactionUpdate> = z.object({
// 	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
// 	id_order: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
// 	id_product: z.string({ required_error: 'ID is required', }).min(1).max(100).max(100),
//
// })
