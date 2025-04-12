import React, { Suspense } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { validSession } from "@/secure/db";
import { RegistrationFirst } from "@/app/components/error/registrationFirst";
import { getEmployeeById } from "@/server/controller/employee.controller";
import { EmployeeCV } from "@/app/components/employee/client/cv";
import { prisma } from "@/config/prisma";
import EmployeeIDCardInterview from "@/app/components/employee/client/IDCard";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeById({ userId })
    const company = await prisma.companys.findFirst()
    if (!company) {
        return <h1>Error</h1>
    }
    if (!employee) {
        return <RegistrationFirst/>
    }

    return (
        <Suspense fallback={ <PageLoadingSpin/> }>
            <EmployeeIDCardInterview employee={ employee } company={ company }/>
            <EmployeeCV employee={ employee }/>
        </Suspense>
    );
}

export default Page;