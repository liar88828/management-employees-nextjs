import { LowPriceProduct, NewProduct, PopularProduct } from "@/app/components/home/home.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ProductHomeCategoryUser } from "@/app/components/home/home.client";
import { Suspense } from "react";
import { checkGuest } from "@/server/lib/db";

export default async function Page() {
    const isLogin = await checkGuest()

    return (
        <div className={ 'space-y-2' }>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <ProductHomeCategoryUser />
            </Suspense>
            <Suspense fallback={ <PageLoadingSpin /> }>
                <NewProduct isLogin={ isLogin } />
                {/**/ }
                <Suspense fallback={ <PageLoadingSpin /> }>
                    <LowPriceProduct isLogin={ isLogin } />
                    {/**/ }
                    <Suspense fallback={ <PageLoadingSpin /> }>
                        <PopularProduct isLogin={ isLogin } />
                    </Suspense>
                </Suspense>
            </Suspense>
        </div>
    )
}
