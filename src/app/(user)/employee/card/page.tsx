import React from 'react';
import { EmployeeIDCard } from "@/app/(user)/employee/card/card.client";
import { validSession } from "@/server/lib/db";
import { getEmployeeByUserIdRedirect } from "@/server/action/employee.client";
import { exampleCompany } from "@/assets/company";
import { findCompanyForUser } from "@/server/action/company";

async function Page() {
    const { userId } = await validSession()
    const employee = await getEmployeeByUserIdRedirect(userId)
    const company = await findCompanyForUser()

    return (
        <div>

            {/*{ !company && (*/ }
            {/*    <div className="card card-body">*/ }
            {/*        <h1 className={ 'card-title' }>System Busy</h1>*/ }
            {/*    </div>*/ }
            {/*) }*/ }

            <EmployeeIDCard
                employee={ employee }
                company={ company ?? exampleCompany }/>
        </div>
    );
}

export default Page;

