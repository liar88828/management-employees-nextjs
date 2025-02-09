import React, { Suspense } from 'react'
import { DeliveryDetailHistoryServerAdmin, DeliveryDetailServerAdmin } from "@/app/components/delivery/delivery.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";

export default async function Page(context: TContext) {
    const id = await getId(context)

    return (
        <div className='p-3 my-4 '>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <DeliveryDetailServerAdmin idDelivery={ id } />
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <DeliveryDetailHistoryServerAdmin idDelivery={ id } />
                </Suspense>
            </Suspense>

        </div>
    )
}
