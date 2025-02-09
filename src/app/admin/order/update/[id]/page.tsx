import { OrderFormUpdateClient } from "@/app/components/order/order.client";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { Suspense } from "react";
import { TContext } from "@/interface/server/param";
import { getContext } from "@/utils/requestHelper";
import { validSession } from "@/server/lib/db";

export default async function PageOrderUpdate(context: TContext) {
    const idOrder = await getContext(context, 'id')
    const session = await validSession()

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <OrderFormUpdateClient idOrder={ idOrder } id_user={ session.userId } />
        </Suspense> )
}
