import React from 'react';
import { EmployeeIDCard } from "@/app/(user)/employee/card/card";
import { validSession } from "@/server/lib/db";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId)

    return (
        <div>
            <EmployeeIDCard employee={ employee }/>
        </div>
    );
}

export default Page;

