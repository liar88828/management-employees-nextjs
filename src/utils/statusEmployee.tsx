import { TEmployeeDB } from "@/interface/model";
export const statusEmployee = (datas: TEmployeeDB | null) => {
    if (!datas) {
        return ''
    }

    return datas.registration ? datas.statusEmployee : 'Wait Validation From Admin'
}
