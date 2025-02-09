import React from "react";
import { PageErrorData } from "@/app/components/PageErrorData";
import { PaymentDetailPageAdmin } from "@/app/components/payment/payment.page";
import { paymentHistory, paymentId } from "@/server/network/payment";
import { OrderHistoryCard } from "@/app/components/order/history";

export async function PaymentDetailServerAdmin({ idPayment }: { idPayment: string }) {
    const { data: payment } = await paymentId(idPayment)
    if (!payment) {
        return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />
    }
    return <PaymentDetailPageAdmin payment={ payment } />
}

export async function PaymentHistoryServerAdmin({ idPayment }: { idPayment: string }) {
    const { data: payment } = await paymentHistory(idPayment)
    if (!payment) {
        return <PageErrorData code={ 404 } msg={ 'Data Payment is Empty' } />
    }
    return (
        <OrderHistoryCard
            idPage={ idPayment }
            formPage={ 'payment' }
            orderHistory={ payment }/>
    );
}
