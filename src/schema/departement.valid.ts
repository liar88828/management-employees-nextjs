import { z } from "zod";
import { FlagsOptionals, FlagsRequired } from "@/interface/generic";

export type DepartmentFormState = {
    errors?: { position?: string[] }
    form?: string;
    success: boolean;
    message: string
} | undefined

export const DepartmentFormSchema = z.object({
    position: z.string().min(5)
})

export type FormStateReturn<T> = {
    value: FlagsRequired<T, any> | { [p: string]: FormDataEntryValue }
    errors?: FlagsOptionals<T & { id?: string }, string[]>
    message: string
    success: boolean
} | undefined
