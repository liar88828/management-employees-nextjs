import React from 'react';
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";
import { PrintComponent } from "@/app/components/print/printComponent";
import { EmployeeCV } from "@/app/components/print/employeeCV";

async function Page() {
    const {userId} = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId);
    return (
        <div className="pb-20 space-y-5">
            <PrintComponent href={ `/${ userId }/edit` }>
                <EmployeeCV employee={ employee }/>
            </PrintComponent>
        </div>
    );
}

export default Page;
