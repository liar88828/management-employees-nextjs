import { z } from "zod";
import { zodDate } from "@/validation/zod.valid";
import { Letters } from "@prisma/client";
import { FlagsOptionals, FlagsRequired } from "@/interface/generic";

export type LetterDB = Omit<Letters, 'id' | 'updatedAt' | 'createdAt'> & { id?: string }

export type LetterFormState = {
    value: FlagsRequired<LetterDB, any> | { [p: string]: FormDataEntryValue }
    errors?: FlagsOptionals<LetterDB & { id?: string }, string[]>
    message?: string
    success: boolean
} | undefined

export const LetterFormSchema: z.ZodType<LetterDB & { employeesId: string[] }> = z.object({
    id: z.string().optional(),
    option: z.string(),
    interviewDate: zodDate,
    interviewLocation: z.string(),
    dressCode: z.string(),
    signerName: z.string(),
    employeesId: z.array(z.string()),
})

export type LetterFormSchemaType = z.infer<typeof LetterFormSchema>
