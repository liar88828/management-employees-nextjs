import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/toRequest";
import { employeePageLoader } from "@/app/admin/employee/employee-admin.action";
import { EmployeeTableClientAdmin } from "@/app/admin/employee/components/employeeTableClientAdmin";
import { EmployeeSearchClientAdmin } from "@/app/admin/employee/components/employeeSearchClientAdmin";
import { PaginationComponent } from "@/app/components/PaginationComponent";

export default async function page(context: TContext,) {
    const name = await getContextQuery(context, 'name')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    // const limit = await getContextQuery(context, 'limit')
    const { totalPages, employees } = await employeePageLoader(name, status, page)
    return (
        <div className={ 'space-y-2' }>
            <EmployeeSearchClientAdmin name={ name } status={ status } />
            <EmployeeTableClientAdmin employees={ employees } />
            <PaginationComponent
                currentPage={ page }
                totalPages={ totalPages }
                search={ name }
                status={ status }
                title={ 'employee' }
            />
        </div>
    );
}
