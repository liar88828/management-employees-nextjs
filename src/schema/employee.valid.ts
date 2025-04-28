import { z } from "zod";
import { zodImage } from "@/schema/image";
import { zodAddress } from "@/schema/zod.valid";

export const employeeCreateClientAdmin = z.object({
    userId: z.string().optional(),
    // name: z.string().min(2, "Name must be at least 2 characters"),
    // email: zodEmail,
    // phone: zodPhone,
    // gender: z.enum([ "Male", "Female" ]),
    gender: z.string().min(2),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    department: z.string().min(2),
    salary: z.number().min(0, "Salary must be a positive number"),
    // managerId: z.number().optional(),
    // status: z.enum([ "Active", "Inactive" ]),
    status: z.string().min(2, "Status must be a positive number"),
    // status: z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),

    address: zodAddress,
    city: z.string().min(2),
    postalCode: z.string().min(2),
    // employmentType: z.enum(["Full-Time", "Part-Time"]),
    employmentType: z.string().min(2),
    notes: z.string().min(2),
    img: zodImage(true),
    country: z.string().min(2),
    // education: z.string().min(2),
    skills: z.array(z.object({
        text: z.string().min(2, "Skills must be at least 2 characters"),
    })),

    languages: z.array(z.object({
        text: z.string().min(2, "Languages must be at least 2 characters"),
    })),

    educations: z.array(z.object({
        text: z.string().min(2, "Educations must be at least 2 characters"),
    })),

    // certifications: z.array(z.object({
    //     text: z.string().min(2, "Certifications must be at least 2 characters"),
    // })),
    //
    // projects: z.array(z.object({
    //     text: z.string().min(2, "Projects must be at least 2 characters"),
    // })),
});

// : z.ZodType<EmployeeCreate>
export const employeeRegistrationUserCreateClient = z.object({
    // userId: z.string(),
    gender: z.string().min(2),
    dateOfBirth: z.coerce.date(),
    // hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    // status: z.string().min(2, "Status must be a positive number"),
    address: zodAddress,
    city: z.string().min(2),
    postalCode: z.string().min(2),
    employmentType: z.string().min(2),
    img: zodImage(true),
    skills: z.array(z.object({
        text: z.string().min(2, "Skills must be at least 2 characters"),
    })),
    educations: z.array(z.object({
        text: z.string().min(2, "Educations must be at least 2 characters"),
    })),

});

// : z.ZodType<EmployeeCreate>
export const employeeRegistrationCreateServerUser = z.object({
    // name: z.string().min(2).max(100),
    // email: z.string().email("Invalid email address"),
    // phone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    status: z.string(),//z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    employmentType: z.string().min(2),//[ "Full-Time", "Part-Time" ]
    // education: z.string().min(2).max(100),
    skills: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    educations: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    registration: z.boolean(),
    department: z.string(),
    salary: z.number(),
    notes: z.string(),
    userId: z.string(),
    img: z.string().min(2),

})

export const employeeUpdateServerUser = z.object({
    // name: z.string().min(2).max(100),
    // email: z.string().email("Invalid email address"),
    // phone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    // status: z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    employmentType: z.string().min(2),//[ "Full-Time", "Part-Time" ]
    // education: z.string().min(2).max(100),
    skills: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    educations: z.array(z.object({
        text: z.string().min(2).max(100),
    })),
    userId: z.string(),
    img: z.string().min(2).optional(),
    // departments: z.string().min(2).max(100),
    // hireDate: z.coerce.date(),
    // registration: z.boolean(),
    // salary: z.number().min(0, "Salary must be a positive number"),
    // notes: z.string().min(2).max(100),

})

export const employeeUpdateServer = z.object({
    userId: z.string(),
    // name: z.string().min(2).max(100),
    // email: z.string().email("Invalid email address"),
    // phone: zodPhone,
    gender: z.string().min(2).max(100),
    dateOfBirth: z.coerce.date(),
    hireDate: z.coerce.date(),
    registration: z.boolean(),
    jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
    department: z.string().min(2).max(100),
    salary: z.number().min(0, "Salary must be a positive number"),
    // status: z.enum(['Fail', 'Complete', 'Pending', 'Active', 'Disabled']),
    address: zodAddress,
    city: z.string().min(2).max(100),
    postalCode: z.string().min(2).max(100),
    employmentType: z.string().min(2),//[ "Full-Time", "Part-Time" ]
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

export type EmployeeCreateClientAdmin = z.infer<typeof employeeCreateClientAdmin>;
export type EmployeeRegistrationUserCreateClient = z.infer<typeof employeeRegistrationUserCreateClient>;
export type EmployeeRegistrationUserCreateServer = z.infer<typeof employeeRegistrationCreateServerUser>;

export type EmployeeUpdateServerUser = z.infer<typeof employeeUpdateServerUser>;
export type EmployeeUpdateZodServer = z.infer<typeof employeeUpdateServer>;
