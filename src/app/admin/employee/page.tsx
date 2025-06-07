import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { AdminEmployeePage } from "@/app/components/AdminEmployeePage";
import { PaginationComponent } from "@/app/components/ui/PaginationComponent";
import { adminEmployeePageLoader } from "@/action/admin-employee-action";

export default async function page(context: TContext,) {
    const name = await getContextQuery(context, 'name')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    // const limit = await getContextQuery(context, 'limit')
    const { totalPages, employees } = await adminEmployeePageLoader(name, status, page)
    return (
        <div className={ 'space-y-2' }>
            <AdminEmployeePage employees={ employees }
                               name={ name }
                               status={ status }
            />

            <PaginationComponent currentPage={ page }
                                 totalPages={ totalPages }
                                 search={ name }
                                 status={ status }
                                 title={ 'employee' }
            />
        </div>
    );
}
