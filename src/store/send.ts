import { create } from 'zustand'

type StoreSend = {
    name: string
    selectAll: string[]
    department: string
    complete: string
};

interface StateSend {
    store: StoreSend
    setStore: (data: Partial<StoreSend>) => void
    setSelectEmployee: (idEmployee: string) => void
    setSelectAllEmployee: (idEmployees: string[]) => void
    getEmployeeExist: (idEmployee: string) => boolean
    // removeSelectEmployee: (idEmployee: string) => void
}

export const useSendStore = create<StateSend>()(
    (set, get) => ( {
        store: {
            selectAll: [],
            name: "",
            department: "",
            complete: "",
        },
        setStore: (data) => {
            set((state) => ( {
                store: { ...state.store, ...data }
            } ))
        },
        getEmployeeExist: (idEmployee) => {
            return get().store.selectAll.includes(idEmployee);
        },

        setSelectEmployee: (idEmployee) => {
            const current = get().store.selectAll
            const exists = current.includes(idEmployee)
            set((state) => ( {
                store: {
                    ...state.store,
                    selectAll: exists
                        ? state.store.selectAll.filter(id => id !== idEmployee) // remove if exists
                        : [ ...state.store.selectAll, idEmployee ] // add if not exists
                }
            } ))
        },
        // removeSelectEmployee: (idEmployee) => {
        //     set((state) => ({
        //         store: {
        //             ...state.store,
        //             selectAll: state.store.selectAll.filter(id => id !== idEmployee)
        //         }
        //     }))
        // },
        setSelectAllEmployee: (idEmployees) => {
            set((state) => ( {
                store: {
                    ...state.store,
                    selectAll: idEmployees
                }
            } ))
        },
    } ),
)
