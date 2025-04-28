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
    //     data.img = imagePath ?? ;
    // }
    // if (userId) {
    //     data.userId = userId
    // }
    // data.registration = false
    // console.log(data)
    const validateData: EmployeeRegistrationUserCreateServer = {
        ...data,
        userId,
        registration: false,
        department: "",
        salary: 0,
        notes: "",
        status: STATUS_EMPLOYEE.Registration,
        hireDate: new Date(),
        // userId: userId ? userId : data.userId,
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
    //     data.img = imagePath ?? 'image/png';
    // }
    // if (userId) {
    //     data.userId = userId
    // }
    const validData: EmployeeUpdateServerUser = {
        ...data,
        userId,
        img: imagePath

    }
    // data.registration = false
    // console.log(data)
    return employeeUpdateServerUser.parse(validData)
}

// export function employeeSanitizeAction(
//     data: EmployeeRegistrationUserCreateClient,
//     imagePath: string,
//     userId: string): EmployeeCreate {
//     data.img = imagePath
//     data.userId = userId
//     return employeeRegistrationCreateServerUser.parse(data)
// }

export function employeeCreateSanitizeAdmin(
    data: Omit<EmployeeCreateClientAdmin, 'img'>,
    userId?: string,
    imagePath?: string,
): EmployeeRegistrationUserCreateServer {
    // if (imagePath) {
    //     data.img = imagePath ?? ;
    // }
    // if (userId) {
    //     data.userId = userId
    // }
    // data.registration = false
    // console.log(data)
    const validateData: EmployeeRegistrationUserCreateServer = {
        ...data,
        registration: false,
        department: "",
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
    // data.registration = false
    // console.log(data)
    return employeeUpdateServer.parse(data)
}
