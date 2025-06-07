import { z } from "zod";
import { zodAddress, zodPhone } from "@/schema/zod.valid";
export const registrationDatabaseCreateServer = z.object({
    userName: z.string().min(2).max(100),
    userPhone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    statusEmployee: z.string(),//z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    workTime: z.string().min(2),//[ "Full-Time", "Part-Time" ]
    skills: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    educations: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    registration: z.boolean(),
    salary: z.number(),
    notes: z.string(),
    userId: z.string(),
    img: z.string().min(2),
})
export type RegistrationDatabaseCreateServer = z.infer<typeof registrationDatabaseCreateServer>;

export const registrationDatabaseUpdateServer = z.object({
    userName: z.string().min(2).max(100),
    userPhone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    workTime: z.string().min(2),//[ "Full-Time", "Part-Time" ]
    skills: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    educations: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    userId: z.string(),
    img: z.string().min(2).optional(),
})
export type RegistrationDatabaseUpdateServer = z.infer<typeof registrationDatabaseUpdateServer>;
