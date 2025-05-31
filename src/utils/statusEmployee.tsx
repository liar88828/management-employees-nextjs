import { TEmployeeDB } from "@/interface/entity/employee.model";
export const statusEmployee = (datas: TEmployeeDB | null) => {
    if (!datas) {
        return ''
    }
    return datas.registration ? 'Wait Validation From Admin' : datas.status
}
