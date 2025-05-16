import React from 'react';
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/toRequest";
import { EmptyData } from "@/app/components/PageErrorData";

import { EmployeeCVAdmin } from "@/app/components/employee/client/employeeCVAdmin";
import { employeeFindById } from "@/server/action/employee-admin.action";

export default async function Page(context: TContext) {
    const employeeId = await getId(context);
    const employee = await employeeFindById({ employeeId })
    if (!employee) return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    return <EmployeeCVAdmin employee={ employee } />
    // <EmployeeDetailServerAdminNew employee={ employee } />

}
