import { z } from "zod";

export const inboxSchema = z.object({
    id: z.string(),
    jobTitle: z.string().min(2).max(50),
    salary: z.string().min(1),
    status: z.string().min(2).max(50),
})
export type InboxValidateType = z.infer<typeof inboxSchema>
