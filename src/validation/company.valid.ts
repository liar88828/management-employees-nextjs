import { z } from "zod";
import { zodEmail } from "@/validation/zod.valid";
import { Companys } from "@prisma/client";
import { zodImage } from "@/validation/image";

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
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: zodEmail,
    img: zodImage()
})

export type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>
