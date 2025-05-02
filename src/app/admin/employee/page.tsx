import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { employeePageLoader } from "@/server/action/employee-admin.action";
import { EmployeeTableClientAdmin } from "@/app/admin/employee/components/employeeTableClientAdmin";
import { EmployeeSearchClientAdmin } from "@/app/admin/employee/components/employeeSearchClientAdmin";
import { PaginationComponent } from "@/app/components/PaginationComponent";

export default async function page(context: TContext,) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    // const limit = await getContextQuery(context, 'limit')
    const { totalPages, employees } = await employeePageLoader(search, status, page)
    return (
        <div className={ 'space-y-2' }>
            <EmployeeSearchClientAdmin search={ search } status={ status } />
            <EmployeeTableClientAdmin employees={ employees } />
            <PaginationComponent
                page={ page }
                totalPages={ totalPages }
                search={ search }
                status={ status }
                title={ 'employee' }
            />
        </div>
    );
}
