import { z } from "zod";
import { zodDate } from "@/validation/zod.valid";
import { Latters } from "@prisma/client";
import { FlagsOptionals, FlagsRequired } from "@/hook/generic";

export type LatterDB = Omit<Latters, 'id' | 'updatedAt' | 'createdAt'> & { id?: string }

export type LatterFormState = {
    value: FlagsRequired<LatterDB, any> | { [p: string]: FormDataEntryValue }
    errors?: FlagsOptionals<LatterDB & { id?: string }, string[]>
    message?: string
    success: boolean
} | undefined

export const LatterFormSchema: z.ZodType<LatterDB & { employeesId: string[] }> = z.object({
    id: z.string().optional(),
    interviewDate: zodDate,
    interviewLocation: z.string(),
    dressCode: z.string(),
    signerName: z.string(),
    employeesId: z.array(z.string()),
})

export type LatterFormSchemaType = z.infer<typeof LatterFormSchema>
