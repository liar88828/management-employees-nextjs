import React, { Suspense } from 'react';
import { validSession } from "@/server/lib/db";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { EmployeeDetailServerClient } from "@/app/components/employee/employee.server";

async function Page() {
    const {userId} = await validSession()

    return (
        <Suspense fallback={<PageLoadingSpin/>}>
            <EmployeeDetailServerClient userId={userId}/>
        </Suspense>
    );
}

export default Page;