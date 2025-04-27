import React from 'react';
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";

import { EmployeeCVAdmin } from "@/app/components/employee/client/employeeCVAdmin";

export default async function Page(context: TContext) {
    const employeeId = await getId(context);
    const employee = await employeeRepository.findById({ employeeId })
    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    }
    return (
        <EmployeeCVAdmin employee={ employee } />
        // <EmployeeDetailServerAdminNew employee={ employee } />
    )
}
