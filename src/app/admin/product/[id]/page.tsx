import React, { Suspense } from 'react'
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductDetailServerAdmin, ProductHistoryServerAdmin } from "@/app/components/product/product.server";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";

export const revalidate = 0

export default async function PageProductDetail(context: TContext) {
    const idProduct = await getId(context)

    return (
        <div className='p-3 my-4 '>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProductDetailServerAdmin idProduct={ idProduct } />
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <ProductHistoryServerAdmin idProduct={ idProduct } />
                </Suspense>
            </Suspense>
        </div>
    )
}
