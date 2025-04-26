import Link from 'next/link';
import React from 'react';
import { getLetterOnlyAll } from "@/server/action/letter.action";
import { SendTableLetter } from "@/app/admin/send/send.client";
import { PaginationComponent } from "@/app/components/PaginationComponent";
import { getContextQuery, getContextQueryNum } from "@/utils/requestHelper";
import { TContext } from "@/interface/server/param";

export default async function Page(context: TContext) {
    const search = await getContextQuery(context, 'search')
    const page = await getContextQueryNum(context, 'page')
    const { totalPages, data } = await getLetterOnlyAll({ page, search })
    return (
        < >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">

                    <h1 className={ 'text-xl font-bold' }> Letter</h1>
                    <details className="dropdown">
                        <summary className="btn m-1">Select Status</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><Link href={ `/admin/inbox` }>Select All</Link></li>
                            { [ 'Undangan Interview' ].map((item) => (
                                <li key={ item }>
                                    <Link href={ `/admin/inbox?search=&status=${ item }` }>{ item }</Link>
                                </li>
                            )) }
                        </ul>
                    </details>
                </div>

                <div>
                    <Link href={ '/admin/send/create' } className={ 'btn btn-info' }>Create</Link>
                </div>
            </div>
            <div className="space-y-5">
                <SendTableLetter data={ data } />
                <PaginationComponent
                    totalPages={ totalPages }
                    title={ 'send' }
                    search={ search }
                    page={ page }
                />
            </div>
        </ >
    );
}
