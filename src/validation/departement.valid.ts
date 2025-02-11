import { z } from "zod";

export type DepartmentFormState = {
    errors?: {
        position?: string[]
    }
    message?: string
} | undefined

export const DepartmentFormSchema = z.object({
    position: z.string()
})
