import React, { Suspense } from 'react';
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { EmployeeDetailServerAdmin } from "@/app/components/employee/employee.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";

export default async function Page(context: TContext) {
    const employeeId = await getId(context);
    const employee = await employeeRepository.findById({ employeeId })
    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }
    return (
            <Suspense fallback={ <PageLoadingSpin /> }>
                <EmployeeDetailServerAdmin employeeId={ employeeId }/>
            </Suspense>
    )
}
