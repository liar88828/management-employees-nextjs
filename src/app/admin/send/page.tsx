import React from 'react';
import { sendOnlyAllLoader } from "@/server/action/send.action";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { TContext } from "@/interface/server/param";
import { SendTableLetter } from "@/app/admin/send/components/sendTableLetter";
import { SendHeader } from "@/app/admin/send/components/sendHeader";

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const page = await getContextQueryNum(context, 'page')
    const { totalPages, data } = await sendOnlyAllLoader({ page, search })
    return (

        <div className="space-y-2">
            <SendHeader />
            <SendTableLetter data={ data } />
            <PaginationComponent
                totalPages={ totalPages }
                title={ 'send' }
                search={ search }
                currentPage={ page }
            />
        </div>
    );
}
