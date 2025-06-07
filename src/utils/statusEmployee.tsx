import { TEmployeeDB } from "@/interface/entity/employee.model";
export const statusEmployee = (datas: TEmployeeDB | null) => {
    if (!datas) {
        return ''
    }

    return datas.registration ? datas.status : 'Wait Validation From Admin'
}
