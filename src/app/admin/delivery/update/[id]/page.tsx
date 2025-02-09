import React, { Suspense } from 'react'
import type { TContext } from '@/interface/server/param'
import { DeliveryFormUpdateServerAdmin } from "@/app/components/delivery/delivery.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { getId } from '@/utils/requestHelper'

export default async function page(context: TContext) {
    const id = await getId(context)
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <DeliveryFormUpdateServerAdmin idDelivery={ id } />
        </Suspense>
    )
}
