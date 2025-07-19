import React from 'react';
import { validSession } from "@/secure/db";
 

import { UserInterviewPage } from "@/app/components/UserInterviewPage";
import { userEmployeeDetailLoader } from "@/action/user-registration-action";
import { EmployeeNotFound } from "@/app/components/ui/ErrorComponent";

export default async function Page() {
    const { userId } = await validSession()
    const employee = await userEmployeeDetailLoader({ userId })
    if (!employee) return <EmployeeNotFound />
    // if (employee.statusEmployee === STATUS_EMPLOYEE.Registration) redirect('/user?message=Please Complete Registration');

    return <UserInterviewPage employee={ employee } />
}
