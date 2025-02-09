import { z } from "zod"
import { TPaymentCreate } from "@/interface/entity/payment.model"

import { zodAddress, zodDesc, zodPhone } from "@/validation/zod.valid";

export const PaymentCreate: z.ZodType<TPaymentCreate> = z.object({
    // id: z.string().uuid().optional(),
    accounting: z.string().min(2).max(30),
    address: zodAddress,
    desc: zodDesc,
    img: z.string().min(2).max(200),
    name: z.string().min(2).max(30),
    phone: zodPhone,
    type: z.string().min(2).max(30),
})

// export const BankUpdate: z.ZodType<TPaymentUpdate> = z.object({
// 	id: z.string({ required_error: 'ID is required', }).min(1).max(100),
// 	hp: z.string({ required_error: 'Hp is required', }).min(2).max(30),
// 	img: z.string({ required_error: 'Hp is required', }).min(2).max(200),
// 	no: z.string({ required_error: 'No is required', }).min(2).max(30),
// 	nama: z.string({ required_error: 'nama is required', }).min(2).max(30),
// 	lokasi: z.string({ required_error: 'Lokasi is required', }).min(2).max(30),
// 	jenis: z.string({ required_error: 'Jenis is required', }).min(2).max(30),
// 	keterangan: z.string({ required_error: 'Keterangan is required', }).min(2).max(300),
// })
