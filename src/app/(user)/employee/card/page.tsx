import React from 'react';
import { EmployeeIDCard } from "@/app/(user)/employee/card/card.client";
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { findCompanyForUser } from "@/server/action/company";
import { PrintComponent } from "@/app/components/employee/employee.client.admin";
import { userByID } from "@/server/action/user.action";
import { ErrorComponent } from "@/app/components/error/ErrorComponent";

async function Page() {
    const { userId } = await validSession()
    const user = await userByID(userId)
    const employee = await getEmployeeByUserIdForIDCard(userId)
    const company = await findCompanyForUser()

    if (!employee) return <ErrorComponent title={ 'Employee is Not Found' } description={ 'Please Login First' } />
    if (!user) return <ErrorComponent title={ 'User is Not Found' } description={ 'Please Login First' } />
    if (!company) return <ErrorComponent title={ 'Company is Not Found' } description={ 'Something went wrong' } />

    return (
        <div>
            <PrintComponent>
                <EmployeeIDCard employee={ employee } user={ user } company={ company } />
            </PrintComponent>
        </div>
    );
}

export default Page;
