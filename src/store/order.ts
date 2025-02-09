import { create } from "zustand";
import { TDeliveryDB } from "@/interface/entity/delivery.model";
import { TPaymentDB } from "@/interface/entity/payment.model";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { TReceiverCreate } from "@/interface/entity/receiver.model";
import { OrderCreateClient } from "@/validation/order.valid";

export type OrderFormAdmin = {
    payment: TPaymentDB | Partial<TPaymentDB> | null,
    delivery: TDeliveryDB | Partial<TDeliveryDB> | null,
    product: TTrolleyProductUser[],
    order: OrderCreateClient,
    receiver: TReceiverCreate & { id: string },
};

type OrderType = {
    pricePayment: number
    priceDelivery: number
    //
    status: string,
    setStatus: (status: string) => void,
    //
    total: number;
    setTotal: (data: { totalProduct: number, pricePayment?: number, priceDelivery?: number }) => void,
    reset: () => void
    //
    // onData: TOrderTransactionCreate | null,
    // setData: (data: DataOrder) => TOrderTransactionCreate,
    //
    // onDelivery: TDeliveryDB | null,
    // onPayment: TPaymentDB | null,
    //
    // setDelivery: (data: TDeliveryDB | null) => void,
    // setPayment: (data: TPaymentDB | null) => void,
    // setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => void,
    // setProduct: (data: DataOrder['product']) => void,

}

const initialState = {
    status: '',
    total: 0,
    pricePayment: 0,
    priceDelivery: 0,
    // onData: null,
    // onDelivery: null,
    // onPayment: null,
}

export const useOrderStore = create<OrderType>((set, get) => ( {
    ...initialState,
    setStatus: (status: string) => set((state) => ( {
        status: state.status === status ? '' : status,
    } )),

    reset: () => set(initialState),
    setProduct: (data: OrderFormAdmin['product']) => {
    },
    setTotal: ({ totalProduct, pricePayment, priceDelivery }) => {
        set(() => {
            const payment = !pricePayment ? get().pricePayment : pricePayment
            const delivery = !priceDelivery ? get().priceDelivery : priceDelivery
            return {
                total: totalProduct + ( payment + delivery ),
                pricePayment: payment,
                priceDelivery: delivery,
            }
        })
    },
    // setReceiver: (data: TOrderTransactionCreate['orderReceiver'] | null) => set(() => ({ onReceiver: data })),
    // setPayment: (data: TPaymentDB | null) => set(() => ({ onPayment: data })),
    // setDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
    // getDelivery: (data: TDeliveryDB | null) => set(() => ({ onDelivery: data })),
    // setData: (data: DataOrder) => {
    // 	const newData = orderTransactionSanitize(data)
    // 	set({ onData: newData })
    // 	return newData
    // },

} ))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
