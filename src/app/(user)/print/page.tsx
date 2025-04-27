import React, { Suspense } from 'react';
import IDCardEmployeeGlobal from "@/app/components/employee/client/IDCardEmployeeGlobal";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { validSession } from "@/secure/db";
import { EmployeeNotFound } from "@/app/components/error/registrationFirst";
import { employeeFindById } from "@/server/controller/employee.controller";
import { exampleCompany } from "@/assets/company";
import { EmployeeCVClient } from "@/app/components/employee/client/employeeCVClient";

async function Page() {
    const { userId } = await validSession()
    const employee = await employeeFindById({ userId })
    // const company = await prisma.companys.findFirst()

    if (!employee) return <EmployeeNotFound />

    return (
        <Suspense fallback={ <PageLoadingSpin /> }>
            <IDCardEmployeeGlobal employee={ employee } company={ exampleCompany } />
            <EmployeeCVClient employee={ employee } />
            {/*<JobApplication employee={ employee } company={company}/>*/ }
        </Suspense>
    );
}

export default Page;
