import {EmployeeCreate} from "@/interface/entity/employee.model";
import {employeeCreateServer, EmployeeCreateZodClient} from "@/validation/employee.valid";

export function employeeSanitize(
    formData: FormData,
    imagePath: string,
    userId: string): EmployeeCreate {
    const form = formData.get('data')?.toString() ?? ''
    const json = JSON.parse(form);
    json.img = imagePath
    json.userId = userId
    return employeeCreateServer.parse(json)
}


export function employeeSanitizeAction(
    data: EmployeeCreateZodClient,
    imagePath: string,
    userId: string): EmployeeCreate {
    data.img = imagePath
    data.userId = userId
    return employeeCreateServer.parse(data)
}