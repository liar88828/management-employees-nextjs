import { create } from "zustand";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { paymentAll } from "@/server/network/payment";
import toast from "react-hot-toast";

export interface PaymentStore {
    paymentData: TPaymentDB[]
    payment: TPaymentDB | Partial<TPaymentDB> | null
    setPayment: (data: TPaymentDB | null) => void
    setPaymentPartial: (data: Partial<TPaymentDB>) => void
    getPaymentData: () => Promise<void>
    setFilter: (filter: PaymentStore['filter']) => void
    isLoading: boolean;
    reset: () => void
    filter: {
        name: string
    }
}

const initialState = {
    isLoading: false,
    paymentData: [],
    payment: null,
    filter: {
        name: ''
    }
}

export const usePaymentStore = create<PaymentStore>((set, get) => ( {
    ...initialState,
    reset: () => set(initialState),
    setPayment: (data) => set({ payment: data }),
    setPaymentPartial: (data) => {
        set((state) => ( {
            payment: { ...state.payment, ...data }
        } ))
    },
    getPaymentData: async () => {
        try {
            set({ isLoading: true });
            if (get().paymentData.length === 0) {
                const { data } = await paymentAll({
                    filter: {},
                    pagination: {}
                })
                if (data.data.length > 0) {
                    set({ paymentData: data.data })
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
    setFilter: (filter) => {
        set((state) => ( {
            filter: {
                ...state.filter,
                ...filter
            }
        } ))
    }
} ))
