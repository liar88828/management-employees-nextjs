import React, { Suspense } from 'react'
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { PaymentDetailServerAdmin, PaymentHistoryServerAdmin } from "@/app/components/payment/payment.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";

export default async function PaymentDetail(context: TContext) {
    const idPayment = await getId(context)
    return (

        <Suspense fallback={ <PageLoadingSpin /> }>
            <PaymentDetailServerAdmin idPayment={ idPayment } />
            <Suspense fallback={ <PageLoadingSpin /> }>
                <PaymentHistoryServerAdmin idPayment={ idPayment } />
            </Suspense>
        </Suspense>
    )
}
