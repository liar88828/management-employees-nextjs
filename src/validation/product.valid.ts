import { z } from "zod";
import { TProductCreate, UpdateStock } from "@/interface/entity/product.model";
import { zodDesc, zodInt } from "./zod.valid";

export const ProductCreate: z.ZodType<TProductCreate> = z.object({
    desc: zodDesc,
    img: z.string().min(1).max(100),
    location: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    price: zodInt,
    qty: zodInt,
    type: z.string().min(1).max(100),
})

export const ProductUpdateStock: z.ZodType<UpdateStock> = z.object({
    id: z.string(),
    qty: zodInt
})


// export const ProductUpdate: z.ZodType<TProductUpdate> = z.object({
// 	id: z.string({ required_error: 'ID is required', }).min(1).max(100),
// 	lokasi: z.string({ required_error: 'Lokasi is required', }).min(1).max(100),
// 	nama: z.string({ required_error: 'Nama is required', }).min(1).max(100),
// 	harga: z.number({ required_error: 'Harga is required', }).int().nonnegative(),
// 	img: z.string({ required_error: 'Img is required', }).min(1).max(100),
// 	jenis: z.string({ required_error: 'Jenis is required', }).min(1).max(100),
// 	jumlah: z.number({ required_error: 'Jumlah is required', }).int().nonnegative(),
// 	keterangan: z.string({ required_error: 'Keterangan is required', }).min(1).max(200),
// })
