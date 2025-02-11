import React, { Suspense } from 'react';
import { TContext } from "@/interface/server/param";
import { getId } from "@/utils/requestHelper";
import { EmployeeDetailServerAdmin } from "@/app/components/employee/employee.server";
import { PageLoadingSpin } from "@/app/components/LoadingData";

export default async function Page(context: TContext) {
    const idEmployee = await getId(context);

    return (
            <Suspense fallback={ <PageLoadingSpin /> }>
                <EmployeeDetailServerAdmin idEmployee={ idEmployee } />
            </Suspense>
    )
}
