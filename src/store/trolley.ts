import { create } from 'zustand'
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";
import { toTotal } from "@/utils/toCalculate";

type TrolleyTypeStore = {
    onSelected: TTrolleyProductUser[];
    onTotalProduct: number;
    setSelected: (state: TTrolleyProductUser) => void;
    onIncrement: (idTrolley: string) => void;
    onDecrement: (idTrolley: string) => void;
    onRemove: (idTrolley: string) => void;
    setData: (state: TTrolleyProductUser[]) => void;
    isTrolleyIncluded: (idTrolley: string) => boolean;
    setTotalProduct: () => void;
    setQty: (id: string, qty: number) => void
};

const useTrolleyStore = create<TrolleyTypeStore>((set, get) => ( {

    onSelected: [],
    onTotalProduct: 0,
    setQty: (id, qty) => {
        if (qty > 0) {
            set((state) => {
                return {
                    onSelected: state.onSelected.map((item) =>
                        item.id_product === id
                            ? { ...item, qty_at_buy: qty }
                            : item
                    )
                }
            })
        }
        get().setTotalProduct()

    },

    setTotalProduct: () => {
        set({ onTotalProduct: toTotal.subTotal(get().onSelected) });
    },
    isTrolleyIncluded: (idTrolley: string) => {
        return get().onSelected.some((trolley) => trolley.id === idTrolley);
    },

    setSelected: (dataProduct: TTrolleyProductUser) => {
        set((state) => {
            const isIncluded = state.onSelected.some((trolley) => trolley.id === dataProduct.id);
            const datas = isIncluded
                ? state.onSelected.filter((trolley) => trolley.id !== dataProduct.id)
                : [ ...state.onSelected, dataProduct ]
            return { onSelected: datas }
        })
        get().setTotalProduct()
    },

    onIncrement: (idTrolley) => {
        set((state) => ( {
            onSelected: state.onSelected.map((item) =>
                item.id === idTrolley
                    ? { ...item, qty_at_buy: item.qty_at_buy + 1 }
                    : item
            ),
        } ))
        get().setTotalProduct()
    },
    onDecrement: (idTrolley) => {
        set((state) => ( {
            onSelected: state.onSelected.map((item) =>
                item.id === idTrolley && item.qty_at_buy > 1
                    ? { ...item, qty_at_buy: item.qty_at_buy - 1 }
                    : item
            ),
        } ))
        get().setTotalProduct()

    },
    onRemove: (idTrolley) =>
        set((state) => ( {
            onSelected: state.onSelected.filter((item) => item.id !== idTrolley),
        } )),
    setData: (data: TTrolleyProductUser[]) => set((state) => ( {
        onSelected: data,
    } )),
} ));

export default useTrolleyStore;
