import React, { Suspense } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { EmployeeDetailServerClient } from "@/app/components/employee/employee.server";
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { RegistrationFirst } from "@/app/components/error/registrationFirst";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdForIDCard(userId)
    if (!employee) {
        return <RegistrationFirst/>
    }

    return (
        <Suspense fallback={ <PageLoadingSpin/> }>
            <EmployeeDetailServerClient/>
        </Suspense>
    );
}

export default Page;