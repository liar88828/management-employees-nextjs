import React from 'react';
import { employeeId } from "@/server/network/employee";
import { EmptyData } from "@/app/components/PageErrorData";
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { departmentGetAllPage } from "@/server/action/department.action";
import { EmployeeFormClientAdmin } from "@/app/admin/employee/components/employeeFormClientAdmin";

export default async function Page(context: TContext) {
    const idEmployee = await getContextParam(context, 'id')
    const departments = await departmentGetAllPage()
    const employee = await employeeId(idEmployee)
    if (!employee) return <EmptyData page={ `Employee Detail ${ idEmployee }` } />
    return <EmployeeFormClientAdmin
        employee={ employee.data }
        method={ employee.data ? 'PUT' : 'POST' }
        departments={ departments }
    />
}
