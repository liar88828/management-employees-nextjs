import {
    EmployeeCreateClientAdmin,
    employeeRegistrationCreateServerUser,
    EmployeeRegistrationUserCreateClient,
    EmployeeRegistrationUserCreateServer,
    employeeUpdateServer,
    employeeUpdateServerUser,
    EmployeeUpdateServerUser,
    EmployeeUpdateZodServer
} from "@/schema/employee.valid";
import { STATUS_EMPLOYEE } from "@/interface/enum";

export function employeeSanitizeFormData(
    formData: FormData, imagePath?: string, userId?: string): EmployeeRegistrationUserCreateServer {
    const form = formData.get('data')?.toString() ?? ''
    const json = JSON.parse(form);
    if (imagePath) {
        json.img = imagePath ?? 'image/png';
    }
    if (userId) {
        json.userId = userId
    }
    return employeeRegistrationCreateServerUser.parse(json)
}

export function employeeCreateSanitizeUser(
    data: Omit<EmployeeRegistrationUserCreateClient, 'img'>,
    userId: string,
    imagePath?: string,
): EmployeeRegistrationUserCreateServer {
    // if (imagePath) {
    //     prevData.img = imagePath ?? ;
    // }
    // if (userId) {
    //     prevData.userId = userId
    // }
    // prevData.registration = false
    // console.log(prevData)
    const validateData: EmployeeRegistrationUserCreateServer = {
        ...data,
        userId,
        registration: false,
        position: "",
        salary: 0,
        notes: "",
        status: STATUS_EMPLOYEE.Registration,
        hireDate: new Date(),
        // userId: userId ? userId : prevData.userId,
        img: imagePath ? imagePath : '/image/png'
    }
    return employeeRegistrationCreateServerUser.parse(validateData)
}

export function employeeSanitizeUpdateUser(
    data: EmployeeRegistrationUserCreateClient,
    userId: string,
    imagePath?: string,
): EmployeeUpdateServerUser {
    // if (imagePath) {
    //     prevData.img = imagePath ?? 'image/png';
    // }
    // if (userId) {
    //     prevData.userId = userId
    // }
    const validData: EmployeeUpdateServerUser = {
        ...data,
        userId,
        img: imagePath

    }
    // prevData.registration = false
    // console.log(prevData)
    return employeeUpdateServerUser.parse(validData)
}

// export function employeeSanitizeAction(
//     prevData: EmployeeRegistrationUserCreateClient,
//     imagePath: string,
//     userId: string): EmployeeCreate {
//     prevData.img = imagePath
//     prevData.userId = userId
//     return employeeRegistrationCreateServerUser.parse(prevData)
// }

export function employeeCreateSanitizeAdmin(
    data: Omit<EmployeeCreateClientAdmin, 'img'>,
    userId?: string,
    imagePath?: string,
): EmployeeRegistrationUserCreateServer {
    // if (imagePath) {
    //     prevData.img = imagePath ?? ;
    // }
    // if (userId) {
    //     prevData.userId = userId
    // }
    // prevData.registration = false
    // console.log(prevData)
    const validateData: EmployeeRegistrationUserCreateServer = {
        ...data,
        registration: false,
        position: "",
        salary: 0,
        notes: "",
        userId: userId ?? '',
        img: imagePath ? imagePath : 'image/png'
    }
    return employeeRegistrationCreateServerUser.parse(validateData)
}

export function employeeSanitizeUpdateAdmin(
    data: any,
    imagePath?: string,
    userId?: string): EmployeeUpdateZodServer {
    if (imagePath) {
        data.img = imagePath ?? 'image/png';
    }
    if (userId) {
        data.userId = userId
    }
    // prevData.registration = false
    // console.log(prevData)
    return employeeUpdateServer.parse(data)
}
