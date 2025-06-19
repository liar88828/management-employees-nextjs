import { TEmployeeDB } from "@/interface/model";

export const statusEmployee = (datas: TEmployeeDB | null) => {
	if (!datas) {
		return 'Please Complete Register will Show'
	}
	return datas.registration ? datas.statusEmployee : 'Wait Validation From Admin'
}
export const statusEmployeeIndo = (datas: TEmployeeDB | null) => {
	if (!datas) {
		return 'Silakan lengkapi pendaftaran untuk ditampilkan'
	}
	return datas.registration ? datas.statusEmployee : 'Menunggu validasi dari admin'
}
