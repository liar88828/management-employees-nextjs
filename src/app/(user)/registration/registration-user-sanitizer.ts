import { z } from "zod";
import { zodAddress, zodPhone } from "@/schema/zod.valid";
import { zodImage } from "@/schema/image";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { UserDB } from "@/interface/entity/user.model";
import { setDateForm } from "@/utils/setDateForm";
import {
    registrationDatabaseCreateServer,
    RegistrationDatabaseCreateServer,
    registrationDatabaseUpdateServer,
    RegistrationDatabaseUpdateServer
} from "@/schema/registration-database-server";
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
        text: z.string().min(2, "Skills must be at least 2 characters"),
    })).min(2),
    educations: z.array(z.object({
        text: z.string().min(2, "Educations must be at least 2 characters"),
    })).min(3),
});
export type RegistrationUserCreateClient = z.infer<typeof registrationCreateClientUser>;
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

export function employeeCreateSanitizeUser(
    data: Omit<RegistrationUserCreateClient, 'img'>,
    userId: string,
    imagePath?: string,
): RegistrationDatabaseCreateServer {
    const dataRaw: RegistrationDatabaseCreateServer = {
        name: data.name,
        phone: data.phone,
        userId,
        registration: false,
        salary: 0,
        notes: "",
        status: STATUS_EMPLOYEE.Registration,
        hireDate: new Date(),
        img: imagePath ?? '/uploads/person_default.webp',
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
    return registrationDatabaseCreateServer.parse(dataRaw)
}

export function employeeSanitizeUpdateUser(
    data: RegistrationUserCreateClient,
    userId: string,
    imagePath?: string,
): RegistrationDatabaseUpdateServer {
    const dataRaw: RegistrationDatabaseUpdateServer = {
        name: data.name,
        phone: data.phone,
        userId,
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
    return registrationDatabaseUpdateServer.parse(dataRaw)
}
