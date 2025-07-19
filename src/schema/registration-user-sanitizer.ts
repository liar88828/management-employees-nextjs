import { z } from "zod";
import { zodAddress, zodPhone } from "@/schema/zod.valid";


export const registrationCreateClientUser = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2).max(100),
    phone: zodPhone,
    gender: z.string().min(4),
    dateOfBirth: z.string().date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    address: zodAddress,
    city: z.string().min(5),
    postalCode: z.string().min(5),
    workTime: z.string().min(5),
	// imageData: zodImage(true),
    skills: z.array(z.object({
        text: z.string().min(1, "Skills must be at least 2 characters"),
    })).min(2),
    educations: z.array(z.object({
        text: z.string().min(1, "Educations must be at least 2 characters"),
    })).min(3),
	experiences: z.array(z.object({
		text: z.string().min(1, "Educations must be at least 2 characters"),
	})),
});
export type RegistrationUserCreateClient = z.infer<typeof registrationCreateClientUser>;
