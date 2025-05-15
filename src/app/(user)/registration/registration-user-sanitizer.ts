import { z } from "zod";
import { zodAddress, zodPhone } from "@/schema/zod.valid";
import { zodImage } from "@/schema/image";
export const registrationCreateClientUser = z.object({
    // email: z.string().email("Invalid email address"),
    name: z.string().min(2).max(100),
    phone: zodPhone,
    gender: z.string().min(4),
    dateOfBirth: z.string().date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    address: zodAddress,
    city: z.string().min(5),
    postalCode: z.string().min(5),
    workTime: z.string().min(5),
    img: zodImage(true),
    skills: z.array(z.object({
        text: z.string().min(5, "Skills must be at least 2 characters"),
    })).min(2),
    educations: z.array(z.object({
        text: z.string().min(5, "Educations must be at least 2 characters"),
    })).min(3),
});
export type RegistrationUserCreateClient = z.infer<typeof registrationCreateClientUser>;
export const registrationCreateServerUser = z.object({
    name: z.string().min(2).max(100),
    phone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    status: z.string(),//z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
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
export type RegistrationUserCreateServer = z.infer<typeof registrationCreateServerUser>;
export const registrationUpdateServerUser = z.object({
    name: z.string().min(2).max(100),
    phone: zodPhone,
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
export type RegistrationUpdateServerUser = z.infer<typeof registrationUpdateServerUser>;
