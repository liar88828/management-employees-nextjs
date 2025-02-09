import { TOrderTransactionCreate } from "@/interface/entity/transaction.model";
import { TReceiverCreate } from "@/interface/entity/receiver.model";
import { create } from "zustand";
import { receiverUser } from "@/server/network/receiver";

type ReceiverStore = {
    receiver: TReceiverCreate & { id: string }
    setReceiverPartial: (data: Partial<TReceiverCreate> | null) => void
    reset: () => void,
    getAsyncReceiver: () => Promise<void>,
    setReceiver: (data: TReceiverCreate) => void,
    onReceiver: TOrderTransactionCreate['orderReceiver'] | null,
}

const initialState = {
    onReceiver: null,
    receiver: {
        address: "",
        name: "",
        phone: "",
        id: '',
    },
}
export const useReceiverStore = create<ReceiverStore>((set) => ( {
    ...initialState,
    setReceiver: (data) => {
        set({ onReceiver: data })
    },
    reset: () => set(initialState),
    getAsyncReceiver: async () => {
        const data = await receiverUser()
        set(() => ( {
            onReceiver: data.data
        } ))
    },
    setReceiverPartial: (data) =>
        set((state) => ( {
            receiver: {
                ...state.receiver, // Preserve existing data
                ...data, // Merge in new updates
            },
        } )),
} ))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
