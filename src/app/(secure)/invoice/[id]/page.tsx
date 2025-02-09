import React, { Suspense } from 'react';
import { InvoiceServer } from "@/app/components/invoice/invoice.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { TContext } from "@/interface/server/param";
import { getId, getSearchName } from "@/utils/requestHelper";

export default async function Page(context: TContext) {

    const paramsRedirect = await getSearchName(context, 'redirect')
    const id = await getId(context)

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <InvoiceServer paramsRedirect={ paramsRedirect } idOrder={ id } />
        </Suspense>
    );
}
