import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextQuery, getContextQueryNum } from "@/utils/requestHelper";
import { Pagination } from "@/app/admin/registration/registration.client";
import { employeePagination } from "@/server/action/employee.admin";
import { EmployeeSearchClientAdmin, EmployeeTableClientAdmin } from "@/app/components/employee/employee.client.admin";

export default async function page(context: TContext,) {
    const search = await getContextQuery(context, 'search')
    const status = await getContextQuery(context, 'status')
    const page = await getContextQueryNum(context, 'page')
    // const limit = await getContextQuery(context, 'limit')
    const { totalPages, employees } = await employeePagination(search, status, page)
    return (
        <>
            <EmployeeSearchClientAdmin search={ search } status={ status } />
            <EmployeeTableClientAdmin employees={ employees } />
            <Pagination page={ page } totalPages={ totalPages } search={ search } status={ status } />
        </>
    );
}
