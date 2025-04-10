import { employeeCreateServer, EmployeeCreateZodServer } from "@/schema/employee.valid";

export function employeeSanitizeFormData(
    formData: FormData, imagePath?: string, userId?: string): EmployeeCreateZodServer {
    const form = formData.get('data')?.toString() ?? ''
    const json = JSON.parse(form);
    if (imagePath) {
        json.img = imagePath ?? 'image/png';
    }
    if (userId) {
        json.userId = userId
    }
    return employeeCreateServer.parse(json)
}

export function employeeSanitize(
    data: any,
    imagePath?: string,
    userId?: string): EmployeeCreateZodServer {
    if (imagePath) {
        data.img = imagePath ?? 'image/png';
    }
    if (userId) {
        data.userId = userId
    }
    // console.log(data)
    return employeeCreateServer.parse(data)
}



// export function employeeSanitizeAction(
//     data: EmployeeCreateZodClient,
//     imagePath: string,
//     userId: string): EmployeeCreate {
//     data.img = imagePath
//     data.userId = userId
//     return employeeCreateServer.parse(data)
// }