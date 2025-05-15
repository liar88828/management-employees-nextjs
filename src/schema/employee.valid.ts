import { z } from "zod";
import { zodImage } from "@/schema/image";
import { zodAddress, zodPhone } from "@/schema/zod.valid";
import { UserDB } from "@/interface/entity/user.model";
import { setDateForm } from "@/utils/setDateForm";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { RegistrationUserCreateClient } from "@/app/(user)/registration/registration-user-sanitizer";

export const employeeCreateClientAdmin = z.object({
    userId: z.string().optional(),
    // userName: z.string().min(2, "Name must be at least 2 characters"),
    // email: zodEmail,
    // phone: zodPhone,
    // gender: z.enum([ "Male", "Female" ]),
    gender: z.string().min(2),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    // position: z.string().min(2),
    salary: z.number().min(0, "Salary must be a positive number"),
    // managerId: z.number().optional(),
    // status: z.enum([ "Active", "Inactive" ]),
    status: z.string().min(2, "Status must be a positive number"),
    // status: z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2),
    postalCode: z.string().min(2),
    // workTime: z.enum(["Full-Time", "Part-Time"]),
    workTime: z.string().min(2),
    notes: z.string().min(2),
    img: zodImage(true),
    country: z.string().min(2),
    // education: z.string().min(2),
    skills: z.array(z.object({
        text: z.string().min(2,),
    })),
    languages: z.array(z.object({
        text: z.string().min(2,),
    })),

    educations: z.array(z.object({
        text: z.string().min(2, "Educations must be at least 2 characters"),
    })),
});

export function registrationSanitizerUser(
    employee: TEmployeeDB | null,
    user: UserDB
) {
    const defaultForm: RegistrationUserCreateClient & {
        name: string,
        phone: string,
        email: string,
    } = {
        address: employee?.address ?? '',
        city: employee?.city ?? '',
        gender: employee?.gender ?? '',
        jobTitle: employee?.jobTitle ?? '',
        postalCode: employee?.postalCode ?? '',
        workTime: employee?.workTime ?? '',
        // skills: [ { text: 'text' } ],
        // educations: [ { text: 'textss' } ],
        skills: employee?.Skills.map((item) => ( { text: item.text ?? '' } )) ?? [ { text: '' } ],
        educations: employee?.Educations.map((item) => ( { text: item.text ?? '' } )) ?? [ { text: '' } ],
        dateOfBirth: setDateForm(employee?.dateOfBirth) ?? '',
        name: user.name,
        email: user.email,
        phone: user.phone
    }
    return defaultForm;
}

export const employeeUpdateServer = z.object({
    userId: z.string(),
    // userName: z.string().min(2).max(100),
    // email: z.string().email("Invalid email address"),
    // phone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    registration: z.boolean(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    // position: z.string().min(2).max(100),
    salary: z.number().min(0, "Salary must be a positive number"),
    // status: z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    workTime: z.string().min(2),//[ "Full-Time", "Part-Time" ]
    notes: z.string().min(2).max(100),
    img: z.string().min(2).optional(),
    country: z.string().min(2).max(100),
    // education: z.string().min(2).max(100),
    skills: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    languages: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    educations: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
})

export const registrationUpdateServerAdmin = z.object({
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
export type RegistrationUpdateServerAdmin = z.infer<typeof registrationUpdateServerAdmin>;


export type EmployeeCreateClientAdmin = z.infer<typeof employeeCreateClientAdmin>;
export type EmployeeUpdateZodServer = z.infer<typeof employeeUpdateServer>;
