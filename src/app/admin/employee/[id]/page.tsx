import React from 'react';
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/toRequest";
import { EmptyData } from "@/app/components/ui/PageErrorData";
import { AdminEmployeeDetailPage } from "@/app/components/AdminEmployeeDetailPage";
import { adminEmployeeDetailLoader } from "@/action/admin-employee-action";

export default async function Page(context: TContext) {
    const employeeId = await getId(context);
    const employee = await adminEmployeeDetailLoader({ employeeId })
    if (!employee) return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    return <AdminEmployeeDetailPage employee={ employee } />
}
