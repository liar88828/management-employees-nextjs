import React from 'react';
import { employeeId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { positionGetAllPage } from "@/server/action/position.action";
import { EmployeeFormClientAdmin } from "@/app/admin/employee/update/[id]/employeeFormClientAdmin";

export default async function Page(context: TContext) {
    const idEmployee = await getContextParam(context, 'id')
    const positions = await positionGetAllPage()
    const employee = await employeeId(idEmployee)
    if (!employee) return <EmptyData page={ `Employee Detail ${ idEmployee }` } />
    return <EmployeeFormClientAdmin
        employee={ employee.data }
        method={ employee.data ? 'PUT' : 'POST' }
        positions={ positions }
    />
}
