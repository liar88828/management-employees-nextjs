import React from 'react';
import { EmployeeIDCard } from "@/app/(user)/employee/card/card.client";
import { validSession } from "@/secure/db";
import { getEmployeeByUserIdForIDCard } from "@/server/action/employee.client";
import { userByID } from "@/server/action/user.action";
import { ErrorComponent } from "@/app/components/error/ErrorComponent";
import { exampleCompany } from "@/assets/company";
import { PrintComponent } from "@/app/components/print/printComponent";

async function Page() {
    const { userId } = await validSession()
    const user = await userByID(userId)
    const employee = await getEmployeeByUserIdForIDCard(userId)

    if (!employee) return <ErrorComponent title={ 'Employee is Not Found' } description={ 'Please Login First' } />
    if (!user) return <ErrorComponent title={ 'User is Not Found' } description={ 'Please Login First' } />

    return (
        <div>
            <PrintComponent>
                <EmployeeIDCard employee={ employee } user={ user } company={ exampleCompany } />
            </PrintComponent>
        </div>
    );
}

export default Page;
