import React from 'react';
import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/toRequest";
import { EmptyData } from "@/app/components/ui/PageErrorData";
import { AdminRegistrationDetailPage } from "@/app/components/AdminRegistrationDetailPage";
import { adminEmployeeDetailLoader } from "@/action/admin-employee-action";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await adminEmployeeDetailLoader({ employeeId })
    // const positions: Positions[] = await prisma.positions.findMany()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    }

    return (
        <AdminRegistrationDetailPage employee={ employee } />
    );
}
