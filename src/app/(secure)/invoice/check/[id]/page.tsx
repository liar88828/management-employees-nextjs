import React, { Suspense } from 'react';
import { InvoiceCheckServer } from "@/app/components/invoice/invoice.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { ROLE } from "@/interface/Utils";
import { TContext } from "@/interface/server/param";
import { getId, getSearchName } from "@/utils/requestHelper";
import { getSession } from "@/server/lib/db";
import { redirect } from "next/navigation";

export default async function Page(context: TContext) {

    const paramsRedirect = await getSearchName(context, 'redirect')
    const id = await getId(context)
    const session = await getSession()

    if (session.role !== ROLE.ADMIN) {
        redirect('/')
    }

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <InvoiceCheckServer paramsRedirect={ paramsRedirect } idOrder={ id } />
        </Suspense>
    );
}
