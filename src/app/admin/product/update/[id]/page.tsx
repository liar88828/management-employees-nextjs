import React, { Suspense } from 'react'
import type { TContext } from "@/interface/server/param";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductFormUpdateServerAdmin } from "@/app/components/product/product.server";
import { getId } from "@/utils/requestHelper";

export default async function Page(context: TContext) {
    const id = await getId(context)
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <ProductFormUpdateServerAdmin idProduct={ id } />
        </Suspense>
    )
}
