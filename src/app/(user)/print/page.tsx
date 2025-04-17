import React, { Suspense } from 'react';
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { employeeFindById } from "@/server/controller/employee.controller";
import { EmployeeCV } from "@/app/components/employee/client/cv";
import { prisma } from "@/config/prisma";
import EmployeeIDCardInterview from "@/app/components/employee/client/IDCard";
import JobApplication from "@/app/components/Letter/JobApplication";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    const company = await prisma.companys.findFirst()
    if (!company) {
        return <h1>Error</h1>
    }
    if (!employee) {
        return <EmployeeNotFound />
    }

    return (
        <Suspense fallback={ <PageLoadingSpin/> }>
            <EmployeeIDCardInterview employee={ employee } company={ company }/>
            <EmployeeCV employee={ employee }/>
            {/*<JobApplication employee={ employee } company={company}/>*/ }
        </Suspense>
    );
}

export default Page;
