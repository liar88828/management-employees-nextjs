import { employeeCreateServer, EmployeeCreateZodServer } from "@/validation/employee.valid";

export function employeeSanitize(
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

// export function employeeSanitizeAction(
//     data: EmployeeCreateZodClient,
//     imagePath: string,
//     userId: string): EmployeeCreate {
//     data.img = imagePath
//     data.userId = userId
//     return employeeCreateServer.parse(data)
// }