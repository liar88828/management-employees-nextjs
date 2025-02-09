import React from 'react';
import { OrderIncomingPage } from "@/app/components/order/order.client";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { TContext } from "@/interface/server/param";
import { getSearchName } from "@/utils/requestHelper";
import { incomingFindNet } from "@/server/network/order";

export default async function Page(context: TContext) {
    const search = await getSearchName(context, 'search') ?? '';
    const invoices = await incomingFindNet('Pending', search)

    if (!invoices) return <PageLoadingSpin />
    if (invoices.data.length === 0) return <PageEmptyData page={ 'Order Incoming padding Page' } />

    return (
        invoices.data.map((invoice) => (
                <OrderIncomingPage key={ invoice.id } invoice={ invoice } />
            )
        )
    );
}
