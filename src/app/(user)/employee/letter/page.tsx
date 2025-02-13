import React from 'react';
import JobApplication from "@/app/components/Letter/JobApplication";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";
import { validSession } from "@/server/lib/db";
import { findCompanyForUser } from "@/server/action/company";
import { PrintComponent } from "@/app/components/employee/employee.client.admin";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId);
    const company = await findCompanyForUser()

    return (
        <div>
            <PrintComponent href={ `/${ userId }/edit` }>
                <JobApplication employee={ employee } company={ company }/>
            </PrintComponent>
        </div>
    );
}

export default Page;