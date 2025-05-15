import {
    EmployeeCreateClientAdmin,
    RegistrationUpdateServerAdmin,
    registrationUpdateServerAdmin
} from "@/schema/employee.valid";
import { STATUS_EMPLOYEE } from "@/interface/enum";
import {
    registrationCreateServerUser,
    registrationUpdateServerUser,
    RegistrationUpdateServerUser,
    RegistrationUserCreateClient,
    RegistrationUserCreateServer
} from "@/app/(user)/registration/registration-user-sanitizer";

export function employeeSanitizeFormData(
    formData: FormData, imagePath?: string, userId?: string): RegistrationUserCreateServer {
    const form = formData.get('data')?.toString() ?? ''
    const json = JSON.parse(form);
    if (imagePath) {
        json.img = imagePath ?? 'image/png';
    }
    if (userId) {
        json.userId = userId
    }
    return registrationCreateServerUser.parse(json)
}

export function employeeCreateSanitizeUser(
    data: Omit<RegistrationUserCreateClient, 'img'>,
    userId: string,
    imagePath?: string,
): RegistrationUserCreateServer {
    const dataRaw: RegistrationUserCreateServer = {
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
    return registrationCreateServerUser.parse(dataRaw)
}

export function employeeSanitizeUpdateUser(
    data: RegistrationUserCreateClient,
    userId: string,
    imagePath?: string,
): RegistrationUpdateServerUser {
    const dataRaw: RegistrationUpdateServerUser = {
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
    return registrationUpdateServerUser.parse(dataRaw)
}

// export function employeeSanitizeAction(
//     prevData: RegistrationUserCreateClient,
//     imagePath: string,
//     userId: string): EmployeeCreate {
//     prevData.img = imagePath
//     prevData.userId = userId
//     return registrationCreateServerUser.parse(prevData)
// }

export function employeeCreateSanitizeAdmin(
    data: Omit<EmployeeCreateClientAdmin, 'img'>,
    userId?: string,
    imagePath?: string,
): RegistrationUserCreateServer {
    // if (imagePath) {
    //     prevData.img = imagePath ?? ;
    // }
    // if (userId) {
    //     prevData.userId = userId
    // }
    // prevData.registration = false
    // console.log(prevData)
    const validateData: RegistrationUserCreateServer = {
        ...data,
        registration: false,
        // position: "",
        salary: 0,
        notes: "",
        userId: userId ?? '',
        img: imagePath ? imagePath : 'image/png'
    }
    return registrationCreateServerUser.parse(validateData)
}

export function employeeSanitizeUpdateAdmin(
    data: EmployeeCreateClientAdmin,
    imagePath?: string,
): RegistrationUpdateServerAdmin {
    const validateData: RegistrationUpdateServerAdmin = {
        name: data.name,
        phone: data.phone,
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

    return registrationUpdateServerAdmin.parse(validateData)
}
