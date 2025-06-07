import { z } from "zod";

export const adminRegistrationSchema = z.object({
    id: z.string(),
    jobTitle: z.string().min(2).max(50),
    salary: z.number().min(1),
    status: z.string().min(2).max(50),
    notes: z.string().min(1).max(100),
    // position: z.string().min(1).max(100),

})
export type AdminRegistrationSchemaType = z.infer<typeof adminRegistrationSchema>
