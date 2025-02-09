import React, { Suspense } from 'react'
import { PaymentListClientAdmin, PaymentSearchClientAdmin } from "@/app/components/payment/payment.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";

export default async function page() {
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <PaymentSearchClientAdmin>
                <PaymentListClientAdmin />
            </PaymentSearchClientAdmin>
        </Suspense>
    )
}
