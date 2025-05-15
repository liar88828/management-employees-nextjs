import { z } from "zod";
import { zodDate } from "@/schema/zod.valid";
// import { Letters } from "@prisma/client";

// export type LetterDB = Omit<Letters, 'id' | 'updatedAt' | 'createdAt'> & { id?: string }

export type LetterFormState = {
    // value: FlagsRequired<LetterDB, any> | { [p: string]: FormDataEntryValue }
    // errors?: FlagsOptionals<LetterDB & { id?: string }, string[]>
    message?: string
    success: boolean
} | undefined

// : z.ZodType<Omit<LetterDB, 'id'>>
export const LetterFormSchema = z.object({
    id: z.string().optional(),
    // option: z.string().min(2),
    // employeesId: z.array(z.string()),
    interviewDate: zodDate,
    interviewLocation: z.string().min(2),
    dressCode: z.string().min(2),
    signerName: z.string().min(2),
})

export type LetterFormSchemaType = z.infer<typeof LetterFormSchema>
