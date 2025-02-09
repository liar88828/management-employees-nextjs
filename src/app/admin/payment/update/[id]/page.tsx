import React from 'react'
import type { TContext } from '@/interface/server/param'
import { PaymentFormClientAdmin } from "@/app/components/payment/payment.client";
import { getId } from '@/utils/requestHelper'
import { paymentId } from "@/server/network/payment";

export default async function page(context: TContext) {
    const id = await getId(context)
    const { data } = await paymentId(id)

    return (
        <PaymentFormClientAdmin
            defaultValues={ data }
            method={ 'PUT' }
            id={ id }
        />
    )
}
