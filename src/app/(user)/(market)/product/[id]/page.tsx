import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductDetailServerUser } from "@/app/components/product/product.server";
import { Suspense } from "react";
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";

export default async function DetailedProduct(context: TContext) {
    const idProduct: string = await getId(context);

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <ProductDetailServerUser idProduct={ idProduct } />
        </Suspense>
    )
}
