import React from 'react';
import { EmployeePhotoAdmin } from "@/app/components/employee/employee.page";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";
import { validSession } from "@/server/lib/db";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId);
    return (
        <EmployeePhotoAdmin employee={ employee }/>
    );
}

export default Page;