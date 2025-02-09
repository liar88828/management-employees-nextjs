import { TStatusOrder } from "@/interface/Utils";

export enum STATUS {
    PENDING = 'Pending',
    FAIL = 'Fail',
    COMPLETE = 'Complete',
}

export const toStatus = (status: TStatusOrder | string) => {
    return status === 'Pending'
        ? 'info'
        : status === 'Fail'
            ? 'error'
            : 'success'
}
