import React from 'react';
import { EmptyData } from "@/app/components/ui/PageErrorData";
import { TContext } from "@/interface/server/param";
import { getContextParam, getContextQuery } from "@/utils/toRequest";
import { adminEmployeeDetailLoader } from "@/action/admin-employee-action";
import { AdminRegistrationPage } from "@/app/components/AdminEmployeeCreatePage";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const error = await getContextQuery(context, 'error')
    const type = await getContextQuery(context, 'type')
    const employee = await adminEmployeeDetailLoader({ employeeId })
    if (!employee) return <EmptyData page={ `Employee Detail ${ employeeId }` } />

    return <AdminRegistrationPage
        employee={ employee }
        user={ employee.User }
        type={ type }
        error={ error }
    />
}
