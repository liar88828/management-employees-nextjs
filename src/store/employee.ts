import { create } from 'zustand'
import { STATUS_EMPLOYEE } from "@/interface/Utils";

interface EmployeeStore {
	filter: {
		name: string,
        status: STATUS_EMPLOYEE | string,
	},
	setFilter: (filter: Partial<EmployeeStore['filter']>) => void,
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
	filter: {
		name: '',
		status: ''
	},
	setFilter: (filter) => {
		set((state) => ({
			filter: {
				...state.filter,
				...filter
			}
		}))
	},
}))