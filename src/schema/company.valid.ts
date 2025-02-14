import { z } from "zod";
import { zodEmail } from "@/schema/zod.valid";
import { Companys } from "@prisma/client";
import { zodImage } from "@/schema/image";

export type CompanyFormState = {
    value: {
        name: any
        address: any
        phone: any
        email: any
        img: any
    } | { [p: string]: FormDataEntryValue }
    errors?: {
        name?: string[]
        address?: string[]
        phone?: string[]
        email?: string[]
        img?: string[]
    }
    message?: string
    success: boolean
} | undefined

export type CompanyDB = Omit<Companys, 'id' | 'img'>

export const CompanyFormSchema: z.ZodType<CompanyDB & { id?: string, img?: any }> = z.object({
    id: z.string().optional(),
    name: z.string().min(2),
    address: z.string().min(2),
    phone: z.string().min(2),
    email: zodEmail,
    img: zodImage(),
    visi: z.array(z.object({
        text: z.string().min(2,),
    })),
    misi: z.array(z.object({
        text: z.string().min(2,),
    })),
})

export type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>
