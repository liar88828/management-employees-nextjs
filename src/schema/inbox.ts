import { z } from "zod";

export const interviewSchema = z.object({
    id: z.string(),
    jobTitle: z.string().min(2).max(50),
    salary: z.string().min(1),
    status: z.string().min(2).max(50),
    notes: z.string().min(1).max(100),
    department: z.string().min(1).max(100),

})
export type InterviewSchemaType = z.infer<typeof interviewSchema>

export const registrationSchema = z.object({
    id: z.string(),
    jobTitle: z.string().min(2).max(50),
    salary: z.string().min(1),
    status: z.string().min(2).max(50),
    notes: z.string().min(1).max(100),
    department: z.string().min(1).max(100),

})
export type RegistrationSchemaType = z.infer<typeof registrationSchema>
