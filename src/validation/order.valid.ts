import { z } from "zod";
import { TOrderCreate } from "@/interface/entity/order.model";
import { zodAddress, zodDesc, zodInt, zodPhone } from "@/validation/zod.valid";

export const orderCreateServer: z.ZodType<TOrderCreate> = z.object({
    // nameCs: z.string().min(1).max(100),
    sendTime: z.coerce.date(),
    orderTime: z.coerce.date(),
    desc: zodDesc,
    address: zodAddress,
    // travel
    id_delivery: z.string().uuid(),
    id_customer: z.string().uuid(),
    nameDelivery: z.string().min(1).max(100),
    phoneDelivery: zodPhone,
    priceDelivery: zodInt,
    // payment
    id_payment: z.string().uuid(),
    totalPayment: zodInt,
    totalAll: zodInt,
    //
    status: z.string().min(1).max(100),
    // id_receiver: z.string().uuid(),
})

// export const OrderUpdate: z.ZodType<TOrderUpdate> = z.object({
// 	id: z.string({ required_error: 'Id is required', }).min(1).max(100),
// 	pesan: z.coerce.date({ required_error: 'Pesan is required', }),
// 	kirim: z.coerce.date({ required_error: 'kirim is required', }),
// 	pengirim: z.string({ required_error: 'pengirim is required', }).min(1).max(100),
// 	hpPengirim: z.string({ required_error: 'hpPengirim is required', }).min(1).max(100),
// 	penerima: z.string({ required_error: 'penerima is required', }).min(1).max(100),
// 	alamatPenerima: z.string({ required_error: 'alamatPenerima is required', }).min(1).max(100),
// 	hpPenerima: z.string({ required_error: 'hpPenerima is required', }).min(1).max(100),
// 	guna: z.string({ required_error: 'guna is required', }).min(1).max(300),
// 	lokasi: z.string({ required_error: 'lokasi is required', }).min(1).max(100),
// 	namaPengiriman: z.string({ required_error: 'namaPengiriman is required', }).min(1).max(100),
// 	typePembayaran: z.string({ required_error: 'typePembayaran is required', }).min(1).max(100),
// 	status: z.string({ required_error: 'status is required', }).min(1).max(100),
// 	ongkir: z.number({ required_error: ' ongkir is required', }).int().nonnegative(),
// 	totalBayar: z.number({ required_error: ' totalBayar is required', }).int().nonnegative(),
// 	totalPenjualan: z.number({ required_error: ' totalPenjualan is required', }).int().nonnegative(),
// 	id_transaction: z.string().uuid(),
// 	id_payment: z.string().uuid(),
// 	id_delivery: z.string().uuid(),
// })

export type OrderCreateClient = {
    id?: string;
    id_customer: string;
    addressCs: string;
    desc: string;
    // nameCs: string;
    //
    nameDelivery: string;
    phoneDelivery: string;
    priceDelivery: number; // Assuming price is string based on example
    //
    namePayment: string;
    //
    orderTime: Date; // ISO date string
    sendTime: Date; // ISO date string
    status: string;
    totalProduct: number;
    totalPayment: number; // Assuming payment is string based on example
    totalAll: number; // Assuming total is string based on example
};

export const orderCreateAdmin: z.ZodType<( Omit<OrderCreateClient, 'id'> ) & {
    nameCs: string
    phoneCs: string
    addressCs: string
}> = z.object({
    id_customer: z.string(),
    nameCs: z.string(),
    phoneCs: zodPhone,
    addressCs: zodAddress,
    desc: zodDesc,
    //
    nameDelivery: z.string(),
    phoneDelivery: zodPhone,
    priceDelivery: zodInt,
    //
    orderTime: z.coerce.date(),
    sendTime: z.coerce.date(),
    status: z.string(),
    //
    namePayment: z.string(),
    totalPayment: zodInt,
    //
    totalProduct: zodInt,
    totalAll: zodInt,
}).refine((data) => data.orderTime <= data.sendTime, {
    message: "Order Time cannot be later than Send Time",
    path: [ "orderTime" ], // Show error message under orderTime
});

export type OrderCreateAdmin = ( z.infer<typeof orderCreateAdmin> ) & { id?: string; };

export const orderCreateClient: z.ZodType<Omit<OrderCreateClient, 'id'>> = z.object({
    // nameCs: z.string(),
    id_customer: z.string(),
    addressCs: zodAddress,
    desc: zodDesc,
    nameDelivery: z.string(),
    phoneDelivery: zodPhone,
    priceDelivery: zodInt,
    orderTime: z.coerce.date(),
    sendTime: z.coerce.date(),
    status: z.string(),
    namePayment: z.string(),
    totalPayment: zodInt,
    totalProduct: zodInt,
    totalAll: zodInt,
}).refine((data) => data.orderTime <= data.sendTime, {
    message: "Order Time cannot be later than Send Time",
    path: [ "orderTime" ], // Show error message under orderTime
});

export type FormOrderProps = {
    defaultValue?: OrderCreateAdmin,
    idCustomer: string
    method: 'POST' | "PUT"
};
