import React, { Suspense } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { TContext } from "@/interface/server/param";
import { getContext } from "@/utils/requestHelper";
import { EmployeeFormServerAdmin } from "@/app/components/employee/employee.server";

export default async function Page(context: TContext) {
    const idEmployee = await getContext(context, 'id')
    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <EmployeeFormServerAdmin idEmployee={ idEmployee } />
        </Suspense>
    );
}
