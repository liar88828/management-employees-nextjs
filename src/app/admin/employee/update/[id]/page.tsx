import React from 'react';
import { prisma } from "@/config/prisma";
import { employeeId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";
import { TContext } from "@/interface/server/param";
import { getContext } from "@/utils/requestHelper";

import { EmployeeFormClientAdmin } from "@/app/components/employee/employee.client.admin";

export default async function Page(context: TContext) {
    const idEmployee = await getContext(context, 'id')
    const departments = await prisma.departements.findMany()
    const employee = await employeeId(idEmployee)
    if (!employee) return <EmptyData page={ `Employee Detail ${ idEmployee }` }/>
    return <EmployeeFormClientAdmin
        employee={ employee.data }
        method={ employee.data ? 'PUT' : 'POST' }
        departments={ departments }/>
}
