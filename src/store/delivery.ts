import { create } from "zustand";
import { deliveryAll } from "@/server/network/delivery";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import toast from "react-hot-toast";

export interface DeliveryStore {
    isLoading: boolean;
    deliveryData: TDeliveryDB[]
    delivery: TDeliveryDB | Partial<TDeliveryDB> | null
    search: string
    setDelivery: (data: TDeliveryDB | null) => void
    setDeliveryPartial: (data: Partial<TDeliveryDB>) => void
    getDeliveryData: () => Promise<void>
    setSearch: (search: string) => void
    reset: () => void
}

const initialState = {
    deliveryData: [],
    delivery: null,
    search: '',
    isLoading: false,
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ( {
    ...initialState,
    reset: () => set(initialState),
    setDelivery: (data) => set({ delivery: data }),
    setDeliveryPartial: (data) => {
        set((state) => ( {
            delivery: { ...state.delivery, ...data }
        } ))
    },
    getDeliveryData: async () => {
        try {
            set({ isLoading: true });
            if (get().deliveryData.length === 0) {
                const { data } = await deliveryAll({ filter: {}, pagination: {} })
                if (data.data.length > 0) {
                    set({ deliveryData: data.data })
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        } finally {
            set({ isLoading: false });
        }
    },
    setSearch: (search) => set(( { search } )),
} ))
