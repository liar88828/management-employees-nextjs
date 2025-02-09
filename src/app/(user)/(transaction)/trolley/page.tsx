import React, { Suspense } from 'react'
import { TrolleyClientUser } from "@/app/components/trolley/trolley.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";

export default function Page() {
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <TrolleyClientUser />
        </Suspense>
    )
}
