import React, {Suspense} from 'react';
import {validSession} from "@/server/lib/db";
import {PageLoadingSpin} from "@/app/components/LoadingData";
import {EmployeeDetailServerClient} from "@/app/components/employee/employee.server";

async function Page() {

    return (
        <Suspense fallback={<PageLoadingSpin/>}>
            <EmployeeDetailServerClient />
        </Suspense>
    );
}

export default Page;