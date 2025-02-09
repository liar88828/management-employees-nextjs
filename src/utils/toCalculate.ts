import { TTrolleyProductUser } from "@/interface/entity/trolley.model";

export const subTotal = (trolleys?: TTrolleyProductUser[]): number => {
    if (!trolleys) return 0;
    if (trolleys.length === 0) return 0;
    return trolleys.reduce((total, trolley) => {
        total += trolley.price_at_buy * trolley.qty_at_buy
        return total;
    }, 0)
}

export const toTotal = {
    subTotal
}
