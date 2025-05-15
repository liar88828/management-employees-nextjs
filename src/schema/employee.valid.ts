import { z } from "zod";
import { zodImage } from "@/schema/image";
import { zodAddress, zodPhone } from "@/schema/zod.valid";

import {
    registrationDatabaseCreateServer,
    RegistrationDatabaseCreateServer,
    RegistrationDatabaseUpdateServer,
    registrationDatabaseUpdateServer
} from "@/schema/registration-database-server";

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

// export const registrationCreateServerAdmin = z.object({
//     name: z.string().min(2).max(100),
//     phone: zodPhone,
//     gender: z.string().min(2).max(100),
//     dateOfBirth: z.coerce.date(),
//     jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
//     address: zodAddress,
//     city: z.string().min(2).max(100),
//     postalCode: z.string().min(2).max(100),
//     workTime: z.string().min(2),//[ "Full-Time", "Part-Time" ]
//     skills: z.array(z.object({
//         text: z.string().min(2).max(100),
//     })),
//     educations: z.array(z.object({
//         text: z.string().min(2).max(100),
//     })),
//     userId: z.string(),
//     img: z.string().min(2).optional(),
// })
// export type RegistrationCreateServerAdmin = z.infer<typeof registrationCreateServerAdmin>;
export function employeeCreateSanitizeAdmin(
    data: Omit<EmployeeCreateClientAdmin, 'img'>,
    userId?: string,
    imagePath?: string,
): RegistrationDatabaseCreateServer {

    const validateData: RegistrationDatabaseCreateServer = {
        userId: userId ?? '',
        img: imagePath ? imagePath : 'image/png',
        name: 'data.name',
        phone: 'data.phone',
        skills: data.skills,
        educations: data.educations,
        dateOfBirth: new Date(data.dateOfBirth),
        workTime: data.workTime,
        city: data.city,
        address: data.address,
        gender: data.gender,
        jobTitle: data.jobTitle,
        postalCode: data.postalCode,
        hireDate: new Date(),
        salary: 0,
        status: "",
        notes: "",
        registration: false
    }
    return registrationDatabaseCreateServer.parse(validateData)
}

// export const registrationUpdateServerAdmin = z.object({
//     name: z.string().min(2).max(100),
//     phone: zodPhone,
//     gender: z.string().min(2).max(100),
//     dateOfBirth: z.coerce.date(),
//     jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
//     address: zodAddress,
//     city: z.string().min(2).max(100),
//     postalCode: z.string().min(2).max(100),
//     workTime: z.string().min(2),//[ "Full-Time", "Part-Time" ]
//     skills: z.array(z.object({
//         text: z.string().min(2).max(100),
//     })),
//     educations: z.array(z.object({
//         text: z.string().min(2).max(100),
//     })),
//     userId: z.string(),
//     img: z.string().min(2).optional(),
// })
// export type RegistrationUpdateServerAdmin = z.infer<typeof registrationUpdateServerAdmin>;

export function employeeSanitizeUpdateAdmin(
    data: EmployeeCreateClientAdmin,
    imagePath?: string,
): RegistrationDatabaseUpdateServer {
    const validateData: RegistrationDatabaseUpdateServer = {
        name: 'data.name',
        phone: 'data.phone',
        userId: data.img,
        img: imagePath ? imagePath : undefined,
        skills: data.skills,
        educations: data.educations,
        dateOfBirth: new Date(data.dateOfBirth),
        workTime: data.workTime,
        city: data.city,
        address: data.address,
        gender: data.gender,
        jobTitle: data.jobTitle,
        postalCode: data.postalCode,
    }
    return registrationDatabaseUpdateServer.parse(validateData)
}
export type EmployeeCreateClientAdmin = z.infer<typeof employeeCreateClientAdmin>;

export const registrationCreateServeAdmin = z.object({
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
export type RegistrationCreateServeAdmin = z.infer<typeof registrationCreateServeAdmin>;

export function employeeSanitizeFormData(
    formData: FormData, imagePath?: string, userId?: string): RegistrationCreateServeAdmin {
    const form = formData.get('data')?.toString() ?? ''
    const json = JSON.parse(form);
    if (imagePath) {
        json.img = imagePath ?? 'image/png';
    }
    if (userId) {
        json.userId = userId
    }
    return registrationCreateServeAdmin.parse(json)
}
