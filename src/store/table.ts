import { OrderId, TOrderTransactionDB } from "@/interface/entity/transaction.model";
import { create } from "zustand/index";

type TableStore = {
	search: string
	status: string
	data: TOrderTransactionDB[];
	tableDetail: {
		receiver: boolean,
		deliver: boolean,
		payment: boolean,
		description: boolean,
	},
	setTableDetail: (data: Partial<TableStore['tableDetail']>) => void;
	setData(data: TOrderTransactionDB[]): void;
	setTable(table: TOrderTransactionDB): void;
	existTable(id: OrderId): boolean;
	setSearch(text: string): void;
	setStatus(text: string): void;
}

export const useTableStore = create<TableStore>((set, get) => ({
	data: [],
	search: '',
	status: "",
	tableDetail: {
		receiver: false,
		deliver: false,
		payment: false,
		description: false,
	},
	setTableDetail: (data) => {
		set((state) => {
			return { tableDetail: { ...state.tableDetail, ...data } };
		});
	},
	setStatus: (text) => set({ status: text }),
	setSearch: (text) => set({ search: text }),
	setData: (data: TOrderTransactionDB[]) => {
		set({ data });
	},
	existTable: (id: OrderId) => {
		return get().data.some((trolley) => trolley.id === id);
	},
	setTable: (table: TOrderTransactionDB) => {
		set((state) => {
			const isIncluded = state.data.some((trolley) => trolley.id === table.id);
			const datas = isIncluded
				? state.data.filter((trolley) => trolley.id !== table.id)
				: [ ...state.data, table ]
			return {
				data: datas
			}
		});
	}
}))