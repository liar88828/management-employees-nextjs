import React from 'react';
import JobApplication from "@/app/components/Letter/JobApplication";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";
import { validSession } from "@/secure/db";
import { exampleCompany } from "@/assets/company";
import { PrintComponent } from "@/app/components/print/printComponent";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId);

    return (
        <PrintComponent>
            <JobApplication employee={ employee } company={ exampleCompany } />
        </PrintComponent>
    );
}

export default Page;
