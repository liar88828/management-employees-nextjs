import React from 'react';
import { TContext } from "@/interface/server/param";
import { getSearchName, getSearchNameNum } from "@/utils/requestHelper";

import { EmployeeSearchClientAdmin, EmployeeTableClientAdmin } from "@/app/components/employee/employee.client.admin";

// export const dynamic = 'force-dynamic';

export default async function page(context: TContext,) {
    // const name = await getSearchName(context, 'search')
    // const status = await getSearchName(context, 'status')
    //
    // const page = await getSearchNameNum(context, 'page')
    // const limit = await getSearchNameNum(context, 'limit')
    // const data = await employeeFindAll({
    //     filter: { name, status, },
    //     pagination: { page, limit }
    // })
    return (
            <EmployeeSearchClientAdmin>
                <EmployeeTableClientAdmin />
            </EmployeeSearchClientAdmin>
    );
}
